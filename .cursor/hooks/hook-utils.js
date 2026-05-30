const crypto = require('crypto');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_CHANGE = /^(?:\?\?\s+|\S+\s+)(client\/|server\/|package\.json|playwright)/;
const REVIEWS_DIR = '.cursor/reviews';
const REVIEW_MANIFEST = '.last-reviewed.json';

function resolveGit() {
  const candidates = [
    'C:\\Program Files\\Git\\bin\\git.exe',
    'C:\\Program Files (x86)\\Git\\bin\\git.exe',
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  try {
    execSync('git --version', { stdio: 'ignore' });
    return 'git';
  } catch {
    return null;
  }
}

function findRepoRoot(startDir) {
  let dir = startDir;

  for (let depth = 0; depth < 12; depth += 1) {
    if (fs.existsSync(path.join(dir, '.git'))) {
      return dir;
    }

    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }

  return null;
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
  });
}

function getPorcelainStatus(repoRoot, git) {
  return execSync(`"${git}" status --porcelain`, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
}

function getApplicationChangeLines(statusText) {
  return statusText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && APP_CHANGE.test(line))
    .sort();
}

function hasApplicationChanges(statusText) {
  return getApplicationChangeLines(statusText).length > 0;
}

function getApplicationChangeFingerprint(repoRoot, git) {
  const status = getPorcelainStatus(repoRoot, git);
  const lines = getApplicationChangeLines(status);

  if (!lines.length) {
    return '';
  }

  return crypto.createHash('sha256').update(lines.join('\n')).digest('hex');
}

function getReviewsDir(repoRoot) {
  return path.join(repoRoot, REVIEWS_DIR);
}

function getReviewManifestPath(repoRoot) {
  return path.join(getReviewsDir(repoRoot), REVIEW_MANIFEST);
}

function readReviewManifest(repoRoot) {
  const manifestPath = getReviewManifestPath(repoRoot);

  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return null;
  }
}

function writeReviewManifest(repoRoot, { reportPath, statusHash }) {
  const reviewsDir = getReviewsDir(repoRoot);
  fs.mkdirSync(reviewsDir, { recursive: true });

  const manifest = {
    reviewedAt: new Date().toISOString(),
    reportPath: reportPath.replace(/\\/g, '/'),
    statusHash,
  };

  fs.writeFileSync(getReviewManifestPath(repoRoot), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

function isReviewCompleteForFingerprint(repoRoot, fingerprint) {
  if (!fingerprint) {
    return false;
  }

  const manifest = readReviewManifest(repoRoot);
  if (!manifest?.statusHash || manifest.statusHash !== fingerprint) {
    return false;
  }

  if (!manifest.reportPath) {
    return false;
  }

  const reportAbsolutePath = path.join(repoRoot, manifest.reportPath);
  return fs.existsSync(reportAbsolutePath);
}

function parseStopPayload(raw) {
  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

function getWorkspaceRoot(payload) {
  return Array.isArray(payload.workspace_roots)
    ? payload.workspace_roots[0]
    : process.cwd();
}

function shouldRunOnStop(payload) {
  if (payload.status && payload.status !== 'completed') {
    return false;
  }

  return true;
}

function resolveRepoContext(payload) {
  if (!shouldRunOnStop(payload)) {
    return null;
  }

  const workspaceRoot = getWorkspaceRoot(payload);
  const repoRoot = findRepoRoot(workspaceRoot || process.cwd());
  const git = resolveGit();

  if (!repoRoot || !git) {
    return null;
  }

  return { repoRoot, git };
}

module.exports = {
  APP_CHANGE,
  REVIEWS_DIR,
  REVIEW_MANIFEST,
  resolveGit,
  findRepoRoot,
  readStdin,
  getPorcelainStatus,
  getApplicationChangeLines,
  hasApplicationChanges,
  getApplicationChangeFingerprint,
  getReviewsDir,
  getReviewManifestPath,
  readReviewManifest,
  writeReviewManifest,
  isReviewCompleteForFingerprint,
  parseStopPayload,
  resolveRepoContext,
};

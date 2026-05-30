const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_CHANGE = /^(?:\?\?\s+|\S+\s+)(client\/|server\/|package\.json|playwright)/;

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

function hasApplicationChanges(statusText) {
  return statusText
    .split(/\r?\n/)
    .some((line) => line.trim() && APP_CHANGE.test(line.trim()));
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
  resolveGit,
  findRepoRoot,
  readStdin,
  getPorcelainStatus,
  hasApplicationChanges,
  parseStopPayload,
  resolveRepoContext,
};

#!/usr/bin/env node
/**
 * stop hook — if application code changed, ask the agent to run stable-build-git-push.
 * Reads JSON from stdin; prints { followup_message } or {} to stdout.
 */
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

async function main() {
  const raw = await readStdin();
  let payload = {};

  try {
    payload = JSON.parse(raw || '{}');
  } catch {
    payload = {};
  }

  if (payload.status && payload.status !== 'completed') {
    process.stdout.write('{}');
    return;
  }

  const workspaceRoot = Array.isArray(payload.workspace_roots)
    ? payload.workspace_roots[0]
    : process.cwd();
  const repoRoot = findRepoRoot(workspaceRoot || process.cwd());
  const git = resolveGit();

  if (!repoRoot || !git) {
    process.stdout.write('{}');
    return;
  }

  try {
    const status = execSync(`"${git}" status --porcelain`, {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });

    if (!status.trim()) {
      process.stdout.write('{}');
      return;
    }

    const hasAppChanges = status
      .split(/\r?\n/)
      .some((line) => line.trim() && APP_CHANGE.test(line.trim()));

    if (!hasAppChanges) {
      process.stdout.write('{}');
      return;
    }

    process.stdout.write(
      JSON.stringify({
        followup_message:
          'Run the stable-build-git-push subagent now (@.cursor/agents/stable-build-git-push.md or Task subagent stable-build-git-push). Verify the build, then stage, commit, and push all application changes to the current branch. Do not end until push succeeds or you report a concrete blocker.',
      }),
    );
  } catch {
    process.stdout.write('{}');
  }
}

main();

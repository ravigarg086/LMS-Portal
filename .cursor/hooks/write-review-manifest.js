#!/usr/bin/env node
/**
 * Record that the current dirty application changes were reviewed.
 * Usage: node .cursor/hooks/write-review-manifest.js .cursor/reviews/code-refactor-review-YYYY-MM-DD-HHmmss.md
 */
const path = require('path');
const {
  findRepoRoot,
  resolveGit,
  getApplicationChangeFingerprint,
  writeReviewManifest,
} = require('./hook-utils');

function main() {
  const reportArg = process.argv[2];

  if (!reportArg) {
    process.stderr.write('Usage: node .cursor/hooks/write-review-manifest.js <report-path>\n');
    process.exit(1);
  }

  const repoRoot = findRepoRoot(process.cwd());
  const git = resolveGit();

  if (!repoRoot || !git) {
    process.stderr.write('Unable to locate git repository.\n');
    process.exit(1);
  }

  const reportPath = reportArg.replace(/\\/g, '/');
  const reportAbsolutePath = path.resolve(repoRoot, reportPath);

  if (!reportAbsolutePath.startsWith(path.resolve(repoRoot, '.cursor/reviews'))) {
    process.stderr.write('Report path must be inside .cursor/reviews/.\n');
    process.exit(1);
  }

  const fs = require('fs');
  if (!fs.existsSync(reportAbsolutePath)) {
    process.stderr.write(`Report file not found: ${reportPath}\n`);
    process.exit(1);
  }

  const statusHash = getApplicationChangeFingerprint(repoRoot, git);
  if (!statusHash) {
    process.stderr.write('No application code changes detected; manifest not written.\n');
    process.exit(1);
  }

  const manifest = writeReviewManifest(repoRoot, { reportPath, statusHash });
  process.stdout.write(`${JSON.stringify(manifest)}\n`);
}

main();

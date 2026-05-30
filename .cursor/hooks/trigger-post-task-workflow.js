#!/usr/bin/env node
/**
 * stop hook — orchestrates review-then-push when application code is dirty.
 * Phase 1: prompt code-refactor-reviewer until report + manifest exist for current changes.
 * Phase 2: prompt stable-build-git-push once review manifest matches current git fingerprint.
 */
const {
  readStdin,
  parseStopPayload,
  resolveRepoContext,
  getApplicationChangeFingerprint,
  isReviewCompleteForFingerprint,
} = require('./hook-utils');

const REVIEW_PROMPT =
  'Run the code-refactor-reviewer subagent now (@.cursor/agents/code-refactor-reviewer.md or Task subagent code-refactor-reviewer). Review all changed application files (use git status and git diff), apply safe refactors, write the review report to `.cursor/reviews/code-refactor-review-YYYY-MM-DD-HHmmss.md`, then run `node .cursor/hooks/write-review-manifest.js <report-path>` so the post-task workflow can proceed. Do not run stable-build-git-push until the manifest is written.';

const PUSH_PROMPT =
  'Run the stable-build-git-push subagent now (@.cursor/agents/stable-build-git-push.md or Task subagent stable-build-git-push). A code review report already exists for the current changes. Verify the build, then stage, commit, and push all application changes to the current branch. Do not end until push succeeds or you report a concrete blocker.';

async function main() {
  const raw = await readStdin();
  const payload = parseStopPayload(raw);
  const context = resolveRepoContext(payload);

  if (!context) {
    process.stdout.write('{}');
    return;
  }

  const { repoRoot, git } = context;

  try {
    const fingerprint = getApplicationChangeFingerprint(repoRoot, git);

    if (!fingerprint) {
      process.stdout.write('{}');
      return;
    }

    const followupMessage = isReviewCompleteForFingerprint(repoRoot, fingerprint)
      ? PUSH_PROMPT
      : REVIEW_PROMPT;

    process.stdout.write(JSON.stringify({ followup_message: followupMessage }));
  } catch {
    process.stdout.write('{}');
  }
}

main();

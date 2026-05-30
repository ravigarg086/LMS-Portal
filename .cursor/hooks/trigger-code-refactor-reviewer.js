#!/usr/bin/env node
/**
 * stop hook — if application code changed, ask the agent to run code-refactor-reviewer.
 * Reads JSON from stdin; prints { followup_message } or {} to stdout.
 */
const {
  readStdin,
  parseStopPayload,
  resolveRepoContext,
  getPorcelainStatus,
  hasApplicationChanges,
} = require('./hook-utils');

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
    const status = getPorcelainStatus(repoRoot, git);

    if (!status.trim() || !hasApplicationChanges(status)) {
      process.stdout.write('{}');
      return;
    }

    process.stdout.write(
      JSON.stringify({
        followup_message:
          'Run the code-refactor-reviewer subagent now (@.cursor/agents/code-refactor-reviewer.md or Task subagent code-refactor-reviewer). Review all changed application files (use git status and git diff), apply safe refactors, and write the review report to `.cursor/reviews/code-refactor-review-YYYY-MM-DD-HHmmss.md`. Do not end until the report file exists on disk.',
      }),
    );
  } catch {
    process.stdout.write('{}');
  }
}

main();

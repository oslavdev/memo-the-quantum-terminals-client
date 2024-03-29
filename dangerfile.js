// Import the feedback functions
import { fail, message, warn } from 'danger'

/**
 * Setup
 */
const { pr } = danger.github
const { created_files } = danger.git
const danger_commits = danger.git.commits

/** No ENV files */
const env_files = created_files.find((file) => file.startsWith('.env'))
if (env_files) {
  fail(
    `🙈 This PR contains \`.env\` files. Please remove files before mergin this PR.`,
  )
}

/** No Fixups */
const are_fixups = danger_commits.find((commit) =>
  commit.message.startsWith('fixup!'),
)
if (are_fixups) {
  fail('This PR contains unsquashed commits. Please use `--autosquash`.')
}

/** Added and removed lines */
const { additions = 0, deletions = 0 } = pr
message(`:tada: The PR added ${additions} and removed ${deletions} lines.`)

/* If it's not a branch PR */
if (pr.base.repo.full_name !== pr.head.repo.full_name) {
  warn(
    "🕵️ This PR comes from a fork, and won't get JS generated for QA testing this PR inside the Emission Example app.",
  )
}

/** No lock file */
const packageChanged = danger.git.modified_files.includes('package.json')
const lockfileChanged = danger.git.modified_files.includes('yarn.lock')

if (packageChanged && !lockfileChanged) {
  warn(
    `Changes were made to package.json, but not to yarn.lock - <i>'Perhaps you need to run yarn?'</i>`,
  )
}

/** Doesnt match format */
danger.git.commits.forEach((commit) => {
  if (!commit.message.match(/^(feat:)|(fix:)|(major:)|(chore:)|(refactor:)|(perf:)/g)) {
    fail(`Commit message '${commit.message}' does match the correct format`)
  }
})

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* ~ Achievemnts                                                            ~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Rule: Celebrate PRs that remove more code than they add.
 * Reason: Less is more!
 */
if (danger.github.pr.deletions > danger.github.pr.additions) {
  message(
    `👏 Great job! I see more lines deleted than added. Thanks for keeping us lean!`,
  )
}

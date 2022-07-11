const github = require("@actions/github");
const issueReport = require('./report-issue');
const { tapdTask } = require('./report-tapd');
const { step } = require("../report-helper");
const { validateIssueFormat, closeIssue } = require("../issue-validate");

exports.schedulerTask = async function () {
    const issue = github.context.payload.issue
    if (!validateIssueFormat(issue)) {
        await closeIssue(github.context)
        return `Invalidate Issue Format ! Ignoring`;
    }

    await Promise.all([
        step(`-> scheduler start`),
        step(`-> reporting issue `),
        issueReport(github.context),
        step(`-> Ready to dispatch a task`),
        tapdTask(github.context),
        step(`-> scheduler end`)
    ])

    return 'post scheduler end'
}

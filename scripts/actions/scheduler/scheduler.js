const github = require("@actions/github");
const issueReport = require('./report-issue');
const { tapdTask } = require('./actions/action-tapd');
const { step } = require("../report-helper");

exports.schedulerTask = async function () {
    await Promise.all([
        step(
            `-> scheduler start`
        ),
        step(` -> reporting issue `),
        issueReport(github.context),
        step(
            ` -> Ready to dispatch a task `
        ),
        tapdTask(github.context),
        step(
            ` -> scheduler end `
        ),
    ])
}

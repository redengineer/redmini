const github = require("@actions/github");
const core = require("@actions/core");
const { getBodyContentInfoByName, step } = require("./report-helper");

/**
 * close issue
 * @internal
 *
 * @param { String } body - issue body string
 */
exports.closeIssue = async function (ctx) {
  step(`-> Invalidate Closing`);
  const githubToken = core.getInput("github-token");
  const closeLable =
    core.getInput("close-issue-label", { required: false }) || "close";
  const closeComment = core.getInput("close-issue-comment", { required: true });
  const repoName = ctx.payload.repository.name;
  const ownerName = ctx.payload.repository.owner.login;
  const issue = ctx.payload.issue;
  const octokit = github.getOctokit(githubToken);
  step(`-> Close Parmas: repoName: ${repoName}, ownerName: ${ownerName}, issueNumber: ${issue.number}`);
  await Promise.all([
    octokit.rest.issues.addLabels({
      owner: ownerName,
      repo: repoName,
      issue_number: issue.number,
      labels: [closeLable],
    }),
    octokit.rest.issues.createComment({
      owner: ownerName,
      repo: repoName,
      issue_number: issue.number,
      body: closeComment,
    }),
    octokit.rest.issues.update({
      owner: ownerName,
      repo: repoName,
      issue_number: issue.number,
      state: "closed",
    })
  ]);
  step(`-> Invalidate closed`);
};

/**
 * issue validate
 * @internal
 *
 * @param { String } body - issue body string
 */
exports.validateIssueFormat = function (issue) {
  step(`-> validating issue body`);

  // todo validate issue format otherwise close issue
  const third_name = getBodyContentInfoByName(issue.body, '所属的服务商');
  const problemModules = getBodyContentInfoByName(issue.body, '问题模块');

  console.log("=== third_name validate ===", third_name);
  console.log("=== problemModules validate ===", problemModules);

  // 基础信息校验
  if (
    !issue.title ||
    !third_name ||
    !problemModules
  ) {
    step(`-> Invalidate issue !!!!`);
    return false;
  }

  step(`-> Invalidate Verify Successfully!`);
  return true;
};

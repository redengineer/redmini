const github = require("@actions/github");
const core = require("@actions/core");
const { getThirdName } = require("../report-helper");
const { validateIssueFormat } = require("../issue-validate");

async function main() {
  const githubToken = core.getInput("github-token");
  const ignoreIfLabeled = core.getInput("ignore-if-labeled", { required: false }) || false;
  
  const octokit = github.getOctokit(githubToken);
  const context = github.context;
  const repoName = context.payload.repository.name;
  const ownerName = context.payload.repository.owner.login;
  const issue = context.payload.issue

  if (!validateIssueFormat(issue)) {
    return `Invalidate Issue Format ! Ignoring`;
  }

  const third_name = getThirdName(issue.body, [16, 26]);
  const issueType = getThirdName(issue.body, [5, 15]);

  let issueNumber = issue.number

  if (!issueNumber) {
    throw new Error(`
      issueNumber was not identified"
    `)
  }

  var updateInfoStats = await octokit.rest.issues.get({
    owner: ownerName,
    repo: repoName,
    issue_number: issueNumber,
  });

  let labels = updateInfoStats.data.labels.map(label => label.name);

  if (ignoreIfLabeled) {
    if (labels.length !== 0) {
      return "No action being taken. Ignoring because one or labels have been added to the issue";
    }
  }

  // 默认取第一个
  labels.push(third_name?.[0], issueType?.[0])

  await octokit.rest.issues.addLabels({
    owner: ownerName,
    repo: repoName,
    issue_number: issueNumber,
    labels: labels
  });
  return `Updated labels in ${issueNumber}. Added: ${labels}`;
}

main()
  .then(
    result => {
      console.log(result);
    },
    err => {
      console.log(err);
    }
  )
  .then(() => {
    process.exit();
  });
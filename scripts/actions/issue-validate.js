const github = require("@actions/github");
const core = require("@actions/core");
const { step, getSelectedItem } = require("./report-helper");

/**
 * 获取 label 后面的多选内容
 * 
 * @param {*} md 
 * @param {*} labelMatcher 
 * @returns 
 */
function matchLabelWithSelector(
  md,
  labelMatcher
) {
  const reg = new RegExp(`(?<=${labelMatcher}(\\s+|\\n+)\\+?)((\\n+?|\\s+?)?-\\s+?\\[[\\s|\\x]?\\]\\s+[\\u4e00-\\u9fa5_a-zA-Z0-9_\\(.\\-\\/\\)].+)+`, 'gm')

  const result = md.match(reg)?.[0]?.split?.('\n')?.filter(Boolean) || null

  return result;
}

/**
 * 获取 label 后面的文本内容
 * 
 * @param { String } md - markdown 
 * @param { String (RegExp) } labelMatcher - label regExp
 * @returns { String || null } 
 */
function matchLabelWithText(
  md,
  labelMatcher
) {
  if (!labelMatcher) return null
  const reg = new RegExp(`(?<=${labelMatcher})\\n+?.+`, 'gm');
  const result = 
    md.match(reg)?.[0]?.split?.('\n')?.filter?.(Boolean)?.[0]?.trim() || null
    
  return result
}

/**
 * close issue
 * @internal
 *
 * @param { String } body - issue body string
 */
async function closeIssue (ctx) {
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
function validateIssueFormat(issue) {
  step(`-> validating issue body`);
  if (!issue.title) return false
  
  const thirdSelectors = matchLabelWithSelector(issue.body, "\\#\\# 服务商名称\\(必填\\[单选\\]\\) - 排名不分先后");
  const issueSelectors = matchLabelWithSelector(issue.body, "\\#\\# 问题模块\\(必填\\[单选\\]\\)");

  step(`-> validating issue got thirdSelectors length: ${thirdSelectors?.length}`);
  step(`-> validating issue got issueSelectors length: ${issueSelectors?.length}`);

  if (
    !thirdSelectors
    || !thirdSelectors.length
    || !issueSelectors 
    || !issueSelectors.length
  ) {
    return false
  }
  
  const thirdName = getSelectedItem(thirdSelectors);
  const issueType = getSelectedItem(issueSelectors);

  step(`-> validating issue got thrid name: ${JSON.stringify(thirdName)}`);
  step(`-> validating issue got issue type: ${JSON.stringify(issueType)}`);

  // 基础信息校验
  if (!thirdName || !issueType) {
    step(`-> Invalidate issue !!!!`);
    return false;
  }

  step(`-> Invalidate Verify Successfully!`);
  return true;
}

/**
 * 校验 markdown 中某个标题下的多选是否符合要求
 * @internal 
 * 
 * @params { String } markdown - 模板
 * @params { String[Reg] } labelMatcher - 用于匹配的 label 字符
 * @params { Function } validator - 处理函数
 * @params { Number } type - 1: 匹配多选, 2: 匹配文本内容
 */
function validateLabelWithContent(md, labelMatcher, validator, type = 1) {
  /**
   * 
   * match lebel with muti actions
   * 
   * @example
   * 
   * input: 
   *  name = "\\#\\# 节点选择 \\+?"
   * 
   * output:
   *  '- [ ] 节点node-slave-one +',
   *  '- [ ] 节点node-slave-two +',
   *  '- [ ] 节点node-slave-three +',
   *  '- [ ] 节点node-slave-four +',
   */

  let result = null

  if (type === 1) {
    result = matchLabelWithSelector(md, labelMatcher)
  } else {
    result = matchLabelWithText(md, labelMatcher)
  }

  if (validator && typeof validator === 'function') {
    return validator(result)
  }

  return false
}

module.exports = {
  validateLabelWithContent,
  validateIssueFormat,
  matchLabelWithSelector,
  matchLabelWithText,
  closeIssue,
}
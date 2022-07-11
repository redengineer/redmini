const superagent = require("superagent");
const { __tapd_new_task__, __tapd_workspace_token__ } = require("../config");
const { getTaskList, getThirdName } = require("./report-helper");

/**
 * @param {*} issue - github issue
 * @returns { object } - tapd content
 * @link { https://www.tapd.cn/help/show?backup_id=1120003271001000140#target:toc3 }
 */
function getTapdTaskParams(issue) {
  const third_name = getThirdName(issue.body, [16, 26]);
  const issueType = getThirdName(issue.body, [5, 15]);

  const task_refer = getTaskList(issueType) || [];

  return {
    name: `[Github Bug Report]: ${issue.title || "unknown"}`,
    creator: `github_xhs_robot`,
    workspace_id: "68072076",
    parent_id: "1110860", // tapd 父需求关联
    owner: task_refer?.[0] || "哈笛台亮",
    developer: task_refer.join(","),
    priority: "3", // 默认中优
    description: `
        - Github 需求链接: ${issue.html_url}
        <br />
        - 服务商: ${third_name}
        <br />
        - issue 创建时间: ${new Date().toLocaleDateString()}
      `,
  };
}

/**
 * request tapd api
 *
 * @returns { Promise }
 */
function dispatchTapdTask(issue) {
  return new Promise((resolve, reject) => {
    superagent
      .post(__tapd_new_task__)
      .send(getTapdTaskParams(issue))
      .set("token", __tapd_workspace_token__)
      .set("Content-Type", "application/json")
      .set("accept", "json")
      .end((err, res) => {
        if (err) reject(err);

        resolve(res);
      });
  });
}

/**
 * dispatch a tapd task
 *
 * @param {*} ctx
 */
exports.tapdTask = async function (ctx) {
  if (!("payload" in ctx) || !("issue" in ctx.payload)) {
    throw new Error("no payload found in context");
  }
  const issue = ctx.payload.issue;

  await dispatchTapdTask(issue);
};

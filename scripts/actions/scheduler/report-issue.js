const superagent = require("superagent");
const { getWxRobotHook } = require("../config");
const {
  getMentioneList,
  getThirdName,
} = require("../report-helper");

/**
 * map issue event to notify content
 *
 * @params { String } title - issue title
 * @params { String } third_name - third_name name || 'unkonwn'
 * @params { String } issueType - iOS | Android | Framework
 * @params { Object } restInfo - { [key: string]: unkonwn }
 */
function getNotfiyContent({ title, third_name, issueType, restInfo }) {
  return {
    msgtype: "markdown",
    mentioned_list: getMentioneList(issueType),
    markdown: {
      content: `
        ## 🦑 Github Issue Report 👾 \n
        > issue 标题: <font color=\"orange\"> ${title} </font> \n
        > issue 提报服务商: <font color=\"blue\"> ${third_name} </font> \n
        > issue 问题分类: <font color=\"blue\"> ${issueType} </font> \n
        > issue Assignees: <font color=\"comment\"> ${getMentioneList(
          issueType
        )} </font> \n
        > issue 链接: <font color=\"purple\"> [${restInfo.url}](${
        restInfo.url
      }) </font>
      `,
    },
  };
}

/**
 * notify wechat group robot
 *
 * @params { String } title - issue title
 * @params { String } third_name - third_name name || 'unkonwn'
 * @params { Object } restInfo - { [key: string]: unkonwn }
 *
 * @returns
 */
const notifyWeChat = function (opts) {
  return new Promise((resolve, reject) => {
    superagent
      .post(getWxRobotHook())
      .send(getNotfiyContent(opts))
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) reject(err);

        resolve(res);
      });
  });
};

module.exports = async function reportIssue(ctx) {
  try {
    if (!("payload" in ctx) || !("issue" in ctx.payload)) {
      throw new Error("no payload found in context");
    }

    const issue = ctx.payload.issue;

    await notifyWeChat({
      title: issue.title,
      third_name: getThirdName(issue.body, [16, 26]),
      issueType: getThirdName(issue.body, [5, 15]),
      restInfo: { url: issue.html_url },
    });
  } catch (e) {
    console.log("### Report Script Error ###", e);
  }
};

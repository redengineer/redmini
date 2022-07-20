const superagent = require("superagent");
const { getWxRobotHook } = require("../config");
const {
  getMentioneList,
  getMarkDownStats,
} = require("../report-helper");

/**
 * map issue event to notify content
 *
 * @params { String } title - issue title
 * @params { String } thirdName - thirdName name || 'unkonwn'
 * @params { String } issueType - iOS | Android | Framework
 * @params { Object } restInfo - { [key: string]: unkonwn }
 */
function getNotfiyContent({ title, thirdName, issueType, restInfo, appVersion, libVersion }) {
  return {
    msgtype: "markdown",
    mentioned_list: getMentioneList(issueType),
    markdown: {
      content: `
        ## 🦑 Github Issue Report 👾 \n
        > issue 标题: <font color=\"orange\"> ${title} </font> \n
        > issue 提报服务商: <font color=\"blue\"> ${thirdName} </font> \n
        > issue 基础库: <font color=\"orange\"> ${libVersion} </font> \n
        > issue 客户端版本: <font color=\"orange\"> ${appVersion} </font> \n
        > issue 问题分类: <font color=\"blue\"> ${issueType} </font> \n
        > issue 负责人: <font color=\"comment\"> ${getMentioneList(
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
 * @params { String } thirdName - thirdName name || 'unkonwn'
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

    const { 
      issueType, 
      thirdName,
      appVersion,
      libVersion
    } = getMarkDownStats(issue.body)

    await notifyWeChat({
      title: issue.title,
      issueType: issueType,
      thirdName: thirdName,
      restInfo: { url: issue.html_url },
      appVersion,
      libVersion
    });
  } catch (e) {
    console.log("### Report Script Error ###", e);
  }
};

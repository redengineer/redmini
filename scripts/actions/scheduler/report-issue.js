const superagent = require("superagent");
const { getWxRobotHook } = require("../config");
const {
  getMentioneList,
  getBodyContentInfoByName,
} = require("../report-helper");

/**
 * @note
 *  issue type 
 */
const TYPE_ENUM = {
  FEATURE: 'feature',
  BUG: 'bug',
  OPERATOR: 'operator'
}

/**
 * map issue event to notify content
 *
 * @params { String } title - issue title
 * @params { String } third_name - third_name name || 'unkonwn'
 * @params { String } problemModules - iOS | Android | Framework
 * @params { Object } restInfo - { [key: string]: unkonwn }
 */
function getBugNotfiyContent({ title, third_name, problemModules, restInfo }) {
  return {
    msgtype: "markdown",
    mentioned_list: getMentioneList(problemModules),
    markdown: {
      content: `
        ## 🦑 Github Issue Report 👾 \n
        > issue 标题: <font color=\"orange\"> ${title} </font> \n
        > issue 提报服务商: <font color=\"blue\"> ${third_name} </font> \n
        > issue 问题分类: <font color=\"blue\"> ${problemModules} </font> \n
        > issue Assignees: <font color=\"comment\"> ${getMentioneList(
          problemModules
        )} </font> \n
        > issue 链接: <font color=\"purple\"> [${restInfo.url}](${
        restInfo.url
      }) </font>
      `,
    },
  };
}

/**
 * feature content
 */
function getFeatureContent({ title, third_name, description, restInfo }) {
  return {
    msgtype: "markdown",
    mentioned_list: ["兰飞鸿", "哈笛"],
    markdown: {
      content: `
        ## 🦑 新需求  👾 \n
        > feature title: <font color=\"orange\"> ${title} </font> \n
        > feature 提报服务商: <font color=\"blue\"> ${third_name} </font> \n
        > feature 描述: <font color=\"blue\"> ${description} </font> \n
        > feature 链接: <font color=\"purple\"> [${restInfo.url}](${
        restInfo.url
      }) </font>
      `,
    },
  };
}

/**
 * operator content
 */
function getOperatorContent({ 
  title, 
  third_name, 
  scenario, 
  restInfo, 
  bussinessInfo,
  description
}) {
  return {
    msgtype: "markdown",
    mentioned_list: ['牛顿(叶晨阳)', '郎乔(冯姚洁人)'],
    markdown: {
      content: `
        ## 🦑 服务商运营提问  👾 \n
        > feature title: <font color=\"orange\"> ${title} </font> \n
        > feature 提问服务商: <font color=\"blue\"> ${third_name} </font> \n
        > feature 业务场景: <font color=\"blue\"> ${scenario} </font> \n
        > feature 问题描述: <font color=\"blue\"> ${description} </font> \n
        > feature 店铺/小程序基础信息: <font color=\"blue\"> ${bussinessInfo} </font> \n
        > feature 链接: <font color=\"purple\"> [${restInfo.url}](${
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
const notifyWeChat = function (body) {
  return new Promise((resolve, reject) => {
    superagent
      .post(getWxRobotHook())
      .send(body)
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

    const issueType = getBodyContentInfoByName(issue.body, 'Issue类型')

    if (issueType === TYPE_ENUM.BUG) {
      const body = getBugNotfiyContent({
        title: issue.title,
        third_name: getBodyContentInfoByName(issue.body, '所属的服务商'),
        problemModules: getBodyContentInfoByName(issue.body, '问题模块'),
        restInfo: { url: issue.html_url },
      })
      await notifyWeChat(body);
    }

    if (issueType === TYPE_ENUM.FEATURE) {
      const body = getFeatureContent({
        title: issue.title,
        third_name: getBodyContentInfoByName(issue.body, '所属的服务商'),
        description: getBodyContentInfoByName(issue.body, '新功能描述'),
        restInfo: { url: issue.html_url },
      })
      await notifyWeChat(body)
    }

    if (issueType === TYPE_ENUM.OPERATOR) {
      const body = getOperatorContent({
        title: issue.title,
        third_name: getBodyContentInfoByName(issue.body, '所属的服务商'),
        description: getBodyContentInfoByName(issue.body, '运营场景描述'),
        scenario: getBodyContentInfoByName(issue.body, '业务场景'),
        bussinessInfo: getBodyContentInfoByName(issue.body, '业务基础信息（选填）'),
        restInfo: { url: issue.html_url },
      })
      await notifyWeChat(body)
    }

  } catch (e) {
    console.log("### Report Script Error ###", e);
  }
};

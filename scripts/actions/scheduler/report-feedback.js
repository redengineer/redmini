
const superagent = require("superagent");
const { getFeedbackCreateUri } = require("../config");
const { getBodyContentInfoByName } = require("../report-helper");

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
 * 1:功能建议 2:功能咨询 3:审核申诉 4:线上bug
 */
const TICKET_TYPE_MAP = {
  [TYPE_ENUM.FEATURE]: 1,
  [TYPE_ENUM.BUG]: 4,
  [TYPE_ENUM.OPERATOR]: 2
}

const CATEGORY_MAP = {
  "小程序框架": 132,
  "小程序Api": 133,
  "小程序基础组件": 134,
  "小程序开发者工具(IDE)": 135,
  "小程序容器(iOS)": 136,
  "小程序容器(Android)": 137,
  "小程序服务(服务后台)": 138,
  "小程序服务(文档平台)": 139,
  "小程序业务(需求/支付/服务号)": 140
}


/**
 * dispatch a tapd task
 *
 * @param {*} ctx
 */
exports.feedBackTask = async function (ctx) {
  if (!("payload" in ctx) || !("issue" in ctx.payload)) {
    throw new Error("no payload found in context");
  }
  const issue = ctx.payload.issue;  
  return new Promise((resolve, reject) => {
    const issueType = getBodyContentInfoByName(issue.body, 'Issue类型')
    const third_name = getBodyContentInfoByName(issue.body, '所属的服务商');
    const problemModules = getBodyContentInfoByName(issue.body, '问题模块');

    const data = {
      title: `[GITHUB ISSUE BOT]: ${issue.title}`,
      content: `
        - Github 需求链接: ${issue.html_url} \n
        - 问题模块: ${problemModules} \n
        - 服务商: ${third_name} \n
        - issue 创建时间: ${new Date().toLocaleDateString()}
      `,
      serviceId: "246694186266030080",
      // 默认按 bug 处理
      ticketType: TICKET_TYPE_MAP[issueType] || 4,
      firstCategoryId: CATEGORY_MAP[problemModules.trim()],
      source: 9,
      customFields: [
        {
          name: "originalUrl",
          itemType: "INPUT",
          itemValue: issue.html_url
        }
      ]
    }

    console.log('[feedback request data]: ', data)
    superagent
      .post(getFeedbackCreateUri())
      .set('currentworkspaceid', '246694088308060160')
      .set('priority', 'u=1, i')
      .set('content-type', 'application/json;charset=UTF-8')
      .set('userType', 'outUser')
      .send(data)
      .end((err, res) => {
        console.log('[feedback request result]: ', err, res)
        if (err) {
          reject(err);
          return;
        }
        resolve(res.data);
      });
  });
};
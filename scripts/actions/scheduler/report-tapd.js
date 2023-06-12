const superagent = require("superagent");
const { getPingcodeIssueRequestUri, getPingcodeProjectId, getPingcodeAuthUri, getPingcodeSecret, getPingcodeClientId } = require("../config");
const { getTaskList, getBodyContentInfoByName } = require("../report-helper");

/**
 * @param {*} issue - github issue
 * @returns { object } - tapd content
 * @link { https://www.tapd.cn/help/show?backup_id=1120003271001000140#target:toc3 }
 */
function getTapdTaskParams(issue) {
  const third_name = getBodyContentInfoByName(issue.body, '所属的服务商');
  const problemModules = getBodyContentInfoByName(issue.body, '问题模块');

  const task_refer = getTaskList(problemModules) || [];

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

function getPingcodeToken() {
  return new Promise((resolve, reject) => {
    return superagent
      .get(getPingcodeAuthUri())
      .query({ 
        grant_type: 'client_credentials', 
        client_id: getPingcodeClientId(), 
        client_secret: getPingcodeSecret() 
      })
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("res.bodyres.body", res)
        resolve(res.body);
      });
  })
}

const tokenMap = {
  '兰飞鸿': '3a9aa4aaa783428a969551f112b9477a',
  '大路': '21069756b3ec4465811f34f1b4328992',
  '断水': '070e6e16a2644a48a7fdaf5df0b9f2fd',
  '盖聂': '280007ebe74948f38567333c1cb5d3ec',
  "哈笛": '680acd7e43084b2189045fa235f17653',
  '敬城': '2f28aff2324f4096a8f31ffb753ecff8',
  '龙司': 'd304255d432b41b19b6349bfdeb5afde',
  '小陆': 'fe456da08b4244159cff37e1a84cf0ac',
  '时木': '9b57d96044164d9ea9c5c530bcd4fb49',
  '哈笛': 'c296a9357f66470580838fb5cfaa065e',
  '寤生': '8a2d4b1f095b42bc862c82ac1c577340',
  '小砾': '4d2d7a622b454152bdb6bf02c75cb459',
  '周杨杰': '5d22b9ddef1044f09893fba32e0cf032',
  '牛顿': 'e1a69f44ec0c4f8cb506502169c5a570'
}

const getToken = (name) => tokenMap[name]

const assigneeMap = {
  "小程序框架": ["哈笛", "兰飞鸿"],
  "小程序Api": ["小陆", "哈笛", "兰飞鸿"],
  "小程序基础组件": ["龙司", "兰飞鸿"],
  "小程序开发者工具(IDE)": ["寤生", "兰飞鸿"],
  "小程序容器(iOS)": ["敬城", "大路", "兰飞鸿"],
  "小程序容器(Android)": ["太乙", "小砾", "断水", "时木", "兰飞鸿"],
  "小程序服务(服务后台)": ["和泉", "兰飞鸿"],
  "小程序服务(文档平台)": ["小陆", "周杨杰", "兰飞鸿"],
  "小程序业务(需求/支付/服务号)": ["牛顿", "兰飞鸿"],
}

function getAssigneeId(module) {
  const assigneeName = assigneeMap?.[module]?.[0] || "哈笛"
  return getToken(assigneeName)
}

function getAssigneeIds() {
  const assignees = assigneeMap?.[module] || ["哈笛", "兰飞鸿"]
  return assignees.map(getToken)
}

/**
 * request [pingcode] api
 *
 * @returns { Promise }
 */
function dispatchPingcodeIssue(issue, accessToken) {
  return new Promise((resolve, reject) => {
    const third_name = getBodyContentInfoByName(issue.body, '所属的服务商');
    const problemModules = getBodyContentInfoByName(issue.body, '问题模块');
    const data = {
      project_id: getPingcodeProjectId(),
      title: `[Github Bug Report]: ${issue.title}`,
      description: `
- Github 需求链接: ${issue.html_url}
<br />
- 问题模块: ${problemModules}
- 服务商: ${third_name}
<br />
- issue 创建时间: ${new Date().toLocaleDateString()}
  `,
      assignee_id: getAssigneeId(),
      participant_ids: getAssigneeIds(),
      start_at: Date.now()
    };

    superagent
      .post(getPingcodeIssueRequestUri())
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(data)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res.body);
      });
  });
}

/**
 * dispatch a tapd task
 *
 * @param {*} ctx
 */
exports.pingcodeTask = async function (ctx) {
  if (!("payload" in ctx) || !("issue" in ctx.payload)) {
    throw new Error("no payload found in context");
  }
  const issue = ctx.payload.issue;
  const { access_token } = await getPingcodeToken()
  const res = await dispatchPingcodeIssue(issue, access_token)

  console.log('[pingcode request res]: ', res)

  return res
};
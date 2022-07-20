const { matchLabelWithText, matchLabelWithSelector } = require('./issue-validate');

/**
 * 
 * @param { String } body - issue body string  
 */
 function getSelectedItem(selectors) {
    try {
        return selectors
            .filter(l => l.match(/[x]/g))
            .map(l => l.match(/[\u4e00-\u9fa5]+(\([\W\w]+\))?/g)?.[0])?.[0] || null
    } catch (e) {
        return null
    }
}

/**
 * return markdown stats
 * 
 * @param { String } markdown 
 */
exports.getMarkDownStats = function (md) {
  const thirdSelectors = matchLabelWithSelector(md, "\\#\\# 服务商名称\\(必填\\[单选\\]\\) - 排名不分先后");
  const issueSelectors = matchLabelWithSelector(md, "\\#\\# 问题模块\\(必填\\[单选\\]\\)");
  
  let appVersion = matchLabelWithText(md, "\\#\\# 使用的小红书APP版本\\(非必填\\)");
  let libVersion = matchLabelWithText(md, "\\#\\# 使用的小红书APP版本\\(非必填\\)");

  if (!appVersion || (appVersion.trim() === "例如：v7.47.1")) {
    appVersion === "开发者未填写APP版本"
  }

  if (!libVersion || (libVersion.trim() === "例如：v3.28.1")) {
    libVersion === "开发者未填写基础库版本"
  }

  if (
    !thirdSelectors
    || !thirdSelectors.length
    || !issueSelectors 
    || !issueSelectors.length
  ) {
    return {
        thirdName: null,
        issueType: null,
        libVersion,
        appVersion
    }
  }
  
  const thirdName = getSelectedItem(thirdSelectors);
  const issueType = getSelectedItem(issueSelectors);

  return {
    thirdName,
    issueType,
    libVersion,
    appVersion
  }
}

/**
 * mentioned list map
 */
const mentioned_map = {
    "小程序框架": ["兰飞鸿", "哈笛"],
    "小程序Api": ["@兰飞鸿(许天明)", "@哈笛(台亮)"],
    "小程序基础组件": ["@兰飞鸿(许天明)", "@哈笛(台亮)"],
    "小程序开发者工具(IDE)": ["@兰飞鸿(许天明)", "@米波(谷亚先)"],
    "小程序容器(iOS)": ["@月白(李义真)", "@泰坦(万祥)", "@敬城(彭伟男)"],
    "小程序容器(Android)": ["@太乙(赵映)"],
    "小程序服务(服务后台)": ["@和泉(居振飞)", "@寸辉(刘志嘉)"],
    "小程序服务(文档平台)": ["@和泉(居振飞)", "@寸辉(刘志嘉)", "@兰飞鸿(许天明)", "@哈笛(台亮)"],
    "小程序业务(需求/支付/服务号)": ["@盖聂(周翘楚)", "@郎乔(冯姚洁人)"],
}


/**
 * task list map
 */
const task_list_map = {
    "小程序框架": ["哈笛台亮", "兰飞鸿许天明"],
    "小程序Api": ["哈笛台亮", "兰飞鸿许天明"],
    "小程序基础组件": ["哈笛台亮", "兰飞鸿许天明"],
    "小程序开发者工具(IDE)": ["兰飞鸿许天明", "米波谷亚先"],
    "小程序容器(iOS)": ["泰坦万祥", "敬城彭伟男"],
    "小程序容器(Android)": ["太乙赵映"],
    "小程序服务(服务后台)": ["和泉居振飞", "寸辉刘志嘉"],
    "小程序服务(文档平台)": ["和泉居振飞", "寸辉刘志嘉", "兰飞鸿许天明", "哈笛台亮"],
    "小程序业务(需求/支付/服务号)": ["盖聂周翘楚", "郎乔冯姚洁人"],
}

/**
 * get task list 
 * 
 * @internal
 */
exports.getTaskList = function (type) {
    try {
        return task_list_map[type] || ["哈笛台亮", "兰飞鸿许天明"];
    } catch (_) {
        return ["哈笛台亮", "兰飞鸿许天明"];
    }
}

/**
 * get mentione list 
 * 
 * @internal
 */
exports.getMentioneList = function (type) {
    try {
        return mentioned_map[type] || ["兰飞鸿", "哈笛"];
    } catch (_) {
        return ["兰飞鸿", "哈笛"];   
    }
}

/**
 * 
 * @param { string } msg - step log 
 */
exports.step = function (msg) {
    console.log(require('chalk').cyan(msg))
}

exports.sleep = function (ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

exports.getSelectedItem = getSelectedItem
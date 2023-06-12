/**
 * 
 * @param { String } body - issue body string  
 */
exports.getBodyContentInfoByName = function (body, name) {
    try {
      return body.match(new RegExp(`(?<=##\\s+${name}\\s+?\n?)[^#]+`, 'g'))[0].replace('\'', '').trim()
    } catch (e) {
      return null
    }
}

/**
 * mentioned list map
 */
const mentioned_map = {
    "小程序框架": ["兰飞鸿", "哈笛"],
    "小程序Api": ["兰飞鸿(许天明)", "哈笛(台亮)"],
    "小程序基础组件": ["兰飞鸿(许天明)", "哈笛(台亮)"],
    "小程序开发者工具(IDE)": ["寤生(王晨)"],
    "小程序容器(iOS)": ["敬城(彭伟男)", "大路(余黎明)"],
    "小程序容器(Android)": ["太乙(赵映)", "断水(邵孟杰)", "小砾(姚朋宾)", "时木(郭钰博)"],
    "小程序服务(服务后台)": ["和泉(居振飞)"],
    "小程序服务(文档平台)": ["和泉(居振飞)", "兰飞鸿(许天明)", "哈笛(台亮)"],
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

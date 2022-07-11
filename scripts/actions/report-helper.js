/**
 * issue validate
 * @internal 
 * 
 * @param { String } body - issue body string  
 */
exports.validateIssueFormat = function (issue) {
    // todo validate issue format otherwise close issue
    return !!issue
}

/**
 * 
 * @param { String } body - issue body string  
 */
exports.getThirdName = function (body, range) {
    try {
        // console.log('body', body)
        if (!range || !range.length) return 'unknown';
        /**
         * @example
         * 
         * ```md
         * 
         * ## 是否是服务商开发者(服务商必填)[排名不分先后]
         *  - [x] 微盟
         *  - [] 有赞
         * ```
         */
        const thirdList = body.split('+')
            .filter(x => x !==  "\r\n' ")
            .slice(range[0], range[1]);

        console.log('thirdList', thirdList);

        return thirdList
            .filter(l => l.match(/[x]/g))
            .map(l => l.match(/[\u4e00-\u9fa5]+(\w+)?/g)?.[0] || 'unknown')
    } catch (e) {
        return 'unknown'
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
    "小程序框架": ["哈笛", "兰飞鸿"],
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
        return task_list_map[type] || ["哈笛", "兰飞鸿"];
    } catch (_) {
        return ["哈笛", "兰飞鸿"];
    }
}

/**
 * get mentione list 
 * 
 * @internal
 */
exports.getMentioneList = function (type) {
    console.log('=== mentioned_map type ===', type);
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

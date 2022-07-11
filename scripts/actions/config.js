const core = require('@actions/core');

module.exports = {
    /**
     * wechat robot hook
     * @warning
     */
    getWxRobotHook() {
        return core.getInput('wx-robot-hook')
    },
    /**
     * tapd task new
     * @warning
     */
    getNewTaskPath() {
        return core.getInput('tapd-new-task')
    },
    /**
     * tapd workspace token
     * @warning
     */
    getWorkSpaceToken() {
        return core.getInput('tapd-workspace-token')
    },
}


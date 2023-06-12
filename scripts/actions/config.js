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
    /**
     * pingcode url
     */
    getPingcodeClientId() {
        return core.getInput('__PINGCODE_CLIENT_ID__')
    },
    getPingcodeSecret() {
        return core.getInput('__PINGCODE_MINI_SECRET__')
    },
    getPingcodeIssueRequestUri() {
        return core.getInput('__PINGCODE_MINI_URL_ISSUE__')
    },
    getPingcodeProjectId() {
        return core.getInput('__PINGCODE_MINI_PROJECT_ID__')
    },
    getPingcodeAuthUri() {
        return core.getInput('__PINGCODE_MINI_URL_AUTH__')
    }
}


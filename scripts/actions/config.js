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
        return core.getInput('pingcode-mini-client-id')
    },
    getPingcodeSecret() {
        return core.getInput('pingcode-mini-secret')
    },
    getPingcodeIssueRequestUri() {
        return core.getInput('pingcode-mini-url-issue')
    },
    getPingcodeProjectId() {
        return core.getInput('pingcode-mini-project-id')
    },
    getPingcodeAuthUri() {
        return core.getInput('pingcode-mini-url-auth')
    },
    /**
     * feedback uri
     */
    getFeedbackCreateUri() {
        return core.getInput('feedback-mini-url-create')
    },
}


const fs = require('fs');
const path = require('path');

// templte path
const tmpPath = '.github/ISSUE_TEMPLATE/issue---.md'

module.exports = {
    /**
     * 
     * @param {*} param0 
     * @returns 
     */
    getIssueTemplate() {
        const issueTemplate = fs.readFileSync(path.resolve(__dirname, `../../../${tmpPath}`), 'utf-8');
        return issueTemplate
    }
}
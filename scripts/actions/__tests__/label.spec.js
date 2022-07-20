const { validateIssueFormat, validateLabelWithContent } = require("../issue-validate");
const { getIssueTemplate } = require('./help');


describe('Issue Validate Test', () => {
  test('issue can be verified correctly', () => {
    const md = getIssueTemplate();
    const result = validateIssueFormat({ body: md })
    expect(result).toBe(false);
  })

  test('issue can be verified correctly stage two', () => {
    const lebelMatcher =  "\\#\\# 系统环境\\(必填\\[多选\\]\\)"
    const md = getIssueTemplate();

    const validator = (matchs) => {
      if (!matchs || !matchs.length) {
        return false;
      }

      if (matchs.some(m => /\[x\]/g.test(m))) {
        return true
      }

      return false
    }

    const isValidate = validateLabelWithContent(
      md,
      lebelMatcher,
      validator
    );

    expect(isValidate).toBe(false);
  })


  test('issue can be verified correctly stage two', () => {
    const lebelMatcher =  "\\#\\# 系统环境\\(必填\\[多选\\]\\)"

    const markdown = `
      ## 系统环境(必填[多选])
      - [x] IOS
      - [x] Android
      - [x] IDE
      
      ## 问题模块(必填[单选])
      - [] 小程序框架
      - [ ] 小程序Api
      - [ ] 小程序基础组件
      - [ ] 小程序开发者工具(IDE)
      - [ ] 小程序容器(iOS)
      - [ ] 小程序容器(Android)
      - [ ] 小程序服务(服务后台)
      - [ ] 小程序服务(文档平台)
      - [x] 小程序业务(需求/支付/服务号)
      
      ## 服务商名称(必填[单选]) - 排名不分先后
      - [x] 有赞
      - [ ] 微盟
      - [ ] 直客通
      - [ ] 民宿宝
      - [ ] 订单来了
      - [ ] 太目
      - [x] 其他(自开发)
    `
    
    const validator = (matchs) => {
      if (!matchs || !matchs.length) {
        return false;
      }

      if (matchs.some(m => /\[x\]/g.test(m))) {
        return true
      }

      return false
    }

    const isValidate = validateLabelWithContent(
      markdown,
      lebelMatcher,
      validator
    );

    expect(isValidate).toBe(true);
  })
})

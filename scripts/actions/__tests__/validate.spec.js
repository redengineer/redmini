const { validateIssueFormat } = require("../issue-validate.js");
const { getMarkDownStats } = require('../report-helper');

describe('Issue Format Unit Test', () => {
  test('markdown format can be verified correctly when required field is missing', () => {
    const markdown = `
      ## 系统环境(必填[多选])
      - [x] IOS
      - [x] Android
      - [x] IDE
      
      ## 问题模块(必填[单选])
      - [ ] 小程序框架
      - [ ] 小程序Api
      - [ ] 小程序基础组件
      - [ ] 小程序开发者工具(IDE)
      - [ ] 小程序容器(iOS)
      - [ ] 小程序容器(Android)
      - [ ] 小程序服务(服务后台)
      - [ ] 小程序服务(文档平台)
      - [ ] 小程序业务(需求/支付/服务号)
      
      ## 服务商名称(必填[单选]) - 排名不分先后
      - [ ] 有赞
      - [ ] 微盟
      - [ ] 直客通
      - [ ] 民宿宝
      - [ ] 订单来了
      - [ ] 太目
      - [x] 其他(自开发)
    `
    
    const isValid = validateIssueFormat({
      body: markdown,
      title: 'test',
    });

    expect(isValid).toBe(false)
  })

  test('markdown format can be verified correctly when all the required fields are filled in', () => {

    const markdown = `
      ## 系统环境(必填[多选])
      - [x] IOS
      - [x] Android
      - [x] IDE
      
      ## 问题模块(必填[单选])
      - [x] 小程序框架
      - [ ] 小程序Api
      - [ ] 小程序基础组件
      - [ ] 小程序开发者工具(IDE)
      - [ ] 小程序容器(iOS)
      - [ ] 小程序容器(Android)
      - [ ] 小程序服务(服务后台)
      - [ ] 小程序服务(文档平台)
      - [ ] 小程序业务(需求/支付/服务号)
      
      ## 服务商名称(必填[单选]) - 排名不分先后
      - [x] 有赞
      - [ ] 微盟
      - [ ] 直客通
      - [ ] 民宿宝
      - [ ] 订单来了
      - [ ] 太目
      - [x] 其他(自开发)
    
    `
    
    const isValid = validateIssueFormat({
      body: markdown,
      title: 'test',
    });

    expect(isValid).toBe(true)
  })

  test('markdown format can be verified correctly when all the required fields are filled in', () => {

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
    
    const isValid = validateIssueFormat({
      body: markdown,
      title: 'test',
    });

    expect(isValid).toBe(true)
  })
})

describe('Issue Validate Unit Test', () => {
  test('The necessary information can be correctly parsed by getMarkDownStats', () => {
    const markdown = `
      ## 系统环境(必填[多选])
      - [x] IOS
      - [x] Android
      - [x] IDE
      
      ## 问题模块(必填[单选])
      - [ ] 小程序框架
      - [x] 小程序Api
      - [ ] 小程序基础组件
      - [ ] 小程序开发者工具(IDE)
      - [ ] 小程序容器(iOS)
      - [ ] 小程序容器(Android)
      - [ ] 小程序服务(服务后台)
      - [ ] 小程序服务(文档平台)
      - [ ] 小程序业务(需求/支付/服务号)
      
      ## 服务商名称(必填[单选]) - 排名不分先后
      - [ ] 有赞
      - [ ] 微盟
      - [ ] 直客通
      - [ ] 民宿宝
      - [ ] 订单来了
      - [ ] 太目
      - [x] 其他(自开发)
    `
    
    const { 
      issueType,
      thirdName,
      appVersion,
      libVersion    
    } = getMarkDownStats({
      body: markdown,
      title: 'test',
    });

    expect(issueType).toBe("小程序Api")
  })
})

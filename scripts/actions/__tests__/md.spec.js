const { matchLabelWithSelector, matchLabelWithText } = require("../issue-validate");
const { getIssueTemplate } = require("./help");

describe('Markdown Stage One RegExp Test', () => {

  const md = getIssueTemplate();

  test('Can correctly match multiple selection content after label', () => {
    const labelMatcher =  "\\#\\# 系统环境\\(必填\\[多选\\]\\)"

    const matchs = matchLabelWithSelector(
      md,
      labelMatcher
    );

    expect(matchs).toHaveLength(3)
  })


  test('with no selected items', () => {
    const labelMatcher =  "\\#\\# 问题模块\\(必填\\[单选\\]\\)"

    const matchs = matchLabelWithSelector(
      md,
      labelMatcher
    );

    expect(matchs).toHaveLength(9)
    expect(matchs[0]).toEqual('- [ ] 小程序框架')
    expect(matchs[8]).toEqual('- [ ] 小程序业务(需求/支付/服务号)')
  })


  test('with selected items', () => {
    const labelMatcher =  "\\#\\# 服务商名称\\(必填\\[单选\\]\\) - 排名不分先后"

    const matchs =matchLabelWithSelector(
      md,
      labelMatcher
    );
    expect(matchs).toHaveLength(7)
    expect(matchs[0]).toEqual('- [ ] 有赞')
    expect(matchs[6]).toEqual('- [ ] 其他(自开发)')
  })

  test('with version', () => {
    const labelMatcher =  "\\#\\# 使用的小程序基础库版本\\(非必填\\)"

    const text = matchLabelWithText(md, labelMatcher);

    console.log('text', text)
    expect(text).not.toBe(null);
    expect(text).toEqual("例如：v3.28.1");
  })

  test('with step and demo', () => {
    const labelMatcher =  "\\#\\# 重现步骤 和 复现问题的最小demo Github链接"

    const a = matchLabelWithText(md, labelMatcher);

    expect(a).not.toBe(null);
    expect(a).toEqual('例如：//cdn2.xxx.com/xxxxxx.jpg');
  })

  test('with step and demo', () => {
    const labelMatcher =  "\\#\\# 重现步骤 和 复现问题的最小demo Github链接"

    const a = matchLabelWithText(md, labelMatcher);

    expect(a).not.toBe(null);
    expect(a).toEqual('例如：//cdn2.xxx.com/xxxxxx.jpg');
  })

  test('with expect and result', () => {
    const labelMatcher =  "\\#\\# 补充(猜测可能的原因是什么，你有啥想法，选填)"

    const a = matchLabelWithText(md, labelMatcher);

    expect(a).toBe(null);
  })
})

describe('Markdown Stage Two RegExp Test', () => {

  const mdStageTwo = getIssueTemplate();

  test('Can correctly match multiple selection content after label', () => {
    const labelMatcher =  "\\#\\# 系统环境\\(必填\\[多选\\]\\)"

    const matchs = matchLabelWithSelector(
      mdStageTwo,
      labelMatcher
    );

    expect(matchs).toHaveLength(3)
  })


  test('with no selected items', () => {
    const labelMatcher =  "\\#\\# 问题模块\\(必填\\[单选\\]\\)"

    const matchs = matchLabelWithSelector(
      mdStageTwo,
      labelMatcher
    );

    expect(matchs).toHaveLength(9)
    expect(matchs[0]).toEqual('- [ ] 小程序框架')
    expect(matchs[8]).toEqual('- [ ] 小程序业务(需求/支付/服务号)')
  })


  test('with selected items', () => {
    const labelMatcher =  "\\#\\# 服务商名称\\(必填\\[单选\\]\\) - 排名不分先后"

    const matchs =matchLabelWithSelector(
      mdStageTwo,
      labelMatcher
    );
    expect(matchs).toHaveLength(7)
    expect(matchs[0]).toEqual('- [ ] 有赞')
    expect(matchs[6]).toEqual('- [ ] 其他(自开发)')
  })

  test('with version', () => {
    const labelMatcher =  "\\#\\# 使用的小红书APP版本\\(非必填\\)"

    const a = matchLabelWithText(mdStageTwo, labelMatcher);

    expect(a).not.toBe(null);
    expect(a).toEqual('例如：v7.47.1');
  })

  test('with step and demo', () => {
    const labelMatcher =  "\\#\\# 重现步骤 和 复现问题的最小demo Github链接"

    const a = matchLabelWithText(mdStageTwo, labelMatcher);

    expect(a).not.toBe(null);
    expect(a).toEqual('例如：//cdn2.xxx.com/xxxxxx.jpg');
  })

  test('with expect and result', () => {
    const labelMatcher =  "\\#\\# 补充(猜测可能的原因是什么，你有啥想法，选填)"

    const a = matchLabelWithText(mdStageTwo, labelMatcher);

    expect(a).toBe(null);
  })
})

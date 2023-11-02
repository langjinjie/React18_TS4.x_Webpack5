// @see: https://cz-git.qbenben.com/zh/guide
/** @type {import('cz-git').UserConfig} */

module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release'
      ]
    ]
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      // 中文版
      { value: 'feat', name: 'feat: 🚀 新增功能', emoji: '🚀' },
      { value: 'fix', name: 'fix: 🧩 修复缺陷', emoji: '🧩' },
      { value: 'docs', name: 'docs: 📚 文档变更', emoji: '📚' },
      {
        value: 'style',
        name: 'style: 🎨 代码格式（不影响功能，例如空格、分号等格式修正）',
        emoji: '🎨'
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️ 代码重构（不包括 bug 修复、功能新增）',
        emoji: '♻️'
      },
      { value: 'perf', name: 'perf: ⚡️ 性能优化', emoji: '⚡️' },
      { value: 'test', name: 'test: ✅ 添加疏漏测试或已有测试改动', emoji: '✅' },
      {
        value: 'build',
        name: 'build: 📦️ 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
        emoji: '📦️'
      },
      { value: 'ci', name: 'ci: 🎡 修改 CI 配置、脚本', emoji: '🎡' },
      { value: 'chore', name: 'chore: ⏪️ 回滚 commit', emoji: '⏪️' },
      {
        value: 'revert',
        name: 'revert: 🔨 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
        emoji: '🔨'
      }
    ],
    useEmoji: true, // 定是否使用表情符号来表示提交消息的类型
    themeColorCode: '', // 主题颜色代码，通常用于自定义提交消息的显示样式
    scopes: [], // 允许自定义的提交消息范围
    allowCustomScopes: true, // 是否允许自定义范围
    allowEmptyScopes: true, // 是否允许空范围
    customScopesAlign: 'bottom', // 自定义范围的对齐方式
    customScopesAlias: 'custom', // 自定义范围的别名
    emptyScopesAlias: 'empty', // 自定义范围的别名
    upperCaseSubject: false, // 主题是否需要大写
    allowBreakingChanges: ['feat', 'fix'], // 允许定义哪些类型的提交消息可以包含破坏性更改
    breaklineNumber: 100, // 正文中每行的最大字符数
    breaklineChar: '|', // 正文中用于换行的字符
    skipQuestions: [], // 跳过哪些问题的配置
    issuePrefixs: [{ value: 'closed', name: 'closed: ISSUES has been processed' }], // 定义问题前缀，例如 "closed" 表示已处理的问题
    customIssuePrefixsAlign: 'top', // 自定义问题前缀的对齐方式
    emptyIssuePrefixsAlias: 'skip', // 空问题前缀的别名
    customIssuePrefixsAlias: 'custom', // 自定义问题前缀的别名
    allowCustomIssuePrefixs: true, // 是否允许自定义问题前缀
    allowEmptyIssuePrefixs: true, // 是否允许空问题前缀
    confirmColorize: true, // 确认提交时是否使用颜色
    maxHeaderLength: Infinity, // 提交消息标题的最大字符数
    maxSubjectLength: Infinity, // 主题的最大字符数
    minSubjectLength: 0, // 主题的最小字符数
    scopeOverrides: undefined, // 覆盖范围的配置
    defaultBody: '', // 默认正文内容
    defaultIssues: '', // 默认问题内容
    defaultScope: '', // 默认范围
    defaultSubject: '' // 默认主题内容
  }
};

# 实现文件结构规格

## 推荐 Skill 目录

```text
static-html-ui-guardrails/
├─ SKILL.md
├─ CHANGELOG.md
├─ scripts/
│  └─ check_html_visual.js
├─ examples/
│  ├─ source-sample.html
│  └─ guarded-sample.html
└─ references/
   ├─ visual-system.md
   ├─ component-system.md
   ├─ content-shape-adaptation.md
   ├─ quality-gates.md
   ├─ chrome-devtools-mcp-acceptance.md
   └─ release-governance.md
```

## 必须交付

- `SKILL.md`
- `CHANGELOG.md`
- `scripts/check_html_visual.js`
- 6 类内容形态适配参考
- 1 组源 HTML / UI 优化副本对照示例页
- UI 系统参考文档
- 组件系统参考文档
- 内容形态 UI 适配参考文档
- 质量门禁参考文档
- Chrome DevTools MCP 验收参考文档
- 发布治理参考文档

## 内容形态参考交付深度

首批 6 类内容形态都必须提供 UI 适配参考：

- 分析报告
- 数据仪表盘
- 知识长文
- 对比评估
- 项目交付说明
- 研究简报

必须提供一组源 HTML / UI 优化副本对照示例。

每类内容形态参考必须包含：

- 适用内容特征。
- 默认密度参考。
- 推荐 UI 适配。
- 禁止项。
- 浅/深色主题要求。
- 内容结构保持要求。

禁止提供可直接套用用户内容的页面骨架。

## SKILL.md 要求

必须包含：

- 触发场景。
- 唯一目标。
- 非范围。
- 固定执行流水线。
- 设计原则。
- 样式系统引用。
- 组件系统引用。
- 内容形态 UI 适配参考引用。
- 质量门禁引用。
- Chrome DevTools MCP 验收引用。
- 内容结构保持审计规则。
- 中文化输出规则。
- 使用后复盘规则。
- 禁止自动迭代规则。

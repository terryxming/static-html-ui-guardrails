# 执行规格索引

本目录存放正式 PRD 的执行细节。PRD 只负责说明目标、边界和验收方向；具体实现必须引用本目录文件。

`specs/` 是本交付包的唯一正式执行细节来源。不得删除、合并或跳过本目录。

## 文件清单

| 文件 | 内容 | 下游使用时机 |
|---|---|---|
| `01-scope-boundary.md` | Skill 唯一目标、职责边界、非范围 | 写 `SKILL.md` 总则前 |
| `02-design-principles.md` | 设计原则、Apple 风格转译、禁止营销化 | 定义UI 基调前 |
| `03-style-system-tokens.md` | 12 模块样式系统、token、字体、字号、色板、间距、表格 | 写 CSS 规范和检查脚本前 |
| `04-dark-mode.md` | 深色模式 token、一键切换、验收要求 | 写主题系统前 |
| `05-components.md` | 组件分类、固定 HTML 结构、禁用项、验收标准 | 写组件库和模板前 |
| `06-template-selector.md` | 内容形态识别、6 类内容形态参考、UI 适配边界 | 写 UI 适配流程前 |
| `07-check-script.md` | `scripts/check_html_visual.js` 输入输出、规则编号、门禁分级 | 实现检查脚本前 |
| `08-chrome-devtools-mcp.md` | Chrome DevTools MCP 浏览器验收流程 | 写验收流程前 |
| `09-release-governance.md` | 外部发布、CHANGELOG、使用后复盘、禁止自动迭代 | 发布前 |
| `10-implementation-file-structure.md` | 推荐 Skill 文件结构和交付深度 | 搭建 Skill 目录前 |
| `11-omission-audit.md` | 当前遗漏审计、开放项、风险处理 | 正式实现前复核 |
| `12-retention-rules.md` | `specs/` 正式执行细节的保留规则、替代禁令和下游迁移要求 | 交付包维护和下游实现前 |

## 引用规则

- 正式 PRD 只引用本目录，不重复粘贴所有执行细节。
- 下游 AI 执行时必须读取本目录全部文件。
- 如果 PRD 与本目录冲突，以用户最新确认和本目录更细粒度规则为准。
- 修改任一规格文件时，正式 Skill 的 `CHANGELOG.md` 必须记录变更。
- `static-html-ui-guardrails` 的输入端是用户已经产生的本地单 HTML 文件，不存在旧式模板套用执行环节。
- 内容形态参考只用于辅助判断 UI 密度、组件呈现和交互适配，不得把用户内容套进模板。
- 交付包根目录中的 3 个汇总规格文件只作为辅助阅读，不替代本目录。

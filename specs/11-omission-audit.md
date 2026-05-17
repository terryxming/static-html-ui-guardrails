# 遗漏审计

本文件记录对交付包的反向审计结果：哪些已经补齐，哪些仍是开放项，哪些会影响下游实现。

## 已补齐

| 项目 | 状态 | 对应文件 |
|---|---|---|
| 唯一目标和非范围 | 已补齐 | `01-scope-boundary.md` |
| 设计原则和禁止营销化 | 已补齐 | `02-design-principles.md` |
| 样式系统 12 模块 | 已补齐 | `03-style-system-tokens.md` |
| 字体、字号、行高、字重 | 已补齐 | `03-style-system-tokens.md` |
| Apple 参考色板与语义色 | 已补齐 | `03-style-system-tokens.md` |
| 深色模式与一键切换 | 已补齐 | `04-dark-mode.md` |
| 组件结构、禁用项、验收标准 | 已补齐 | `05-components.md` |
| 内容形态识别五维流程 | 已补齐 | `06-template-selector.md` |
| 6 类内容形态参考 | 已补齐 | `06-template-selector.md` |
| 输入为用户已有 HTML | 已补齐 | `01-scope-boundary.md`、`06-template-selector.md` |
| 内容结构保持 | 已补齐 | `01-scope-boundary.md`、`07-check-script.md`、`08-chrome-devtools-mcp.md` |
| 检查脚本规格 | 已补齐 | `07-check-script.md` |
| Chrome DevTools MCP 验收 | 已补齐 | `08-chrome-devtools-mcp.md` |
| 使用后复盘 | 已补齐 | `09-release-governance.md` |
| `CHANGELOG.md` | 已补齐 | `09-release-governance.md`、`10-implementation-file-structure.md` |
| 外部发布要求 | 已补齐 | `09-release-governance.md` |
| Skill 文件结构 | 已补齐 | `10-implementation-file-structure.md` |

## 逐项覆盖矩阵

| 已确认事项 | 是否覆盖 | 位置 |
|---|---|---|
| 只做已有本地单 HTML 的 UI 优化约束 | 是 | `01-scope-boundary.md` |
| 不做内容真实性检查 | 是 | `01-scope-boundary.md` |
| 信息可信度 > 阅读效率 > UI 精致度 | 是 | `02-design-principles.md` |
| Apple 风格转译，不做营销页 | 是 | `02-design-principles.md` |
| 禁止 hero 化、卖点卡片、装饰性渐变 | 是 | `02-design-principles.md`、`07-check-script.md` |
| 样式系统 12 模块 | 是 | `03-style-system-tokens.md` |
| primitive / semantic / component token 三层 | 是 | `03-style-system-tokens.md` |
| 中文为主的 Windows 字体栈 | 是 | `03-style-system-tokens.md` |
| 字号、行高、字重 | 是 | `03-style-system-tokens.md` |
| Apple 参考色板和语义色 | 是 | `03-style-system-tokens.md` |
| 间距、布局容器、圆角、边框、阴影 | 是 | `03-style-system-tokens.md` |
| 图表色板 | 是 | `03-style-system-tokens.md` |
| comfortable / compact / dense 密度规则 | 是 | `03-style-system-tokens.md` |
| 表格换行、溢出、数字右对齐 | 是 | `03-style-system-tokens.md`、`07-check-script.md` |
| 深色模式必选 | 是 | `04-dark-mode.md` |
| 默认跟随系统 + 一键切换 | 是 | `04-dark-mode.md` |
| 组件六类 | 是 | `05-components.md` |
| Page Shell / Header / Section / TOC | 是 | `05-components.md` |
| 摘要卡、结论块、引用块、风险提示 | 是 | `05-components.md` |
| KPI、数据表、图表容器、对比矩阵 | 是 | `05-components.md` |
| 筛选栏、Tabs、折叠面板 | 是 | `05-components.md` |
| 状态徽标、反馈提示 | 是 | `05-components.md` |
| 关键结论绑定证据结构 | 是 | `05-components.md` |
| 内容形态识别五维流程 | 是 | `06-template-selector.md` |
| 6 类内容形态参考 | 是 | `06-template-selector.md` |
| 输入端是用户已有 HTML 文件 | 是 | `01-scope-boundary.md`、`06-template-selector.md` |
| 不存在旧式模板套用执行环节 | 是 | `01-scope-boundary.md`、`06-template-selector.md` |
| UI 表现适应内容，不让内容套用视觉模板 | 是 | `01-scope-boundary.md`、`06-template-selector.md` |
| 默认输出优化副本，不覆盖源文件 | 是 | `01-scope-boundary.md`、`07-check-script.md` |
| 固定优化流水线 | 是 | `08-chrome-devtools-mcp.md`、`07-check-script.md`、`10-implementation-file-structure.md` |
| `scripts/check_html_visual.js` | 是 | `07-check-script.md` |
| JSON + Markdown 报告 | 是 | `07-check-script.md` |
| blocker / warning / manual | 是 | `07-check-script.md` |
| token 受控例外 | 是 | `07-check-script.md` |
| Chrome DevTools MCP 为首选 | 是 | `08-chrome-devtools-mcp.md` |
| Playwright 仅为 CI/批量截图备选 | 是 | `08-chrome-devtools-mcp.md` |
| 桌面宽度 1280/1366/1440/1536/1920 | 是 | `08-chrome-devtools-mcp.md` |
| 完整使用后强制询问是否复盘 | 是 | `09-release-governance.md` |
| 未经同意禁止自动迭代 Skill | 是 | `09-release-governance.md` |
| `CHANGELOG.md` | 是 | `09-release-governance.md`、`10-implementation-file-structure.md` |
| 外部发布给大量用户 | 是 | `09-release-governance.md` |
| 安装、快速开始、示例、兼容性、升级、故障排查 | 是 | `09-release-governance.md`、`10-implementation-file-structure.md` |
| 6 类内容形态参考 + 源/优化副本对照示例 | 是 | `10-implementation-file-structure.md` |
| 用户可见输出中文化 | 是 | `07-check-script.md`、`09-release-governance.md`、`10-implementation-file-structure.md` |
| UI 锚点 HTML | 是 | `component-preview-static-html-ui-guardrails-skill.html` |

## 仍需下游实现阶段确认

| 项目 | 为什么未在 PRD 阶段完全闭环 | 是否阻塞实现 | 处理方式 |
|---|---|---|---|
| Chrome DevTools MCP 具体命令 | 需要目标环境实际工具配置 | 否 | 在实现阶段用真实工具验证 |
| 检查脚本 AST/解析库选择 | 需要实现者根据 Node 环境选择 | 否 | 建议优先使用原生解析 + 必要轻依赖，避免联网依赖 |
| 复盘报告是否程序化渲染 | 用户只确认复盘机制，未要求固定脚本 | 否 | 先用 Markdown 模板，后续可加 JSON 渲染 |
| macOS/Linux 支持等级 | 当前核心场景是 Windows + Chrome | 否 | 发布文档标记为兼容或未验证 |
| 结构保持审计是否程序化渲染 | 当前先要求 Markdown/完成声明记录 | 否 | 后续版本可扩展 JSON 渲染 |

## 潜在风险

| 风险 | 影响 | 防范 |
|---|---|---|
| 规格文件变多，下游漏读 | 实现不完整 | `00-spec-index.md` 和 `artifact-index` 明确必须读取全部规格 |
| 检查脚本过严误杀布局计算值 | 实现返工 | `07-check-script.md` 定义受控例外 |
| 深色模式只在示例页可用 | 内容形态适配不一致 | `04-dark-mode.md` 要求所有 UI 适配支持 |
| UI 优化同化源内容结构 | 信息被破坏 | `01`、`06`、`07`、`08` 明确内容结构保持和审计 |
| 外部用户环境差异 | 安装和验收失败 | `09-release-governance.md` 要求兼容性说明 |
| 复盘后越权修改 Skill | 版本不可控 | `09-release-governance.md` 禁止自动迭代 |

## 当前审计结论

交付包现在包含：

- PRD 总控文件。
- 模块化执行规格。
- 可打开UI 锚点。
- 阶段性 Brief。
- 结构化 PRD 数据。
- 交付包说明。

剩余未闭环项均为实现阶段配置或扩展项，不阻塞下游基于本 PRD 开始实现。

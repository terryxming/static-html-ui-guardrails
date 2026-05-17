---
name: static-html-ui-guardrails
description: "本地静态 HTML UI 优化约束。Use when Codex needs to optimize, polish, repair, or validate an existing local single-file HTML deliverable without changing its content structure. Triggers include: 用户提供已有 HTML 文件要求美化、优化 UI、修复表格溢出、补齐浅色/深色模式、统一样式 token、检查离线单 HTML、执行 Chrome 验收、生成优化副本；必须保护标题顺序、正文文本、表格数据和章节层级，只在样式层、组件层、交互层做优化。"
---

# 本地静态 HTML UI 优化约束

`static-html-ui-guardrails` 只处理用户已经产生的本地单 HTML 文件。目标是在不破坏源文件内容结构的前提下，对 UI 表现、组件呈现、交互状态、浅/深色模式和验收约束进行优化。

## 不可变边界

- 输入端必须是用户已有 HTML；不要从零生成内容型页面，除非用户另行明确要求。
- 默认输出优化副本，例如 `<原文件名>.guarded.html`；除非用户明确要求覆盖，否则不得覆盖源文件。
- 只在样式层、组件层、交互层做 UI 优化。
- 不改写、不重排、不删减、不合并用户原始内容。
- 不改变标题顺序、正文文本、表格数据、章节层级、引用内容、锚点 ID 和用户原始字段。
- 不存在旧式模板套用执行环节；UI 表现必须适应内容，不得让内容套用视觉模板。
- 所有用户可见文档、报告、错误信息、验收说明和完成声明必须使用中文。
- 不验证数据真实性，不判断业务结论，不补充缺失事实，不负责报告内容质量。

## 必须执行的流程

1. 读取源 HTML，记录源文件路径。
2. 建立内容结构清单：标题层级、章节顺序、正文关键文本、表格、列表、引用、代码块、锚点 ID、交互控件。
3. 标记不可破坏边界；如边界不清楚，先用中文说明假设。
4. 读取 `specs/00-spec-index.md`，并按索引读取 `specs/01` 到 `specs/12`。`specs/` 是正式执行细节来源。
5. 读取需要的参考文件：
   - UI token/密度/表格/深色模式：`references/visual-system.md`
   - 组件适配：`references/component-system.md`
   - 内容形态参考：`references/content-shape-adaptation.md`
   - 内容形态版面策略：`references/layout-strategy-by-content-shape.md`
   - 质量门禁：`references/quality-gates.md`
   - 视觉质量门禁：`references/visual-quality-gate.md`
   - Chrome 验收：`references/chrome-devtools-mcp-acceptance.md`
   - 发布治理/完成声明/复盘：`references/release-governance.md`
6. 判断内容形态并选择版面策略；版面策略只决定 UI 表现方式，不是套模板流程，不得改变信息结构。
7. 在保留内容结构的前提下，原位注入或整理 token 化 CSS、浅/深色 token、一键主题切换、本地交互和组件样式。
8. 输出单 HTML 优化副本；禁止 CDN、外部字体、外部图片、外部 CSS/JS、统计脚本和任何联网依赖。
9. 运行静态检查：

```bash
node scripts/check_html_visual.js <target.html> --source <source.html>
```

如果没有源文件，仅可作为人工复核场景运行：

```bash
node scripts/check_html_visual.js <target.html>
```

10. 按 `references/chrome-devtools-mcp-acceptance.md` 使用 Chrome DevTools MCP 验收：网络请求、控制台、横向溢出、浅/深色截图、主题切换、关键交互、表格可读性和桌面宽度。
11. 按 `references/visual-quality-gate.md` 基于截图做视觉质量评分；总分低于 85 或任一关键单项低于 70 必须二次优化。
12. 出现任何 `blocker` 必须修复并重跑检查，不得交付。
13. 完成声明必须使用中文，并包含源文件路径、输出文件路径、是否覆盖源文件、内容结构保持结论、脚本检查结果、Chrome 验收结果、视觉质量评分、截图证据、是否发生二次优化、未修复 warning/manual 项。
14. 完整使用一次 Skill 后，必须逐字询问：`是否复盘本次 Skill 使用质量？请回复“是”或“否”。`

## UI 优化规则

- 使用固定 token；禁止随机色、随机字号、随机间距、随机圆角、随机阴影。
- 支持浅色/深色模式，默认跟随系统，提供一键切换，并持久化用户选择。
- 表格必须有横向滚动容器，长文本默认换行，数字列右对齐并使用等宽数字。
- 允许增强目录、Tabs、筛选、折叠、状态徽标、风险提示，但不得隐藏关键结论、关键风险或核心数据。
- 内容形态参考只用于判断密度和组件适配：分析报告、数据仪表盘、知识长文、对比评估、项目交付说明、研究简报。
- 禁止营销 hero、产品卖点页、装饰性渐变主导页面、卡片堆叠页。
- 禁止只用灰背景、白卡片、蓝链接和表格边框就声明视觉优化完成。
- 禁止所有 section 使用同一种卡片样式；必须让目录、正文、表格、代码、提示、元信息等组件有可辨识差异。

## 硬性停止条件

出现以下任一情况，必须先修复再交付：

- 源内容被改写、重排、删减、合并。
- 标题层级、章节顺序、表格数据、列表、代码块、锚点 ID 丢失或变化。
- 把用户内容套入固定模板或固定页面骨架。
- 存在外部网络请求。
- 缺少深色模式或主题按钮无效。
- 控制台错误、整页横向溢出、表格正文全局 `nowrap`。
- 深色模式不可读。
- 未运行静态检查或 Chrome DevTools MCP 验收。
- 静态检查仍有 `blocker`。
- 未进行截图视觉复审和视觉质量评分。
- 视觉质量总分低于 85，或任一关键单项低于 70。

## 资源说明

- `scripts/check_html_visual.js`：本地静态 HTML UI 优化约束检查脚本，输出 JSON 和 Markdown，用户可读内容为中文。
- `specs/`：正式执行细节，必须按 `specs/00-spec-index.md` 全量读取。
- `references/`：按任务需要加载的精简参考。
- `references/visual-quality-gate.md`：截图视觉复审、评分表、负面清单和二次优化协议。
- `references/layout-strategy-by-content-shape.md`：内容形态到版面策略的映射，只用于 UI 适配，不用于套模板。
- `assets/source-sample.html` 与 `assets/guarded-sample.html`：源文件/优化副本对照样例，只能参考 UI 写法，不得套用内容结构。

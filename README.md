# static-html-ui-guardrails

中文名称：本地静态 HTML UI 优化约束

`static-html-ui-guardrails` 是一个 Codex Skill，用于优化用户已经生成的本地静态 HTML 文件。它的目标不是重写内容，而是在不破坏内容结构的前提下，提升 UI 表现、组件呈现、交互状态、深浅色主题和验收质量。

## 适用场景

- 已有一个本地单文件 HTML，希望优化视觉表现。
- HTML 报告、PRD、规格文档、数据表、知识长文或项目交付页看起来粗糙。
- 表格溢出、长文本难读、深色模式缺失、样式 token 不统一。
- 需要生成一个可离线打开的优化副本，并保留源文件。
- 需要静态脚本检查、Chrome DevTools MCP 验收和截图视觉评分。

## 不做什么

- 不验证数据真实性。
- 不判断业务结论是否正确。
- 不补充事实，不替用户生成新业务内容。
- 不改写、不重排、不删减、不合并用户原始内容。
- 不改变标题顺序、正文文本、表格数据、章节层级、锚点 ID。
- 不把内容套进固定模板。
- 不引入 CDN、外部字体、外部图片、外部 CSS/JS 或统计脚本。

## 安装

把本仓库放入 Codex Skills 目录：

```powershell
cd C:\Users\<你的用户名>\.codex\skills
git clone https://github.com/terryxming/static-html-ui-guardrails.git
```

如果已经安装过：

```powershell
cd C:\Users\<你的用户名>\.codex\skills\static-html-ui-guardrails
git pull
```

## 快速开始

向 Codex 提供一个已有 HTML 文件，并要求使用本 Skill：

```text
使用 static-html-ui-guardrails 优化这个本地 HTML：
C:\path\to\report.html
```

默认行为：

- 不覆盖源文件。
- 输出优化副本，例如 `report.guarded.html`。
- 保留内容结构。
- 注入或整理 token 化 CSS。
- 补充深浅色主题和本地交互。
- 运行检查脚本。
- 使用 Chrome DevTools MCP 做浏览器验收。
- 基于截图进行视觉质量评分。

## 检查脚本

```powershell
node scripts/check_html_visual.js <target.html> --source <source.html>
```

示例：

```powershell
node scripts/check_html_visual.js assets\guarded-sample.html --source assets\source-sample.html
```

结果分级：

- `blocker`：必须修复，否则不得交付。
- `warning`：建议修复；不修复必须说明原因。
- `manual`：需要人工、截图或 Chrome 验收确认。

## 视觉质量门禁

v0.2 起，脚本通过不等于完成。交付前必须基于截图做视觉质量评分：

- 总分低于 85 不得交付。
- 任一关键单项低于 70 必须二次优化。
- 禁止只用灰背景、白卡片、蓝链接和表格边框声明完成。

评分维度：

- 内容身份清晰度。
- 层级舒适度。
- 信息密度。
- 组件辨识度。
- 克制与一致性。
- 截图观感。

详见：

- `references/visual-quality-gate.md`
- `references/layout-strategy-by-content-shape.md`

## 发布包结构

```text
static-html-ui-guardrails/
├─ SKILL.md
├─ README.md
├─ CHANGELOG.md
├─ agents/
│  └─ openai.yaml
├─ scripts/
│  └─ check_html_visual.js
├─ references/
│  ├─ visual-system.md
│  ├─ component-system.md
│  ├─ content-shape-adaptation.md
│  ├─ layout-strategy-by-content-shape.md
│  ├─ quality-gates.md
│  ├─ visual-quality-gate.md
│  ├─ chrome-devtools-mcp-acceptance.md
│  └─ release-governance.md
├─ specs/
└─ assets/
   ├─ source-sample.html
   └─ guarded-sample.html
```

## 兼容性

核心验证环境：

- Windows
- Chrome
- 本地单文件 HTML
- Node.js，用于运行 `scripts/check_html_visual.js`

macOS 和 Linux 可作为兼容环境使用，但发布验收以 Windows + Chrome 为主。

## 故障排查

### 检查脚本提示缺少 token

目标 HTML 没有注入完整 UI token。按 `references/visual-system.md` 恢复 token。

### 检查脚本提示结构变化

目标 HTML 的标题、表格、列表、代码块或锚点 ID 与源文件不一致。必须恢复源内容结构。

### 页面看起来仍然粗糙

不要只看静态脚本。按 `references/visual-quality-gate.md` 截图评分，并根据低分项二次优化。

### Chrome 验收无法完成

先确认 Chrome DevTools MCP 是否可用。若不可用，需要明确说明未完成浏览器验收，不得假装已完成。

## 版本

- `v0.1.0`：建立结构保护、离线单 HTML、深浅色、检查脚本和 Chrome 验收。
- `v0.2.0`：新增视觉质量门禁、截图评分和内容形态版面策略。
- `v0.2.1`：补充 GitHub 发布 README。

详细变更见 `CHANGELOG.md`。

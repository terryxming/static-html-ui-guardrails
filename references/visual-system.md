# UI 系统规格：本地静态 HTML UI 优化约束

本文件补充正式 PRD 中未展开的UI 系统细则。它是下游实现 `SKILL.md`、内容形态参考、源文件/优化副本示例页和检查脚本时必须遵守的辅助规格。

## 1. 设计原则层

优先级固定为：

1. 信息可信度
2. 阅读效率
3. UI 精致度

Apple 风格只作为气质参考，必须转译为：

- 克制配色
- 精确排版
- 清晰层级
- 充足但不过度的留白
- 少装饰
- 强内容聚焦

硬性禁止：

- 禁止默认 hero 化。
- 禁止产品卖点式布局。
- 禁止无意义大图。
- 禁止装饰性渐变主导页面。
- 禁止把严肃交付物做成营销页。

默认服务对象：

- 分析报告
- 数据仪表盘
- 知识长文
- 对比评估
- 项目交付说明
- 研究简报

创意页、品牌页、作品集属于非默认例外，不能影响默认系统。

这些对象只作为内容形态参考。UI 表现必须适应用户已有 HTML，不得把用户内容套入固定模板或固定页面骨架。

## 2. 样式系统 12 模块

样式系统必须按以下 12 个模块实现，不允许只定义零散 CSS。

1. token 三层结构
2. 字体栈
3. 字号 / 行高 / 字重
4. 色板
5. 间距
6. 布局容器
7. 圆角 / 边框 / 阴影
8. 图表色板
9. 密度规则
10. 表格规则
11. focus / hover / active 状态
12. 禁止项

## 3. Token 三层结构

必须采用：

- primitive token：原始值，例如 `--gray-100`、`--space-6`
- semantic token：语义用途，例如 `--color-bg-page`、`--color-text-primary`
- component token：组件专用，例如 `--table-cell-px`、`--card-radius`

示例：

```css
:root {
  --gray-100: #f5f5f7;
  --space-6: 16px;

  --color-bg-page: var(--gray-100);
  --color-text-primary: #1d1d1f;

  --table-cell-px: 12px;
  --card-radius: 8px;
}
```

## 4. 字体栈

页面中文为主，兼容英文、数字、符号。默认字体栈：

```css
--font-sans:
  "Segoe UI",
  "Microsoft YaHei UI",
  "Microsoft YaHei",
  "PingFang SC",
  "Hiragino Sans GB",
  "Noto Sans CJK SC",
  "Source Han Sans SC",
  "Helvetica Neue",
  Arial,
  sans-serif;

--font-mono:
  ui-monospace,
  "Cascadia Mono",
  Consolas,
  "Liberation Mono",
  Menlo,
  monospace;
```

数字、表格、KPI 必须启用：

```css
font-variant-numeric: tabular-nums;
```

## 5. 字号、行高、字重

默认字号体系：

```css
--text-11: 11px;
--text-12: 12px;
--text-13: 13px;
--text-14: 14px;
--text-15: 15px;
--text-16: 16px;
--text-18: 18px;
--text-20: 20px;
--text-24: 24px;
--text-28: 28px;
--text-32: 32px;
--text-40: 40px;
```

语义排版：

| Token | 用途 | 值 |
|---|---|---|
| `--type-title-xl` | 页面标题，严禁 hero 化 | `32px / 42px` |
| `--type-title-lg` | 大标题 | `28px / 38px` |
| `--type-title-md` | 中标题 | `24px / 34px` |
| `--type-section` | 章节标题 | `20px / 30px` |
| `--type-subsection` | 子章节标题 | `18px / 28px` |
| `--type-body-lg` | 导语 / 大正文 | `16px / 26px` |
| `--type-body` | 默认正文 | `14px / 22px` |
| `--type-caption` | 注释 / 标签 | `12px / 18px` |
| `--type-table` | 表格 | `13px / 20px` |
| `--type-kpi` | KPI 数字 | `28px / 36px` |

字重：

```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

规则：

- 正文默认 `400`。
- 标签、按钮默认 `500`。
- 表头、小标题默认 `600`。
- 页面标题最多 `700`。
- 中文页面默认 `letter-spacing: 0`。

## 6. 色板

浅色核心色板：

```css
--gray-0: #ffffff;
--gray-50: #fbfbfd;
--gray-100: #f5f5f7;
--gray-200: #e8e8ed;
--gray-300: #d2d2d7;
--gray-500: #86868b;
--gray-600: #6e6e73;
--gray-800: #333336;
--gray-900: #1d1d1f;
--blue-600: #0071e3;
--blue-700: #0066cc;
```

语义色：

```css
--color-bg-page: #f5f5f7;
--color-bg-surface: #ffffff;
--color-bg-subtle: #fbfbfd;
--color-text-primary: #1d1d1f;
--color-text-secondary: #6e6e73;
--color-text-tertiary: #86868b;
--color-border: #d2d2d7;
--color-border-subtle: #e8e8ed;
--color-accent: #0071e3;
--color-link: #0066cc;
```

状态色：

```css
--color-success: #1d7f46;
--color-warning: #b86e00;
--color-danger: #d92d20;
--color-info: #0071e3;
--color-success-bg: #effaf3;
--color-warning-bg: #fff7e6;
--color-danger-bg: #fff1f0;
--color-info-bg: #f0f7ff;
```

## 7. 深色模式

深色模式是必选能力。

要求：

- 必须使用 `data-theme` 或等价机制。
- 默认跟随系统主题。
- 必须提供一键浅/深色切换。
- 主题切换必须只切 token，不为组件临时写黑色版本。
- 必须持久化用户手动选择，建议使用 `localStorage`。

深色 token 示例：

```css
:root[data-theme="dark"] {
  --color-bg-page: #101012;
  --color-bg-surface: #1c1c1e;
  --color-bg-subtle: #161618;
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #c7c7cc;
  --color-text-tertiary: #8e8e93;
  --color-border: #3a3a3c;
  --color-border-subtle: #2c2c2e;
  --color-accent: #2997ff;
  --color-link: #66b1ff;
}
```

验收：

- 浅色和深色都必须截图。
- 深色下侧栏、工具栏、表格、徽标、图表、alert 都必须可读。
- 不允许只做整体反色。

## 8. 间距

采用 2/4/8 倍数体系：

```css
--space-0: 0;
--space-1: 2px;
--space-2: 4px;
--space-3: 6px;
--space-4: 8px;
--space-5: 12px;
--space-6: 16px;
--space-7: 20px;
--space-8: 24px;
--space-9: 32px;
--space-10: 40px;
--space-11: 48px;
--space-12: 64px;
--space-13: 80px;
--space-14: 96px;
```

## 9. 布局容器

桌面端覆盖目标：

- `1280px`
- `1366px`
- `1440px`
- `1536px`
- `1920px`

容器 token：

```css
--page-max-readable: 960px;
--page-max-report: 1200px;
--page-max-wide: 1440px;
--page-max-dashboard: 1600px;
--page-padding-x: 40px;
--page-padding-y: 32px;
--section-gap: 32px;
--block-gap: 20px;
--inline-gap: 12px;
```

## 10. 圆角、边框、阴影

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;

--border-subtle: #e8e8ed;
--border-default: #d2d2d7;

--shadow-sm: 0 1px 2px rgba(0, 0, 0, .04);
--shadow-md: 0 8px 24px rgba(0, 0, 0, .08);
```

规则：

- 默认组件使用 `6px / 8px` 圆角。
- `12px` 只用于大容器或特殊强调。
- 少用阴影，优先用边框和背景分层。
- 禁止大面积浮动卡片堆叠。

## 11. 图表色板

图表色板独立于页面主色，最多 8 色：

```css
--chart-blue: #0071e3;
--chart-teal: #00a6a6;
--chart-green: #34c759;
--chart-yellow: #ffcc00;
--chart-orange: #ff9f0a;
--chart-red: #ff3b30;
--chart-purple: #af52de;
--chart-gray: #8e8e93;
```

图表必须在浅色和深色模式下可辨认。

## 12. 密度规则

密度分三档：

| 密度 | 场景 | 默认效果 |
|---|---|---|
| `comfortable` | 长文、知识沉淀、教程、连续阅读 | 正文 16px，section gap 40px，表格 14px |
| `compact` | 分析报告、研究简报、对比评估、交付说明 | 正文 14px，section gap 32px，表格 13px |
| `dense` | 仪表盘、多 KPI、多图表、大表格 | 正文 13/14px，section gap 24px，表格 12/13px |

自动判断：

- 包含 3 个以上图表、6 个以上 KPI、主表超过 8 列、有筛选控件：`dense`
- 报告、评估、分析、交付说明或图文表混合：`compact`
- 长文、知识沉淀、教程、说明文档：`comfortable`
- 冲突时选择更高密度，但不得牺牲可读性。

## 13. 表格规则

表格是高密度页面核心证据组件。

```css
.table-wrap {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  overflow-wrap: anywhere;
  word-break: break-word;
  vertical-align: top;
}

td.number,
th.number {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
```

规则：

- 禁止默认给表格正文 `white-space: nowrap`。
- 数字、日期、短状态、ID 可以局部不换行。
- URL、评论、标题、备注、长字段必须允许换行。
- 大表必须有横向滚动容器。
- 禁止内容被无提示裁掉。

## 14. UI 禁止项

- 禁止随机色值。
- 禁止随机字号。
- 禁止随机间距。
- 禁止脱离 token 的阴影、圆角、边框。
- 禁止营销 hero。
- 禁止装饰性渐变主导页面。
- 禁止用大图替代信息结构。
- 禁止表格正文全不换行。
- 禁止深色模式只做整体反色。
- 禁止改写、重排、删减、合并用户原始内容。
- 禁止为了统一 UI 而破坏源文件内容结构。

# 样式系统与 Token

## 12 模块

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

## Token 三层结构

- primitive token：原始值，例如 `--gray-100`、`--space-6`
- semantic token：语义用途，例如 `--color-bg-page`、`--color-text-primary`
- component token：组件专用，例如 `--table-cell-px`、`--card-radius`

## 字体栈

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

## 字号、行高、字重

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

## 浅色核心色板

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

## 语义色

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

## 状态色

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

## 间距

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

## 布局容器

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

## 圆角、边框、阴影

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--shadow-sm: 0 1px 2px rgba(0, 0, 0, .04);
--shadow-md: 0 8px 24px rgba(0, 0, 0, .08);
```

规则：

- 默认组件使用 `6px / 8px` 圆角。
- `12px` 只用于大容器或特殊强调。
- 少用阴影，优先用边框和背景分层。

## 图表色板

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

## 密度规则

| 密度 | 场景 | 默认效果 |
|---|---|---|
| `comfortable` | 长文、知识沉淀、教程、连续阅读 | 正文 16px，section gap 40px，表格 14px |
| `compact` | 分析报告、研究简报、对比评估、交付说明 | 正文 14px，section gap 32px，表格 13px |
| `dense` | 仪表盘、多 KPI、多图表、大表格 | 正文 13/14px，section gap 24px，表格 12/13px |

## 表格规则

- 大表必须有 `.table-wrap { overflow-x: auto; }`。
- 表格正文默认允许换行。
- 禁止正文全部 `white-space: nowrap`。
- 数字、日期、短状态、ID 可局部不换行。
- URL、评论、标题、备注、长字段必须允许换行。
- 数字列右对齐并启用 `tabular-nums`。

# 组件系统规格

## 总规则

组件分为六类：

1. 布局组件
2. 阅读组件
3. 数据组件
4. 分析组件
5. 交互组件
6. 反馈组件

每个组件必须定义：

- 固定 HTML 结构
- 适用场景
- 禁止用法
- 验收标准

## 布局组件

### Page Shell

```html
<div class="app-shell">
  <aside class="sidebar">
    <nav class="toc"></nav>
  </aside>
  <main class="content">
    <div class="page"></div>
  </main>
</div>
```

默认用于分析报告、知识长文、研究简报、项目交付说明。

例外：

- 仪表盘可使用顶部工具栏 + 宽内容区。
- 短页可隐藏目录。

禁止：

- 全屏 hero。
- 营销首页结构。
- 超长页面无导航。

### Report Header

```html
<header class="report-header">
  <p class="eyebrow"></p>
  <h1></h1>
  <p class="lead"></p>
  <dl class="meta-list"></dl>
</header>
```

禁止：

- 大背景图。
- 渐变主 UI。
- 产品卖点区。
- 夸张大标题。
- 首屏占满。

### Section

```html
<section class="section" id="">
  <div class="section-head">
    <h2></h2>
    <p class="section-note"></p>
  </div>
  <div class="section-body"></div>
</section>
```

Section 是页面结构，不是 Card。

### TOC

触发条件：

- 超过 4 个一级章节。
- 或页面预期滚动超过 2 屏。

规则：

- 默认左侧粘性目录。
- 最多两级。
- 只放短标题。
- 不放解释性长文本。

## 阅读组件

### Summary Card

用途：承载 1 个要点或 1 组短事实。

禁止：长段落、装饰插图、过大字号。

### Insight Block

```html
<article class="insight">
  <strong></strong>
  <p></p>
</article>
```

用途：承载判断和建议动作。

禁止：空泛口号、营销卖点、无证据的断言。

### Quote

用途：证据、用户原话、来源片段。

禁止：装饰性金句、与结论无关的引用。

### Risk Notice

用途：风险、限制、注意事项、缺失信息。

禁止：替代普通段落、替代主结论、高饱和恐吓式颜色。

## 数据组件

### KPI Card

必须包含：

- 指标名
- 数值
- 单位或变化
- 口径说明

```html
<article class="card kpi">
  <span class="label"></span>
  <div class="value"></div>
  <p class="desc"></p>
</article>
```

验收：

- 数字等宽。
- 单位清晰。
- 无口径时标记“口径未提供”。

### Data Table

必须支持：

- 横向滚动。
- 长文本换行。
- 数字右对齐。
- 单位明确。
- 列宽受控。

禁止：

- 正文全部 `nowrap`。
- 长文本无提示截断。
- 无表头。
- 无单位。
- 列宽随机。

### Chart Container

默认实现：

- CSS 图表。
- SVG 图表。
- 原生 Canvas。

首批支持：

- 柱状图。
- 条形图。
- 折线图。
- 环形图。
- 热力摘要。

复杂图表：

- 降级为表格 + 简化图。
- 或本地内联实现。

## 分析组件

### Insight + Evidence

关键结论必须绑定证据结构：

- 表格。
- 图表。
- 引用。
- 来源说明。
- 明确用户输入。

注意：本 Skill 不验证事实真假，但必须让UI 结构支持“结论与证据”之间的关系。

## 交互组件

### Filter Bar

允许：

- 本地搜索。
- 轻量筛选。
- 分组选项。

禁止：

- 复杂查询构建器。
- 需要后端的筛选逻辑。
- 页面刷新依赖。

### Tabs

用途：同层级内容切换。

禁止：

- 隐藏关键结论。
- 隐藏关键风险。
- 隐藏核心数据。
- 把不同任务混在同一组 tabs。

### Disclosure / Accordion

用途：补充信息、方法说明、明细解释。

禁止：

- 默认折叠关键结论。
- 默认折叠关键风险。
- 默认折叠关键数据。

## 反馈组件

### Badge / Status

用途：

- P0 / P1
- 上升 / 下降
- 已确认 / 待确认
- 事实 / 推测 / 示例

规则：

- 文本必须短。
- 语义固定。
- 颜色映射固定。

### Alert / Notice

用途：

- 风险。
- 限制。
- 缺失信息。
- 假设。
- 错误状态。

禁止：

- 普通强调都做成 alert。
- 到处堆提示框。

# 深色模式规格

## 地位

深色模式是必选能力，不是增强项。

## 实现要求

- 必须使用 `data-theme` 或等价机制。
- 默认跟随系统主题。
- 必须提供一键浅/深色切换。
- 必须持久化用户手动选择，建议使用 `localStorage`。
- 主题切换必须只切 token，不为组件临时写黑色版本。

## 深色 token 示例

```css
:root[data-theme="dark"] {
  --color-bg-page: #101012;
  --color-bg-surface: #1c1c1e;
  --color-bg-subtle: #161618;
  --color-bg-sidebar: rgba(28, 28, 30, .82);
  --color-bg-toolbar: rgba(16, 16, 18, .9);
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #c7c7cc;
  --color-text-tertiary: #8e8e93;
  --color-border: #3a3a3c;
  --color-border-subtle: #2c2c2e;
  --color-accent: #2997ff;
  --color-link: #66b1ff;
}
```

## 一键切换组件

要求：

- 必须是标准组件。
- 必须有可访问名称，例如 `aria-label="切换深色模式"`。
- 切换后应更新按钮状态或标题。
- 不允许只靠图标表达状态。

## 验收要求

- 浅色和深色都必须截图。
- 深色下侧栏、工具栏、表格、徽标、风险提示、图表都必须可读。
- 深色下 focus ring 必须可见。
- 图表色不能在深色背景下糊成一片。
- 禁止整体反色。

## Chrome DevTools MCP 检查点

- 打开页面后读取当前主题。
- 点击主题切换按钮。
- 验证 `data-theme` 或等价状态变化。
- 截取浅色截图。
- 截取深色截图。
- 检查整页无横向溢出。

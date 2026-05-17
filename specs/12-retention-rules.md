# specs/ 保留规则

## 规则定位

`specs/` 是本交付包的唯一正式执行细节来源。PRD 负责说明目标、边界、验收方向和下游交付物，`specs/` 负责承载可执行、可检查、可落地的细节规则。

## 强制规则

- 不得删除 `specs/` 目录。
- 不得把 `specs/` 合并回 PRD 后删除原目录。
- 不得只读取 PRD、Brief 或根目录汇总规格而跳过 `specs/`。
- 不得用根目录汇总规格替代 `specs/` 中的正式规则。
- 不得在下游实现中省略 `specs/` 已经定义的 token、组件、内容形态参考、脚本、浏览器验收、发布治理、内容结构保持和复盘约束。
- 不得把旧模板规则恢复为模板套用执行环节。
- 不得让用户内容套入固定模板或固定页面骨架。
- 若 PRD、Brief、根目录汇总规格与 `specs/` 存在不一致，以下游实现时用户最新确认和 `specs/` 的细粒度规则为准。

## 汇总文件定位

根目录中的以下文件只作为辅助阅读、迁移参考和快速理解材料：

- `visual-system-spec-static-html-ui-guardrails-skill.md`
- `component-template-spec-static-html-ui-guardrails-skill.md`
- `execution-quality-spec-static-html-ui-guardrails-skill.md`

这些文件不得成为唯一执行依据。正式实现必须读取 `specs/00-spec-index.md`，并按索引继续读取 `specs/01` 到 `specs/12`。

## 下游实现要求

下游 AI 或开发者在创建正式 Skill 时，必须把 `specs/` 中的规则迁移到 Skill 文件结构中，或建立等价的模块化规格目录，并在 `SKILL.md` 中明确引用。迁移后仍必须保证：

- 执行细节没有丢失。
- 文件结构可维护。
- 每次规则变更写入 `CHANGELOG.md`。
- 用户可见内容保持中文。
- 默认保护源 HTML，不覆盖源文件。
- 未经用户确认，不得因为复盘建议自动修改 Skill 行为。

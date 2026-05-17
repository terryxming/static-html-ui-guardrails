#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
let file = null;
let sourceFile = null;

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === "--source") {
    sourceFile = args[index + 1];
    index += 1;
  } else if (!file) {
    file = arg;
  } else if (!sourceFile) {
    sourceFile = arg;
  }
}

function usage() {
  console.error("用法：node scripts/check_html_visual.js <target.html> [--source <source.html>]");
  process.exit(2);
}

function item(ruleId, severity, message, location, reason, suggestion) {
  return { ruleId, severity, message, location, reason, suggestion };
}

function readHtml(inputFile, role) {
  try {
    return fs.readFileSync(inputFile, "utf8");
  } catch (error) {
    throw item("FILE-001", "blocker", `无法读取${role}文件。`, inputFile, error.message, "请传入一个可读取的本地 HTML 文件。");
  }
}

function stripTags(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: "\"",
    apos: "'",
    nbsp: " "
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const radix = entity[1].toLowerCase() === "x" ? 16 : 10;
      const number = parseInt(entity.slice(radix === 16 ? 2 : 1), radix);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return Object.prototype.hasOwnProperty.call(named, entity.toLowerCase()) ? named[entity.toLowerCase()] : match;
  });
}

function normalizeText(value) {
  return decodeEntities(stripTags(value)).replace(/\s+/g, " ").trim();
}

function attrValues(html, attrName) {
  const pattern = new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, "gi");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function countTags(html, tagName) {
  const pattern = new RegExp(`<${tagName}(\\s|>|/)`, "gi");
  return [...html.matchAll(pattern)].length;
}

function extractHeadings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), text: normalizeText(match[2]) }))
    .filter((entry) => entry.text);
}

function extractTables(html) {
  return [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((tableMatch) => {
    const table = tableMatch[1];
    const firstRow = (table.match(/<tr\b[^>]*>([\s\S]*?)<\/tr>/i) || ["", ""])[1];
    const th = [...firstRow.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => normalizeText(match[1]));
    const td = [...firstRow.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => normalizeText(match[1]));
    return { headers: th.length ? th : td };
  });
}

function fingerprint(html) {
  return {
    headings: extractHeadings(html),
    tables: extractTables(html),
    listCount: countTags(html, "ul") + countTags(html, "ol"),
    codeCount: countTags(html, "pre") + countTags(html, "code"),
    ids: attrValues(html, "id"),
    text: normalizeText(html)
  };
}

function sameArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

if (!file) usage();

let html = "";
let sourceHtml = "";
const items = [];
const add = (...entry) => items.push(item(...entry));

try {
  html = readHtml(file, "目标");
  if (sourceFile) sourceHtml = readHtml(sourceFile, "源");
} catch (errorItem) {
  const result = { file, sourceFile, passed: false, items: [errorItem] };
  console.log(JSON.stringify(result, null, 2));
  process.exit(1);
}

const has = (needle) => html.includes(needle);
const re = (pattern) => pattern.test(html);

if (!/\.html?$/i.test(file)) {
  add("FILE-001", "blocker", "输入文件不是 HTML 文件。", file, "本 Skill 只交付一个本地 HTML 文件。", "请使用 .html 文件。");
}

if (!re(/<!doctype html>/i) || !re(/<html[\s>]/i) || !re(/<style\b[^>]*>[\s\S]*<\/style>/i) || !re(/<script\b[^>]*>[\s\S]*<\/script>/i)) {
  add("FILE-002", "blocker", "HTML 不是完整的单文件文档。", "document", "交付物必须包含完整文档、内联 CSS 和内联 JS。", "请输出完整的离线 HTML 文件。");
}

const externalPatterns = [
  /<(link|script|img|iframe|source)\b[^>]+(?:href|src)=["']https?:\/\//i,
  /@import\s+url\(["']?https?:\/\//i,
  /url\(["']?https?:\/\//i,
  /cdn\./i,
  /fonts\.googleapis\.com|fonts\.gstatic\.com/i
];
if (externalPatterns.some((pattern) => pattern.test(html))) {
  add("NET-001", "blocker", "检测到外部网络依赖。", "document", "本地 HTML 交付物必须可离线打开，不能依赖 CDN、外部字体、脚本或图片。", "请内联必要资源，或移除该依赖。");
}

const requiredTokens = [
  "--gray-100", "--color-bg-page", "--color-bg-surface", "--color-text-primary", "--color-text-secondary",
  "--color-border-subtle", "--font-sans", "--type-title-xl", "--type-body", "--type-table",
  "--space-6", "--page-max-wide", "--section-gap", "--card-padding", "--table-cell-px",
  "--table-cell-py", "--focus-ring", "--chart-blue", "--chart-teal", "--chart-green", "--chart-orange"
];
for (const token of requiredTokens) {
  if (!has(token)) add("TOK-001", "blocker", `缺少必需 UI token ${token}。`, "style", "UI 表现必须复用稳定 token，不能随机造样式。", "请从UI 系统恢复该 token。");
}

if (!has(':root[data-theme="dark"]') || !has("@media (prefers-color-scheme: dark)")) {
  add("THEME-001", "blocker", "缺少必需的深色模式 token 系统。", "style", "深色模式是必选能力，必须支持系统偏好和显式主题。", "请恢复深色 token 和 prefers-color-scheme 处理。");
}
if (!has('id="themeToggle"') || !has("localStorage") || (!has("staticHtmlUiGuardrailsTheme") && !has("staticHtmlUiGuardrailsTheme")) || !has("dataset.theme")) {
  add("THEME-002", "blocker", "缺少一键持久化主题切换。", "script", "PRD 要求提供用户可见且可持久化的主题切换。", "请恢复 #themeToggle 以及 applyTheme/currentTheme 逻辑。");
}

if (re(/<section[^>]*class=["'][^"']*hero/i) || re(/class=["'][^"']*(hero|landing|pricing|testimonial|features)[^"']*["']/i)) {
  add("FORBID-001", "blocker", "检测到营销或 hero 结构。", "document", "本 Skill 默认目标是严肃交付物，不是营销页面。", "请改为服务内容本身的阅读结构。");
}
if (re(/linear-gradient\([^)]*(#[0-9a-f]{3,8}|rgb)/i) && !has(".brand-mark")) {
  add("FORBID-002", "warning", "在已知品牌标记之外检测到渐变。", "style", "装饰性渐变不得主导页面。", "请移除装饰性渐变，或记录受控例外。");
}

const hasTable = /<table\b/i.test(html);
if (hasTable && (!has(".table-wrap") || !re(/\.table-wrap\s*{[\s\S]*overflow-x:\s*auto/i))) {
  add("TABLE-001", "blocker", "存在表格但缺少横向滚动容器。", "style", "大表必须保持可读，且不能造成整页溢出。", "请用带 overflow-x:auto 的 .table-wrap 包裹表格。");
}
const styleText = (html.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i) || ["", ""])[1];
const blockFor = (selector) => {
  const escapeSelector = (value) => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp(escapeSelector(selector) + "\\s*\\{([\\s\\S]*?)\\}", "i");
  const match = styleText.match(pattern);
  return match ? match[1] : "";
};
if (/white-space:\s*nowrap/i.test(blockFor("tbody")) || /white-space:\s*nowrap/i.test(blockFor("td"))) {
  add("TABLE-002", "blocker", "检测到表格正文全局 nowrap。", "style", "表格长文本默认必须可换行。", "请只在数字、ID、日期或短状态单元格中使用 nowrap。");
}
if (hasTable && !re(/\.number\s*{[\s\S]*text-align:\s*right[\s\S]*font-variant-numeric:\s*tabular-nums/i)) {
  add("TABLE-003", "blocker", "存在表格但缺少数字列对齐规则。", "style", "数字在高密度表格中必须易于扫描。", "请恢复 .number 右对齐和等宽数字。");
}
if (hasTable && !re(/th,\s*\n?\s*td\s*{[\s\S]*overflow-wrap:\s*anywhere[\s\S]*word-break:\s*break-word/i)) {
  add("TABLE-004", "blocker", "存在表格但缺少长文本换行规则。", "style", "长评论、标题、URL 和备注不得被截断。", "请恢复 th 和 td 的换行规则。");
}

const inlineStyles = [...html.matchAll(/style=["']([^"']+)["']/gi)].map((match) => match[1]);
for (const value of inlineStyles) {
  const trimmed = value.trim();
  const allowed = /^width:\s*\d+(\.\d+)?%$/.test(trimmed) ||
    /^width:\s*\d+(\.\d+)?px;?$/.test(trimmed) ||
    /^height:\s*16px;?$/.test(trimmed);
  if (!allowed) {
    add("TOK-002", "warning", `发现未复核的 inline style： ${value}`, "document", "token 化规则只允许受控例外。", "请把样式移入 token/class，或记录该例外。");
  }
}

if (sourceFile) {
  const source = fingerprint(sourceHtml);
  const target = fingerprint(html);

  if (source.headings.length) {
    const sourceHeadings = source.headings.map((entry) => `${entry.level}:${entry.text}`);
    const targetHeadings = target.headings.map((entry) => `${entry.level}:${entry.text}`);
    if (!sameArray(sourceHeadings, targetHeadings)) {
      add("STRUCT-001", "blocker", "标题层级或标题顺序被改变。", "structure", "已有 HTML 的标题 outline 属于上游内容骨架，UI 优化不得接管。", "请恢复源文件标题层级与顺序；只修改样式。");
    }
  } else {
    add("STRUCT-001", "manual", "源文件没有可提取标题，需要人工确认内容骨架。", "structure", "脚本无法从标题 outline 判断结构保持情况。", "请人工复核章节顺序和阅读路径。");
  }

  if (target.tables.length !== source.tables.length) {
    add("STRUCT-002", "blocker", "表格数量与源文件不一致。", "structure", "表格通常承载上游业务证据，UI 优化不得删除或新增业务表格。", "请恢复源文件表格数量；表现性 wrapper 不计入表格。");
  }
  source.tables.forEach((table, index) => {
    const targetTable = target.tables[index];
    if (targetTable && !sameArray(table.headers, targetTable.headers)) {
      add("STRUCT-003", "blocker", `第 ${index + 1} 个表格表头被改变。`, "structure", "表头定义业务维度，不能为了样式重写。", "请恢复源文件表头文本与顺序。");
    }
  });

  if (target.listCount < source.listCount) {
    add("STRUCT-004", "blocker", "列表数量少于源文件。", "structure", "列表承载步骤、需求、风险或枚举，不能在UI 优化中丢失。", "请恢复源文件列表内容。");
  }
  if (target.codeCount < source.codeCount) {
    add("STRUCT-005", "blocker", "代码块数量少于源文件。", "structure", "代码或配置片段是内容骨架的一部分。", "请恢复源文件代码块。");
  }

  const targetIds = new Set(target.ids);
  const missingIds = [...new Set(source.ids)].filter((id) => !targetIds.has(id));
  if (missingIds.length) {
    add("STRUCT-006", "blocker", `源文件锚点 ID 丢失： ${missingIds.join(", ")}。`, "structure", "锚点关系属于文档可导航结构。", "请恢复这些 id，或记录用户明确授权的结构重构。");
  }

  let cursor = 0;
  const missingOrder = [];
  for (const heading of source.headings.map((entry) => entry.text).filter(Boolean)) {
    const found = target.text.indexOf(heading, cursor);
    if (found === -1) {
      missingOrder.push(heading);
    } else {
      cursor = found + heading.length;
    }
  }
  if (missingOrder.length) {
    add("STRUCT-007", "blocker", `关键标题文本顺序无法在目标文件中复现： ${missingOrder.join(" / ")}。`, "structure", "表现适应内容要求阅读路径保持稳定。", "请恢复源文件关键文本顺序。");
  }
} else {
  add("STRUCT-000", "manual", "未提供源 HTML，结构保护只能人工复核。", "structure", "脚本无法判断是否破坏了上游内容骨架。", "如本次是改造已有 HTML，请使用 --source 重新运行。");
}

if (!has("关键结论") && !has("核心判断") && !has("证据")) {
  add("EVID-001", "manual", "结论与证据关系需要人工复核。", "content", "本 Skill 不验证事实，但结构必须支持结论绑定证据。", "请确认关键结论绑定了图表、表格、引用或用户输入。");
}

add("MANUAL-001", "manual", "人工复核表现是否适应内容。", "document", "静态检查无法完全判断 UI 是否越权接管业务骨架。", "请人工检查内容身份、章节逻辑和阅读路径是否仍由上游内容决定。");
add("MCP-001", "manual", "必须执行 Chrome DevTools MCP 验收。", "browser", "静态分析不能替代控制台、网络、溢出、截图和交互检查。", "宣称完成前，请执行 references/chrome-devtools-mcp-acceptance.md。");

const blockerCount = items.filter((entry) => entry.severity === "blocker").length;
const warningCount = items.filter((entry) => entry.severity === "warning").length;
const manualCount = items.filter((entry) => entry.severity === "manual").length;
const result = {
  file: path.resolve(file),
  sourceFile: sourceFile ? path.resolve(sourceFile) : null,
  passed: blockerCount === 0,
  summary: { blockers: blockerCount, warnings: warningCount, manual: manualCount },
  items
};

console.log(JSON.stringify(result, null, 2));
console.log("\n---\n");
console.log(`# HTML UI 优化约束检查报告\n\n- 文件： ${result.file}\n- 源文件： ${result.sourceFile || "未提供"}\n- 是否通过： ${result.passed ? "是" : "否"}\n- Blocker 数： ${blockerCount}\n- Warning 数： ${warningCount}\n- Manual 数： ${manualCount}\n`);
for (const entry of items) {
  console.log(`## [${entry.severity}] ${entry.ruleId}\n\n${entry.message}\n\n- 位置： ${entry.location}\n- 原因： ${entry.reason}\n- 建议： ${entry.suggestion}\n`);
}

process.exit(blockerCount === 0 ? 0 : 1);

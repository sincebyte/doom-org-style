# 主题系统

页面左下角的调色盘按钮会打开主题面板，可同时选择「主题」与「明暗模式」。
当前内置：

| 主题 | 明暗 | 说明 |
| --- | --- | --- |
| Doom | Light / Dark | 默认主题，样式在 `org_css_light.css`、`org_css_dark.css` |
| Tokyo Night | Day / Night | `themes/tokyo-night.css` |
| GitHub | Light / Dark | `themes/github.css`，GitHub 官方配色 |
| Catppuccin | Latte / Mocha | `themes/catppuccin.css`，柔和的现代配色 |

选择结果保存在 `localStorage`：

- `doomColorTheme`：主题 id，例如 `doom`、`tokyo-night`、`github`、`catppuccin`
- `doomToggleStyle`：`light` 或 `dark`

## 工作机制

1. `scroll.js` 是唯一的入口，页面只需要引入它；它按自身所在目录自动写入
   `base.css`、恢复首屏主题，并在缺少 jQuery 时补载、出现公式时补载 MathJax；
2. `scroll.js` 顶部的 `THEME_REGISTRY` 是主题清单，资源路径统一以
   `ASSET_BASE_URL`（默认即 `scroll.js` 所在目录）为基准解析；
3. 选中主题时，脚本给 `<html>` 写入 `data-theme="<id>"`，并加载该主题的
   `stylesheet`（Doom 已内置在 `base.css` 中，因此为 `null`）；
4. 主题 CSS 只在自己匹配 `data-theme` 时生效，因此可以和默认主题共存；
5. 明暗模式沿用原有的 `light` / `dark` class。

## 新增一套主题

以 Tokyo Night 为模板，三步即可：

### 1. 新建主题 CSS

复制 `themes/tokyo-night.css` 为 `themes/<id>.css`，然后：

- 修改所有 `html[data-theme="tokyo-night"]` 为新的 id；
- 在文件顶部的 `.dark { ... }` 与 `.light { ... }` 两组 token 中替换配色；
- 其余覆盖规则引用 token，通常不需要改动。

配色 token 覆盖页面底色、文字、标题渐变、链接、目录、表格、代码块、
行内代码、Admonition、状态标记、引用、页脚与主题面板。

> 主题 CSS 只应覆盖颜色类属性（`color`、`background*`、`border-*-color`、
> `box-shadow`、`text-shadow`）。不要写 `border` / `padding` / `margin` /
> `font-size` / `width` 这类会改变盒模型的属性，否则切换主题时页面元素会位移。
> 需要分隔线时用 `box-shadow: inset 0 1px 0 <color>`，它不占布局空间。

### 2. 注册主题

在 `scroll.js` 的 `THEME_REGISTRY` 中追加：

```js
{
    id: "my-theme",
    name: "My Theme",
    description: "一句话说明",
    stylesheet: "themes/my-theme.css",
    swatches: {
        light: ["#背景", "#强调1", "#强调2", "#文字"],
        dark: ["#背景", "#强调1", "#强调2", "#文字"],
    },
}
```

`swatches` 是面板左侧的 2×2 预览色点，按明暗模式分别给出。

### 3. 首屏预加载

不需要额外配置。`scroll.js` 在解析阶段就会恢复上次选择的主题与明暗模式，
并按自身 HTTP 路径写入主题 CSS 的 `<link>`，因此刷新时不会闪白，也不必在
`<head>` 里手写预加载脚本或在其中登记主题文件。

## 部署到 CDN

页面只需要一行引用，其余静态资源都由 `scroll.js` 自动带入：

```html
<script src="https://cdn.example.com/doc/scroll.js"></script>
```

`scroll.js` 会做三件事：

- 自动写入 `base.css`（它自己再 `@import` 同目录的明暗基础样式与面板样式）；
- 自动加载主题 CSS，路径以 `scroll.js` 自身所在目录为基准，而不是当前页面；
- 页面没有 jQuery 时自动加载，页面出现公式时再按需加载 `tex-mml-chtml.js`。

因此把 `scroll.js`、`themes/` 一起放到 CDN、HTML 留在站点目录时，无需改任何路径。

如果静态资源与 `scroll.js` 不在同一级，可在引入 `scroll.js` 之前覆盖基准地址：

```html
<script>
    window.DOOM_ASSET_BASE_URL = "https://cdn.example.com/doc/";
</script>
```

（旧名字 `DOOM_THEME_BASE_URL` 仍然兼容。）

jQuery 默认从 cdnjs 加载；若想改用同目录文件，同样可以覆盖：

```html
<script>
    window.DOOM_JQUERY_URL = "https://cdn.example.com/doc/jquery.min.js";
</script>
```

线上目录至少需要保持这样的结构（以 `scroll.js` 所在目录为根）：

```text
scroll.js
base.css
org_css_dark.css
org_css_light.css
theme-panel.css
tex-mml-chtml.js
themes/
├── tokyo-night.css
├── github.css
└── catppuccin.css
```

`base.css` 通过 `@import` 加载同目录的三个样式文件，`scroll.js` 负责按需加载
`themes/` 下的主题 CSS；这些都不需要在 HTML `<head>` 里额外写标签。

# 主题系统

页面左下角的调色盘按钮会打开主题面板，可同时选择「主题」与「明暗模式」。
当前内置：

| 主题 | 明暗 | 说明 |
| --- | --- | --- |
| Doom | Light / Dark | 默认主题，样式在 `org_css_light.css`、`org_css_dark.css` |
| Tokyo Night | Day / Night | `themes/tokyo-night.css` |

选择结果保存在 `localStorage`：

- `doomColorTheme`：主题 id，例如 `doom`、`tokyo-night`
- `doomToggleStyle`：`light` 或 `dark`

## 工作机制

1. `scroll.js` 顶部的 `THEME_REGISTRY` 是主题清单；
2. 选中主题时，脚本给 `<html>` 写入 `data-theme="<id>"`，并加载该主题的
   `stylesheet`（Doom 已内置在 `base.css` 中，因此为 `null`）；
3. 主题 CSS 只在自己匹配 `data-theme` 时生效，因此可以和默认主题共存；
4. 明暗模式沿用原有的 `light` / `dark` class。

## 新增一套主题

以 Tokyo Night 为模板，三步即可：

### 1. 新建主题 CSS

复制 `themes/tokyo-night.css` 为 `themes/<id>.css`，然后：

- 修改所有 `html[data-theme="tokyo-night"]` 为新的 id；
- 在文件顶部的 `.dark { ... }` 与 `.light { ... }` 两组 token 中替换配色；
- 其余覆盖规则引用 token，通常不需要改动。

配色 token 覆盖页面底色、文字、标题渐变、链接、目录、表格、代码块、
行内代码、Admonition、状态标记、引用、页脚与主题面板。

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

### 3. 首屏预加载（可选）

为避免刷新时先显示一帧默认主题，导出模板的 `<head>` 中有提前恢复主题的脚本。
在其中登记新主题文件：

```js
var stylesheets = {
    "tokyo-night": "themes/tokyo-night.css",
    "my-theme": "themes/my-theme.css",
};
```

脚本会先写入 `data-theme` 和 `light` / `dark` class，再按需加载主题 CSS。
即使不做这一步，`scroll.js` 初始化时也会补载，只是首屏可能短暂闪烁。

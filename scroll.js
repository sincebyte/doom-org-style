/*
 * ===== 主题注册表 =====
 *
 * 新增一套主题只需要两步：
 *   1. 在 themes/ 下按 themes/tokyo-night.css 的文件结构写一个新主题；
 *   2. 在下面的数组里追加一项（id 与 CSS 中的 data-theme 一致）。
 *
 * id        : 写入 <html data-theme="..."> 的值
 * name      : 面板里显示的名称
 * stylesheet: 主题样式文件；为 null 表示主题已内置在 base.css（Doom）
 * swatches  : 面板预览色板，按明暗模式分别给出
 */
const THEME_REGISTRY = [
    {
        id: "doom",
        name: "Doom",
        description: "Doom Emacs 文档风格",
        stylesheet: null,
        swatches: {
            light: ["#fafafa", "#6f3985", "#4eaeef", "#24272e"],
            dark: ["#282c35", "#d78dd2", "#4eaeef", "#f3c7ee"],
        },
    },
    {
        id: "tokyo-night",
        name: "Tokyo Night",
        description: "Tokyo Night · Day",
        stylesheet: "themes/tokyo-night.css",
        swatches: {
            light: ["#e1e2e7", "#9854f1", "#2e7de9", "#3760bf"],
            dark: ["#1a1b26", "#bb9af7", "#7aa2f7", "#7dcfff"],
        },
    },
];

const DEFAULT_THEME_ID = THEME_REGISTRY[0].id;
const THEME_STORAGE_KEY = "doomColorTheme";
const MODE_STORAGE_KEY = "doomToggleStyle";
const THEME_STYLESHEET_ID = "org-theme-stylesheet";

let currentThemeId = DEFAULT_THEME_ID;
let currentMode = "light";

$(document).ready(function () {
    if (
        localStorage.getItem(MODE_STORAGE_KEY) === "null" ||
        localStorage.getItem(MODE_STORAGE_KEY) === null
    ) {
        localStorage.setItem(MODE_STORAGE_KEY, "light");
        window.location.reload();
    }
    clearPreamble();
    createCheckbox();
    bindEvent();
    createShiftButton();
    delma();
    removeBoxDrawingChars();
    wrapAsciiArrowChars();
    addVerbatimClass();
    initTheme();
});

/** 底栏不再显示 "Made by" 文案，把位置留给主题入口 */
function clearPreamble() {
    const preamble = document.getElementById("preamble");
    if (preamble) {
        preamble.textContent = "";
    }
}

function addVerbatimClass() {
    document.querySelectorAll("code").forEach(function (el) {
        if (!el.closest("pre")) {
            el.classList.add("verbatim");
        }
    });
}

function delma() {
    const elementsWithLinenClass = document.querySelectorAll(".linenr");
    elementsWithLinenClass.forEach((element) => {
        let textContent = element.textContent;
        textContent = textContent.replace(/: /g, "");
        element.textContent = textContent;
    });
}

function isTextTypeBlock(preElement) {
    return /\bsrc-(text|txt)\b/.test(preElement.className);
}

const ASCII_ARROW_RE = /[→←▼◄►]/g;

function wrapAsciiArrowChars() {
    document
        .querySelectorAll(
            "pre.src-text code, pre.src-txt code, pre.ascii-art code",
        )
        .forEach((code) => {
            if (code.dataset.asciiArrowsWrapped === "1") {
                return;
            }
            const walker = document.createTreeWalker(
                code,
                NodeFilter.SHOW_TEXT,
            );
            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.parentElement?.classList.contains("ascii-arrow-h")) {
                    continue;
                }
                textNodes.push(node);
            }
            textNodes.forEach((textNode) => {
                const text = textNode.textContent;
                if (!ASCII_ARROW_RE.test(text)) {
                    return;
                }
                ASCII_ARROW_RE.lastIndex = 0;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;
                while ((match = ASCII_ARROW_RE.exec(text))) {
                    if (match.index > lastIndex) {
                        fragment.appendChild(
                            document.createTextNode(
                                text.slice(lastIndex, match.index),
                            ),
                        );
                    }
                    const span = document.createElement("span");
                    span.className = "ascii-arrow-h";
                    span.textContent = match[0];
                    fragment.appendChild(span);
                    lastIndex = match.index + match[0].length;
                }
                if (lastIndex < text.length) {
                    fragment.appendChild(
                        document.createTextNode(text.slice(lastIndex)),
                    );
                }
                textNode.parentNode.replaceChild(fragment, textNode);
            });
            code.dataset.asciiArrowsWrapped = "1";
        });
}

function removeBoxDrawingChars() {
    const codeBlocks = document.querySelectorAll(
        ".org-src-container pre",
    );
    codeBlocks.forEach((pre) => {
        if (isTextTypeBlock(pre)) return;
        const walker = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            node.textContent = node.textContent.replace(
                /^[ \t]*[│┃┇┆┋┇][ \t]*/gm,
                "",
            );
        }
    });
}

function nextOutline() {
    // find level 1
    var links = $("#text-table-of-contents > ul > li > a");
    for (var nodeIndex = 0; nodeIndex < links.length; nodeIndex++) {
        var href = $(links[nodeIndex + 1]).attr("href");
        if (
            $(links[nodeIndex]).attr("class") === "active" &&
            nodeIndex < links.length - 1
        ) {
            $(links[nodeIndex + 1]).click();
            window.location = href;
            return;
        }
    }
    // find level 2
    var l2activelink = $("#text-table-of-contents > ul > li .active");
    var currentHref = l2activelink.parent().parent().parent().find("a:first")
        .attr("href");
    for (var nodeIndex = 0; nodeIndex < links.length; nodeIndex++) {
        var href = $(links[nodeIndex]).attr("href");
        if (currentHref === href) {
            $(links[nodeIndex + 1]).click();
            window.location = href;
            return;
        }
    }
}

function prevOutline() {
    // find level 1
    var links = $("#text-table-of-contents > ul > li > a");
    for (var nodeIndex = 0; nodeIndex < links.length; nodeIndex++) {
        var href = $(links[nodeIndex - 1]).attr("href");
        if ($(links[nodeIndex]).attr("class") === "active" && nodeIndex > 0) {
            $(links[nodeIndex - 1]).click();
            window.location = href;
            return;
        }
    }

    // find level 2
    var l2activelink = $("#text-table-of-contents > ul > li .active");
    var currentHref = l2activelink.parent().parent().parent().find("a:first")
        .attr("href");
    for (var nodeIndex = 0; nodeIndex < links.length; nodeIndex++) {
        var href = $(links[nodeIndex]).attr("href");
        if (currentHref === href) {
            $(links[nodeIndex]).click();
            window.location = href;
            return;
        }
    }
}

function createShiftButton() {
    let previousButton =
        `<div class="previousButton unselectable" onclick="prevOutline()"><span>＜</span></div>`;
    let nextButton =
        `<div class="nextButton unselectable" onclick="nextOutline()"><span>＞</span></div>`;
    $("#table-of-contents").after(previousButton);
    $("#content").append(nextButton);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) return pair[1];
    }
    return (false);
}

/* 创建主题切换按钮*/
function createCheckbox() {
    var isChecked = localStorage.getItem("doomToggleStyle");
    let dom = `<label class="theme-toggle" title="切换明暗主题">
                <input type="checkbox" class="theme-toggle__input" id="switch" ${(isChecked ==
            "dark"
        ? "checked"
        : "")} name="mode" aria-label="切换明暗主题">
                <span class="theme-toggle__label theme-toggle__label--day" aria-hidden="true">DAY</span>
                <span class="theme-toggle__track">
                  <span class="theme-toggle__fill" aria-hidden="true"></span>
                  <span class="theme-toggle__thumb" aria-hidden="true"></span>
                </span>
                <span class="theme-toggle__label theme-toggle__label--night" aria-hidden="true">NIGHT</span>
              </label>`;

    let buttomcheck =
        `<div class="btncheck"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="30" viewBox="0 -5 48 50">
<circle cx="24" cy="24" r="20" fill="#9575cd"></circle><path fill="#5e35b1" d="M24,45C12.42,45,3,35.579,3,24S12.42,3,24,3s21,9.421,21,21S35.58,45,24,45z M24,5 C13.523,5,5,13.523,5,24s8.523,19,19,19s19-8.523,19-19S34.477,5,24,5z"></path><path fill="#fff" d="M34.824,32.823c0,1.492-3.606,3.039-4.379,3.26c-2.21,0.635-3.951,0.926-6.217,0.926 c-1.395,0-2.228,0-5.228,0c3.319-0.422,7.589-1.244,10-2c0.883-0.277,0.593-0.964,0-1c-3.962-0.241-12.181-0.545-14.746-3.023 c-0.718-0.691-1.077-1.506-1.077-2.404c0-3.868,7.363-5.084,10.761-5.429c-4.061-1.381-7.639-4.365-7.639-6.037 c0-1.575,1.825-2.693,5.127-2.693c3.225,0,8.058-0.319,8.113-0.333c1.119-0.221,1.323-0.193,1.326-0.663 c-0.014-0.207-0.539-0.525-1.285-0.525c0,0-4.579,0.106-5.579,0.106c3.253-1.074,5.187-2.496,7.301-1.861 c1.202,0.359,2.058,1.202,2.266,2.266c0.207,1.036,0.041,1.879-0.47,2.5c-0.939,1.133-6.037,1.101-7.097,1.095 c-1.25-0.008,2,0-2,0c-1.731,0-3.833,0.143-3.051,1.507c0.077,0.134,1.051,1.128,2.418,1.943c1.81,1.091,7.615,2.874,7.684,2.901 c0.11,0.055,0.193,0.166,0.18,0.304c-0.014,0.124-0.111,0.235-0.249,0.262c-4.421,0.884-11.314,3.053-10.969,5.125 c0.29,1.699,3.44,2.5,8.869,2.293h0.29C31.909,31.345,34.824,31.456,34.824,32.823z"></path>
</svg></div>`;

    $("body").append(dom);
    $("body").append(buttomcheck);
    createThemePanel();
}

/** 主题面板：左下角入口 + 向上弹出的主题选择面板 */
function createThemePanel() {
    const themeOptions = THEME_REGISTRY.map(function (theme) {
        const swatches = theme.swatches.light
            .map(function (color) {
                return `<span class="theme-option__swatch" style="background:${color}"></span>`;
            })
            .join("");
        return `<button type="button" class="theme-option" data-theme-id="${theme.id}" role="radio" aria-checked="false">
                  <span class="theme-option__swatches" aria-hidden="true">${swatches}</span>
                  <span class="theme-option__text">
                    <strong>${theme.name}</strong>
                    <small>${theme.description}</small>
                  </span>
                  <span class="theme-option__check" aria-hidden="true">✓</span>
                </button>`;
    }).join("");

    const panel = `<div class="theme-dock">
        <div class="theme-panel" id="theme-panel" role="dialog" aria-label="选择主题" aria-hidden="true">
          <div class="theme-panel__head">
            <span class="theme-panel__title">主题</span>
            <span class="theme-panel__meta" id="theme-panel-meta">Doom · Light</span>
          </div>
          <div class="theme-panel__list" role="radiogroup" aria-label="主题">${themeOptions}</div>
          <div class="theme-panel__modes" role="group" aria-label="明暗模式">
            <button type="button" data-mode="light" aria-pressed="true">LIGHT</button>
            <button type="button" data-mode="dark" aria-pressed="false">DARK</button>
          </div>
        </div>
        <button type="button" class="theme-launcher" id="theme-launcher" aria-haspopup="dialog" aria-expanded="false" aria-controls="theme-panel" title="切换主题">
          <svg class="theme-launcher__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 0 18h1.6a2.4 2.4 0 0 0 0-4.8H12a2.1 2.1 0 0 1 0-4.2h4.6A4.4 4.4 0 0 0 21 7.6C21 5 17 3 12 3Z"/>
            <circle cx="7.6" cy="10.6" r=".9" fill="currentColor" stroke="none"/>
            <circle cx="10.6" cy="7" r=".9" fill="currentColor" stroke="none"/>
            <circle cx="15" cy="7.6" r=".9" fill="currentColor" stroke="none"/>
          </svg>
          <span class="theme-launcher__name">Doom</span>
        </button>
      </div>`;

    // 挂在 #preamble 内：侧栏收起时底栏平移，主题入口也会跟随
    const mount = document.getElementById("preamble") || document.body;
    $(mount).append(panel);

    const launcher = document.getElementById("theme-launcher");
    const panelEl = document.getElementById("theme-panel");

    launcher.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleThemePanel();
    });
    panelEl.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    panelEl.querySelectorAll("[data-theme-id]").forEach(function (button) {
        button.addEventListener("click", function () {
            applyTheme(button.dataset.themeId, currentMode);
        });
    });

    panelEl.querySelectorAll("[data-mode]").forEach(function (button) {
        button.addEventListener("click", function () {
            applyTheme(currentThemeId, button.dataset.mode);
        });
    });

    document.addEventListener("click", function () {
        setThemePanelOpen(false);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setThemePanelOpen(false);
        }
    });
}

function getTheme(themeId) {
    return (
        THEME_REGISTRY.find(function (theme) {
            return theme.id === themeId;
        }) || THEME_REGISTRY[0]
    );
}

function setThemePanelOpen(open) {
    const panelEl = document.getElementById("theme-panel");
    const launcher = document.getElementById("theme-launcher");
    if (!panelEl || !launcher) {
        return;
    }
    panelEl.classList.toggle("is-open", open);
    panelEl.setAttribute("aria-hidden", open ? "false" : "true");
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
}

function toggleThemePanel() {
    const panelEl = document.getElementById("theme-panel");
    if (!panelEl) {
        return;
    }
    setThemePanelOpen(!panelEl.classList.contains("is-open"));
}

/** 按需加载主题样式表；Doom 已内置，stylesheet 为 null 时移除外部样式 */
function ensureThemeStylesheet(theme) {
    const existing = document.getElementById(THEME_STYLESHEET_ID);
    if (!theme.stylesheet) {
        if (existing) {
            existing.remove();
        }
        return;
    }
    if (existing) {
        if (existing.getAttribute("href") !== theme.stylesheet) {
            existing.setAttribute("href", theme.stylesheet);
        }
        return;
    }
    const link = document.createElement("link");
    link.id = THEME_STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href = theme.stylesheet;
    document.head.appendChild(link);
}

/** 同步面板、右上角开关与按钮文案 */
function syncThemeUI() {
    const theme = getTheme(currentThemeId);
    const nameEl = document.querySelector(".theme-launcher__name");
    if (nameEl) {
        nameEl.textContent = theme.name;
    }
    const metaEl = document.getElementById("theme-panel-meta");
    if (metaEl) {
        metaEl.textContent =
            theme.name + " · " + (currentMode === "dark" ? "Dark" : "Light");
    }
    document.querySelectorAll(".theme-option").forEach(function (option) {
        const active = option.dataset.themeId === currentThemeId;
        const optionTheme = getTheme(option.dataset.themeId);
        const swatches =
            optionTheme.swatches[currentMode] || optionTheme.swatches.light;
        option.classList.toggle("is-active", active);
        option.setAttribute("aria-checked", active ? "true" : "false");
        option.querySelectorAll(".theme-option__swatch").forEach(function (
            dot,
            index,
        ) {
            dot.style.background = swatches[index] || swatches[0];
        });
    });
    document.querySelectorAll("[data-mode]").forEach(function (button) {
        const active = button.dataset.mode === currentMode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const checkbox = document.getElementById("switch");
    if (checkbox) {
        checkbox.checked = currentMode === "dark";
    }
}

/** 应用主题（主题 + 明暗模式），persist 为 false 时仅渲染不写存储 */
function applyTheme(themeId, mode, persist) {
    const theme = getTheme(themeId);
    const nextMode = mode === "dark" ? "dark" : "light";
    currentThemeId = theme.id;
    currentMode = nextMode;

    const root = document.documentElement;
    root.setAttribute("data-theme", theme.id);
    root.classList.remove(nextMode === "dark" ? "light" : "dark");
    root.classList.add(nextMode);

    ensureThemeStylesheet(theme);

    if (persist !== false) {
        localStorage.setItem(THEME_STORAGE_KEY, theme.id);
        localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    }
    syncThemeUI();
}

/** 首次进入：恢复上次选择的主题与明暗模式 */
function initTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_ID;
    const storedMode = localStorage.getItem(MODE_STORAGE_KEY) || "light";
    applyTheme(getTheme(storedTheme).id, storedMode, false);
}

/* 绑定界面操作事件*/
function bindEvent() {
    var currentt = true;
    let currentHeight = 0;

    $("div.org-src-container").before().hover(function (ev) {
        if (ev.target.nodeName === "DIV") {
            $(ev.target).addClass("hover-btn-style");
        }
    }, function (ev) {
        if (ev.target.nodeName === "DIV") {
            $(ev.target).removeClass("hover-btn-style");
        }
    });

    $("div.org-src-container").on("click", function (ev) {
        if (ev.target.nodeName === "DIV") {
            $(ev.target).addClass("click-btn-style");
            setTimeout(function () {
                $(ev.target).removeClass("click-btn-style");
            }, 5000);
        } else {
            return;
        }
        const element = $(this);
        const storage = document.createElement("textarea");
        const contentCode = element.clone()
            .find(".linenr")
            .remove()
            .end()
            .text();
        storage.value = contentCode;
        element.append(storage);
        storage.select();
        storage.setSelectionRange(0, 99999);
        document.execCommand("copy");
        $(storage).remove();
    });

    /**
     * 根据当前高亮的 TOC 链接，仅展开其所属一级目录下的子级列表。
     * @param {JQuery} activeLink 当前应高亮的 a 元素；为空则收起所有子级。
     */
    function syncTocBranchForActiveLink(activeLink) {
        var rootLis = $("#text-table-of-contents > ul > li");
        rootLis.removeClass("toc-branch-open");
        if (activeLink && activeLink.length) {
            var l1Li = activeLink.closest("#text-table-of-contents > ul > li");
            if (l1Li.length) {
                l1Li.addClass("toc-branch-open");
            }
        }
    }

    $("div#text-table-of-contents ul li a").click(function (event) {
        var anchors = $("body").find("h2,h3");
        for (var i = 0; i < anchors.length; i++) {
            var forelemet = $(
                'div#text-table-of-contents ul li a[href="#' +
                    $(anchors[i]).attr("id") + '"]',
            );
            forelemet.removeClass("active");
        }
        var v = $(event.target);
        v.addClass("active");
        currentt = v.attr("href");
        syncTocBranchForActiveLink(v);
    });

    function updateTocActiveByScroll() {
        var scrollTop = $(document).scrollTop();
        var anchors = $("body").find("h2,h3");
        if (!anchors.length) {
            syncTocBranchForActiveLink(null);
            return;
        }

        // 取“视口上方最近”的标题，避免刷新后 active 丢失或随机。
        var offsetTop = scrollTop + 80;
        var activeIndex = 0;
        for (var i = 0; i < anchors.length; i++) {
            if ($(anchors[i]).offset().top <= offsetTop) {
                activeIndex = i;
            } else {
                break;
            }
        }

        $("div#text-table-of-contents ul li a").removeClass("active");
        var activeHeading = $(anchors[activeIndex]);
        var activeSelector =
            'div#text-table-of-contents ul li a[href="#' +
            activeHeading.attr("id") +
            '"]';
        var activeLink = $(activeSelector);
        if (!activeLink.length) {
            syncTocBranchForActiveLink(null);
            return;
        }
        activeLink.addClass("active");
        syncTocBranchForActiveLink(activeLink);
        currentt = activeLink.attr("href");
        currentHeight = activeLink.offset().top;
        $("#table-of-contents").scrollTop(currentHeight / 18);
    }

    $(window).scroll(updateTocActiveByScroll);

    /**
     * 按当前滚动位置初始化 TOC 选中状态。
     */
    function initTocActiveStateByScroll() {
        $("div#text-table-of-contents ul li a").removeClass("active");
        updateTocActiveByScroll();
    }

    document.querySelector("input[id=switch]").addEventListener(
        "change",
        function () {
            setTheme(this.checked ? "dark" : "light");
        },
    );

    $(".btncheck").click(function (ev) {
        if ($("#table-of-contents").css("animation").indexOf("moveout") == -1) {
            $(".btncheck").css("transform", "translateX(-238px)");
            $(".btncheck").css("animation", "moveout 0.2s");

            $("#table-of-contents").css("transform", "translateX(-240px)");
            $("#table-of-contents").css("animation", "moveout 0.2s");

            $("#content").css("padding-left", "0px");
            $("#content").css("transition", "padding-left 0.1s ease");

            $("#preamble").css("transform", "translateX(-240px)");
            $("#preamble").css("animation", "moveout 0.2s");

            $(".previousButton").css("transform", "translateX(-240px)");
            $(".previousButton").css("animation", "moveout 0.2s");
        } else {
            $(".btncheck").css("animation", "movein 0.2s");
            $(".btncheck").css("transform", "translateX(0px)");

            $("#table-of-contents").css("animation", "movein 0.2s");
            $("#table-of-contents").css("transform", "translateX(0px)");

            $("#content").css("padding-left", "240px");
            $("#content").css("transition", "padding-left 0.1s ease");

            $("#preamble").css("animation", "movein 0.2s");
            $("#preamble").css("transform", "translateX(0px)");

            $(".previousButton").css("animation", "movein 0.2s");
            $(".previousButton").css("transform", "translateX(0px)");
        }
    });

    // 首次渲染后按滚动位置同步 TOC（兼容浏览器恢复滚动位置的时机）。
    initTocActiveStateByScroll();
    requestAnimationFrame(initTocActiveStateByScroll);
    setTimeout(initTocActiveStateByScroll, 80);
    setTimeout(initTocActiveStateByScroll, 220);
}

/** 设置动画效果 */
function trans() {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
}

/** 切换明暗模式；保留该函数以兼容右上角 DAY / NIGHT 开关 */
function setTheme(theme) {
    applyTheme(currentThemeId, theme);
}

// 初始化在 $(document).ready 中执行（确保主题面板已经创建）

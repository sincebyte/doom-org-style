/*
 * Set the theme before first paint to avoid a flash of the default palette.
 * scroll.js is loaded in <head>, so this runs before <body> is parsed.
 */
(function initTheme() {
    var stored = localStorage.getItem("doomToggleStyle");
    if (stored !== "light" && stored !== "dark") {
        stored =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        localStorage.setItem("doomToggleStyle", stored);
    }
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(stored);
})();

$(document).ready(function () {
    createThemeToggle();
    createSidebarToggle();
    markCodeLanguages();
    bindEvent();
    createShiftButton();
    delma();
    removeBoxDrawingChars();
    wrapAsciiArrowChars();
    addVerbatimClass();
});

function markCodeLanguages() {
    document
        .querySelectorAll(".org-src-container > pre.src")
        .forEach(function (pre) {
            var label = window.getComputedStyle(pre, "::before").content;
            var hasLabel =
                label &&
                label !== "none" &&
                label !== "normal" &&
                label !== '""';
            if (!hasLabel) {
                pre.classList.add("no-lang");
            }
        });
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
        `<div class="previousButton unselectable" onclick="prevOutline()" title="Previous section"><span>←</span></div>`;
    let nextButton =
        `<div class="nextButton unselectable" onclick="nextOutline()" title="Next section"><span>→</span></div>`;
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

function createThemeToggle() {
    var isDark = document.documentElement.classList.contains("dark");
    let dom = `
      <button class="theme-toggle" id="theme-toggle" type="button"
              title="Toggle theme" aria-label="Toggle color theme"
              aria-pressed="${isDark}">
        <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
        <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
        </svg>
      </button>`;

    $("body").append(dom);
}

function createSidebarToggle() {
    let dom = `<button class="btncheck unselectable" type="button"
                       title="Toggle sidebar" aria-label="Toggle sidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M15 6l-6 6 6 6"/>
        </svg>
      </button>`;

    $("body").append(dom);
}

/* 绑定界面操作事件*/
function bindEvent() {
    var currentt = true;
    let currentHeight = 0;

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
        var anchors = $("body").find("h2[id],h3[id]");
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
        var anchors = $("body").find("h2[id],h3[id]");
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

    $("#theme-toggle").on("click", function () {
        var next = document.documentElement.classList.contains("dark")
            ? "light"
            : "dark";
        setTheme(next);
        $(this).attr("aria-pressed", next === "dark");
    });

    $(".btncheck").on("click", function () {
        document.body.classList.toggle("toc-collapsed");
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

/** 设置主题色 */
function setTheme(theme) {
    theme = theme === "dark" ? "dark" : "light";
    var root = document.documentElement;
    root.classList.add("theme-transition");
    window.clearTimeout(window.__themeTransitionTimer);
    window.__themeTransitionTimer = window.setTimeout(function () {
        root.classList.remove("theme-transition");
    }, 280);
    root.classList.add(theme);
    root.classList.remove(theme === "light" ? "dark" : "light");
    localStorage.setItem("doomToggleStyle", theme);
}

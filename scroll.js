$(document).ready(function () {
    if (
        localStorage.getItem("doomToggleStyle") === "null" ||
        localStorage.getItem("doomToggleStyle") === null
    ) {
        localStorage.setItem("doomToggleStyle", "light");
        window.location.reload();
    }
    createCheckbox();
    bindEvent();
    createShiftButton();
    delma();
    removeBoxDrawingChars();
});

function delma() {
    const elementsWithLinenClass = document.querySelectorAll(".linenr");
    elementsWithLinenClass.forEach((element) => {
        let textContent = element.textContent;
        textContent = textContent.replace(/: /g, "");
        element.textContent = textContent;
    });
}

function removeBoxDrawingChars() {
    const codeBlocks = document.querySelectorAll(
        ".org-src-container pre, .org-src-container pre *",
    );
    codeBlocks.forEach((element) => {
        if (element.childNodes) {
            element.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = node.textContent.replace(
                        /[│┃┇┆┋┇]/g,
                        "",
                    );
                }
            });
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
    let dom = `<!-- From Uiverse.io by Madflows -->
              <div class="toggle-switch">
                <label class="switch-label">
                  <input type="checkbox" class="checkbox" id="switch" ${(isChecked ==
            "dark"
        ? "checked"
        : "")} name="mode">
                  <span class="slider"></span>
                </label>
              </div>`;

    let buttomcheck =
        `<div class="btncheck"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="30" viewBox="0 -5 48 50">
<circle cx="24" cy="24" r="20" fill="#9575cd"></circle><path fill="#5e35b1" d="M24,45C12.42,45,3,35.579,3,24S12.42,3,24,3s21,9.421,21,21S35.58,45,24,45z M24,5 C13.523,5,5,13.523,5,24s8.523,19,19,19s19-8.523,19-19S34.477,5,24,5z"></path><path fill="#fff" d="M34.824,32.823c0,1.492-3.606,3.039-4.379,3.26c-2.21,0.635-3.951,0.926-6.217,0.926 c-1.395,0-2.228,0-5.228,0c3.319-0.422,7.589-1.244,10-2c0.883-0.277,0.593-0.964,0-1c-3.962-0.241-12.181-0.545-14.746-3.023 c-0.718-0.691-1.077-1.506-1.077-2.404c0-3.868,7.363-5.084,10.761-5.429c-4.061-1.381-7.639-4.365-7.639-6.037 c0-1.575,1.825-2.693,5.127-2.693c3.225,0,8.058-0.319,8.113-0.333c1.119-0.221,1.323-0.193,1.326-0.663 c-0.014-0.207-0.539-0.525-1.285-0.525c0,0-4.579,0.106-5.579,0.106c3.253-1.074,5.187-2.496,7.301-1.861 c1.202,0.359,2.058,1.202,2.266,2.266c0.207,1.036,0.041,1.879-0.47,2.5c-0.939,1.133-6.037,1.101-7.097,1.095 c-1.25-0.008,2,0-2,0c-1.731,0-3.833,0.143-3.051,1.507c0.077,0.134,1.051,1.128,2.418,1.943c1.81,1.091,7.615,2.874,7.684,2.901 c0.11,0.055,0.193,0.166,0.18,0.304c-0.014,0.124-0.111,0.235-0.249,0.262c-4.421,0.884-11.314,3.053-10.969,5.125 c0.29,1.699,3.44,2.5,8.869,2.293h0.29C31.909,31.345,34.824,31.456,34.824,32.823z"></path>
</svg></div>`;

    $("body").append(dom);
    $("body").append(buttomcheck);
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

/** 设置主题色 */
function setTheme(theme) {
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(
        theme === "light" ? "dark" : "light",
    );
    localStorage.setItem("doomToggleStyle", theme);
}

//初始化主题
setTheme(localStorage.getItem("doomToggleStyle"));

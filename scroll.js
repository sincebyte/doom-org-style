$(document).ready(function () {
  createCheckbox();
  bindEvent();
});

/* 创建主题切换按钮*/
function createCheckbox() {
  var isChecked = localStorage.getItem("doomToggleStyle");
  let dom = `<div class="toggletheme">
              <input class="container_toggle" type="checkbox" id="switch"  ${(isChecked=='dark' ? 'checked' : '')} name="mode" />
             <label for="switch">切换</label>
            </div>`;

  $('body').append(dom);
}

/* 绑定界面操作事件*/
function bindEvent() {
  var currentt = true;

  $('div.org-src-container').before().click(function (ev) {
    const element = $(this);
    const storage = document.createElement('textarea');
    const contentCode = element.clone()
      .find('.linenr')
      .remove()
      .end()
      .text();
    storage.value = contentCode;
    element.append(storage);
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand('copy');
    $(storage).remove();
  });

  $("div#text-table-of-contents ul li a").click(function (event) {
    var anchors = $('body').find('h2,h3');
    for (var i = 0; i < anchors.length; i++) {
      var forelemet = $('div#text-table-of-contents ul li a[href="#' + $(anchors[i]).attr('id') + '"]');
      forelemet.removeClass("active");
    }
    var v = $(event.target);
    v.addClass("active");
    currentt = v.attr("href");
  });


  $(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('h2,h3');
    for (var i = 0; i < anchors.length; i++) {
      var forelemet = $('div#text-table-of-contents ul li a[href="#' + $(anchors[i]).attr('id') + '"]');
      if (forelemet.attr("href") === undefined) continue;
      // console.info("currentt" + currentt + ",forelemet.attr" + forelemet.attr("href"));
      if (scrollTop > $(anchors[i]).offset().top - 50 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 50) {
        forelemet.addClass("active");
        currentt = forelemet.attr("href");
        currentHeight = forelemet.offset().top;
        $('#table-of-contents').scrollTop(currentHeight / 18);
      } else if (currentt !== forelemet.attr("href")) {
        forelemet.removeClass("active");
      }
    }
  });

  document.querySelector("input[id=switch]").addEventListener("change", function () {
    setTheme(this.checked ? "dark" : 'light');
  });
}

/** 设置动画效果 */
function trans() {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

/** 设置主题色*/
function setTheme(theme) {
  document.documentElement.classList.add(theme);
  document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
  localStorage.setItem("doomToggleStyle", theme);
}

//初始化主题
setTheme(localStorage.getItem("doomToggleStyle"));

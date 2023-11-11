$(document).ready(function () {
  if (localStorage.getItem("doomToggleStyle") === 'null' || localStorage.getItem("doomToggleStyle") === null) {
    localStorage.setItem("doomToggleStyle", "light");
    window.location.reload();
  }
  createCheckbox();
  bindEvent();
});

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

/* 创建主题切换按钮*/
function createCheckbox() {
  var isChecked = localStorage.getItem("doomToggleStyle");
  let dom = ` <div class="toggletheme">
              <span class="white_icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon light"><defs><style>.sun_svg__a{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}</style></defs><circle cx="12" cy="12" r="4.5" class="sun_svg__a"></circle><path d="M12 .75V4.5M12 19.5v3.75M23.25 12H19.5M4.5 12H.75M20.25 3.75l-3 3M6.75 17.25l-3 3M20.25 20.25l-3-3M6.75 6.75l-3-3" class="sun_svg__a"></path></svg>
              </span>
                <input class="container_toggle" type="checkbox" id="switch"  ${(isChecked == 'dark' ? 'checked' : '')} name="mode" />
                <label for="switch">切换</label>
<span class="night_icon">
              <svg xmlns="http://www.w3.org/2000/svg" id="moon_svg__Regular" viewBox="0 0 24 24" class="svg-icon dark"><defs><style>.moon_svg__cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px}</style></defs><path d="M17.235 15.75A9.752 9.752 0 0 1 7.91 3.151a9.746 9.746 0 1 0 13.4 11.7 9.689 9.689 0 0 1-4.075.899ZM11.985 3.75h4.5M14.235 1.5V6M18.735 8.25h3M20.235 6.75v3" class="moon_svg__cls-1"></path></svg>
              </span>
              </div>
              `;

  let buttomcheck = `<div class="btncheck">📎</div>`;

  $('body').append(dom);
  $('body').append(buttomcheck);
}

/* 绑定界面操作事件*/
function bindEvent() {
  var currentt = true;


  $('div.org-src-container').before().hover(function (ev) {
    if(ev.target.nodeName === 'DIV'){
      $(ev.target).addClass('hover-btn-style');
    }
  }, function (ev) {
    if(ev.target.nodeName === 'DIV'){
      $(ev.target).removeClass('hover-btn-style');
    }
  });

  $('div.org-src-container').before().click(function (ev) {
    if(ev.target.nodeName === 'DIV'){
      $(ev.target).addClass('click-btn-style');
      setTimeout(function(){
        $(ev.target).removeClass('click-btn-style');
      }, 5000);
    }
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


  $('.btncheck').click(function (ev) {
      if( $('#table-of-contents').css("animation").indexOf("moveout") == -1){
        $('.btncheck').css('transform','translateX(-238px)');
        $('.btncheck').css('animation','moveout 0.2s');

        $('#table-of-contents').css('transform','translateX(-240px)');
        $('#table-of-contents').css('animation','moveout 0.2s');

        $('#content').css('padding-left','0px');
        $('#content').css('transition','padding-left 0.1s ease');
      } else {
        $('.btncheck').css('animation','movein 0.2s');
        $('.btncheck').css('transform','translateX(0px)');

        $('#table-of-contents').css('animation','movein 0.2s');
        $('#table-of-contents').css('transform','translateX(0px)');

        $('#content').css('padding-left','240px');
        $('#content').css('transition','padding-left 0.1s ease');
      }
  })


}

/** 设置动画效果 */
function trans() {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

/** 设置主题色 */
function setTheme(theme) {
  document.documentElement.classList.add(theme);
  document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
  localStorage.setItem("doomToggleStyle", theme);
}

//初始化主题
setTheme(localStorage.getItem("doomToggleStyle"));

$(document).ready(function () {
  if (localStorage.getItem("doomToggleStyle") === 'null' || localStorage.getItem("doomToggleStyle") === null) {
    localStorage.setItem("doomToggleStyle", "light");
    window.location.reload();
  }
  createCheckbox();
  bindEvent();
  createShiftButton();
});

function nextOutline(){
  // find level 1
  var links = $("#text-table-of-contents > ul > li > a");
  for(var nodeIndex = 0; nodeIndex < links.length; nodeIndex++){
    var href = $(links[nodeIndex+1]).attr("href");
    if($(links[nodeIndex]).attr("class") === "active" && nodeIndex < links.length - 1){
      $(links[nodeIndex + 1 ]).click();
      window.location = href;
      return;
    }
  }
  // find level 2
  var l2activelink = $("#text-table-of-contents > ul > li > ul .active");
  var currentHref = l2activelink.parent().parent().parent().find("a:first").attr("href");
  for(var nodeIndex = 0; nodeIndex < links.length; nodeIndex++){
    href = $(links[nodeIndex]).attr("href");
    if(currentHref === href){
      $(links[nodeIndex + 1 ]).click();
      window.location = $(links[nodeIndex + 1 ]).attr("href");
      return;
    }
  }
}

function prevOutline(){
  // find level 1
  var links = $("#text-table-of-contents > ul > li > a");
  for(var nodeIndex = 0; nodeIndex < links.length; nodeIndex++){
    var href = $(links[nodeIndex-1]).attr("href");
    if($(links[nodeIndex]).attr("class") === "active" && nodeIndex > 0){
      $(links[nodeIndex - 1]).click();
      window.location = href;
      return;
    }
  }

  // find level 2
  var l2activelink = $("#text-table-of-contents > ul > li .active");
  var currentHref = l2activelink.parent().parent().parent().find("a:first").attr("href");
  for(var nodeIndex = 0; nodeIndex < links.length; nodeIndex++){
    var href = $(links[nodeIndex]).attr("href");
    if(currentHref === href){
      $(links[nodeIndex]).click();
      window.location = href;
      return;
    }
  }
}

function createShiftButton() {
  let previousButton = `<div class="previousButton unselectable" onclick="prevOutline()"><span>＜</span></div>`;
  let nextButton = `<div class="nextButton unselectable" onclick="nextOutline()"><span>＞</span></div>`;
  // $('#table-of-contents').after(previousButton);
  // $('#content').append(nextButton);
}


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

  let buttomcheck = `<div class="btncheck"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="30" viewBox="0 -5 48 50">
<circle cx="24" cy="24" r="20" fill="#9575cd"></circle><path fill="#5e35b1" d="M24,45C12.42,45,3,35.579,3,24S12.42,3,24,3s21,9.421,21,21S35.58,45,24,45z M24,5 C13.523,5,5,13.523,5,24s8.523,19,19,19s19-8.523,19-19S34.477,5,24,5z"></path><path fill="#fff" d="M34.824,32.823c0,1.492-3.606,3.039-4.379,3.26c-2.21,0.635-3.951,0.926-6.217,0.926 c-1.395,0-2.228,0-5.228,0c3.319-0.422,7.589-1.244,10-2c0.883-0.277,0.593-0.964,0-1c-3.962-0.241-12.181-0.545-14.746-3.023 c-0.718-0.691-1.077-1.506-1.077-2.404c0-3.868,7.363-5.084,10.761-5.429c-4.061-1.381-7.639-4.365-7.639-6.037 c0-1.575,1.825-2.693,5.127-2.693c3.225,0,8.058-0.319,8.113-0.333c1.119-0.221,1.323-0.193,1.326-0.663 c-0.014-0.207-0.539-0.525-1.285-0.525c0,0-4.579,0.106-5.579,0.106c3.253-1.074,5.187-2.496,7.301-1.861 c1.202,0.359,2.058,1.202,2.266,2.266c0.207,1.036,0.041,1.879-0.47,2.5c-0.939,1.133-6.037,1.101-7.097,1.095 c-1.25-0.008,2,0-2,0c-1.731,0-3.833,0.143-3.051,1.507c0.077,0.134,1.051,1.128,2.418,1.943c1.81,1.091,7.615,2.874,7.684,2.901 c0.11,0.055,0.193,0.166,0.18,0.304c-0.014,0.124-0.111,0.235-0.249,0.262c-4.421,0.884-11.314,3.053-10.969,5.125 c0.29,1.699,3.44,2.5,8.869,2.293h0.29C31.909,31.345,34.824,31.456,34.824,32.823z"></path>
</svg></div>`;

  // $('body').append(dom);
  // $('body').append(buttomcheck);
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

  function scrollbind() {
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
  }

  // document.querySelector("input[id=switch]").addEventListener("change", function () {
  //   setTheme(this.checked ? "dark" : 'light');
  // });


  $('.btncheck').click(function (ev) {
      if( $('#table-of-contents').css("animation").indexOf("moveout") == -1){
        $('.btncheck').css('transform','translateX(-238px)');
        $('.btncheck').css('animation','moveout 0.2s');

        $('#table-of-contents').css('transform','translateX(-240px)');
        $('#table-of-contents').css('animation','moveout 0.2s');

        $('#content').css('padding-left','0px');
        $('#content').css('transition','padding-left 0.1s ease');

        $('#preamble').css('transform','translateX(-240px)');
        $('#preamble').css('animation','moveout 0.2s');

        $('.previousButton').css('transform','translateX(-240px)');
        $('.previousButton').css('animation','moveout 0.2s');
      } else {
        $('.btncheck').css('animation','movein 0.2s');
        $('.btncheck').css('transform','translateX(0px)');

        $('#table-of-contents').css('animation','movein 0.2s');
        $('#table-of-contents').css('transform','translateX(0px)');

        $('#content').css('padding-left','240px');
        $('#content').css('transition','padding-left 0.1s ease');

        $('#preamble').css('animation','movein 0.2s');
        $('#preamble').css('transform','translateX(0px)');

        $('.previousButton').css('animation','movein 0.2s');
        $('.previousButton').css('transform','translateX(0px)');
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

$(document).ready(function() {
  var currentt = true;
  $(window).scroll(function() {
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

  $("div#text-table-of-contents ul li a").click(function(event) {
    var anchors = $('body').find('h2,h3');
    for (var i = 0; i < anchors.length; i++) {
      var forelemet = $('div#text-table-of-contents ul li a[href="#' + $(anchors[i]).attr('id') + '"]');
      forelemet.removeClass("active");
    }
    var v = $(event.target);
    v.addClass("active");
    currentt = v.attr("href");
  });

});

jQuery( document).ready(function($){
    var copyid = 0;
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
  $('body').append('<div class="toggletheme"><input class="container_toggle" type="checkbox" id="switch" name="mode" /> <label for="switch">切换</label></div>');
  var checkbox = document.querySelector("input[id=switch]");

  checkbox.addEventListener("change", function () {
    // dark
    if (this.checked) {
      trans();
      document.documentElement.classList.add("dark");
    } else {
      // light
      trans();
      document.documentElement.classList.remove("dark");
    }
  });

  let trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  };
});

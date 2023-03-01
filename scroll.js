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
    $('.org-src-container').before().click(function (ev) {
        console.log(111);
        ev.preventDefault();
        var $copyButton = $(this);
        $pre = $(document).find('pre[data-copyid=' + $copyButton.data('copytarget' ) + ']');
        if ( $pre.length ) {
            var textArea = document.createElement("textarea");

            // Place in top-left corner of screen regardless of scroll position.
            textArea.style.position = 'fixed';
            textArea.style.top = 0;
            textArea.style.left = 0;

            // Ensure it has a small width and height. Setting to 1px / 1em
            // doesn't work as this gives a negative w/h on some browsers.
            textArea.style.width = '2em';
            textArea.style.height = '2em';

            // We don't need padding, reducing the size if it does flash render.
            textArea.style.padding = 0;

            // Clean up any borders.
            textArea.style.border = 'none';
            textArea.style.outline = 'none';
            textArea.style.boxShadow = 'none';

            // Avoid flash of white box if rendered for any reason.
            textArea.style.background = 'transparent';

            //Set value to text to be copied
            textArea.value = $pre.html();

            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                $copyButton.text( 'Copied').prop('disabled', true);;
            } catch (err) {
                $copyButton.text( 'FAILED: Could not copy').prop('disabled', true);;
            }
            setTimeout(function(){
                $copyButton.text( 'Copy').prop('disabled', false);;
            }, 3000);
        }
    });
});

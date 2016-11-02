var Site = Site || {};
Site.learnMore = (function($, Site) {

  $('document').ready(function(){

    $(window).on('resize', function(e) {
      mobileSlider.init();
    });

    // START: Scroll in to view, only on desktop
    var mobileBreakpoint = 767;
    var w = window.innerWidth;

    if (w > mobileBreakpoint) {
      scrollIntoView.init();
    }
    // START: Scroll in to view, only on desktop

    // Scroll-to links
    $('.scroll-to').on('click', function(event) {
      event.preventDefault();

      // The value of the href
      var $anchor = $(this).attr("href");
      // The height of the sticky header
      var $headerHeight = $('#header').height();

      // Scroll to the anchor
      $('html, body').animate({
        scrollTop: $($anchor).offset().top - $headerHeight
      }, 600);
    });

  });

  var mobileSlider = {
    init: function(){

      var mobileBreakpoint = 767;
      var w = window.innerWidth;
      var slider = '#page-learn-more .mobile-slider';

      // Check if slider is on the page else return
      if (! slider.length) {
        return;
      }

      if (w < mobileBreakpoint) {
        $(slider).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          settings: {
            arrows: false
          }
        });
      } else {
        // Kill the slider at break point
        $(slider).slick('unslick');
      }
    }
  };


  // @TODO: Refactor below
  var scrollIntoView = {
    init: function(){  // Loop through each item

      if (!$('#content.page-learn-more').size()) return;

      $targets = '#learnmore-row4-slidertitle, #learnmore-row4-sliderblock1, #learnmore-row4-sliderblock2, #learnmore-row4-sliderblock3';

      $($targets).each(function( index, element ) {
        var $item = $(this);

        // Check if items are on the page else return
        if (! $item.length) {
          return;
        }
        // Add pre-load class to item
        $item.addClass('scrollin-hide');

      });

      // On document scroll
      $(document).scroll(function() {
        // Variables to work out window height etc
        $windowHeight = $(window).height() -300;
        //$itemTop = $item.offset().top - $windowHeight;

        var item1 = $('#learnmore-row4-slidertitle').offset().top - $windowHeight;
        var item2 = $('#learnmore-row4-sliderblock1').offset().top - $windowHeight;
        var item3 = $('#learnmore-row4-sliderblock2').offset().top - $windowHeight;
        var item4 = $('#learnmore-row4-sliderblock3').offset().top - $windowHeight;

        //var p = $('#elem').offset().top - ($(window).height() / 2);



        // When the item enters a point on the screen
        if (item1 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('#learnmore-row4-slidertitle').removeClass('scrollin-hide');
          $('#learnmore-row4-slidertitle').addClass('scrollin-show');

        }
        if (item2 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('#learnmore-row4-sliderblock1').removeClass('scrollin-hide');
          $('#learnmore-row4-sliderblock1').addClass('scrollin-show');

        }
        if (item3 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('#learnmore-row4-sliderblock2').removeClass('scrollin-hide');
          $('#learnmore-row4-sliderblock2').addClass('scrollin-show');

        }
        if (item4 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('#learnmore-row4-sliderblock3').removeClass('scrollin-hide');
          $('#learnmore-row4-sliderblock3').addClass('scrollin-show');
        }
      });
    }
  };

  // FUNCTION
  // Check if items are on the page else return
  // Loop through each item
  // Add pre-load class to items
  // On document scroll
  // When the item enters a point on the screen
  // Change class on the item to a post-load class instead of pre-load

  // CALL FUNCTION
  // For this instance: if screen width is wider than mobile breakpoint
  // Call the function listing items to target

})(window.jQuery, window.Site);

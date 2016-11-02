$('document').ready(function(){
    $(window).on('resize', function(e) {
      mobileSlider.init();
    });
    imageSlider1.init();
    imageSlider2.init();


    // START: Scroll in to view, only on desktop
    var mobileBreakpoint = 767;
    var w = window.innerWidth;

    if (w > mobileBreakpoint) {
      scrollIntoView2.init();
    }
    // START: Scroll in to view, only on desktop

  });


  var mobileSlider = {
    init: function(){

      var mobileBreakpoint = 767;
      var w = window.innerWidth;
      var slider = '#page-how-to-run .mobile-slider';

      // Check if slider is on the page else return
      if (! slider.length) {
        return;
      }

      if (w < mobileBreakpoint) {
        $(slider).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000
        });
      } else {
        // Kill the slider at break point
        $(slider).slick('unslick');
      }
    }
  };

  var imageSlider1 = {
    init: function(){
      var slider = '#row-second .image-slider .col:first-of-type';

      // Check if slider is on the page else return
      if (! slider.length) {
        return;
      }

      // Create "What others say" image slider
      $(slider).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 6000
      });
    }
  };

  var imageSlider2 = {
    init: function(){
      var slider = '#row-last .image-slider .col:first-of-type';

      // Check if slider is on the page else return
      if (! slider.length) {
        return;
      }

      // Create "Here's 5 steps to get started" image slider
      $(slider).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      });
    }
  };

  // @TODO: Refactor below
  var scrollIntoView2 = {
    init: function(){  // Loop through each item

      if (!$('#content.page-how-to-run').size()) return;

      $targets = '.scroll-in3, .scroll-in4, .scroll-in5, .scroll-in6';

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

        var item3 = $('.scroll-in3').offset().top - $windowHeight;
        var item4 = $('.scroll-in4').offset().top - $windowHeight;
        var item5 = $('.scroll-in5').offset().top - $windowHeight;
        var item6 = $('.scroll-in6').offset().top - $windowHeight;


        // When the item enters a point on the screen
        if (item3 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('.scroll-in3').removeClass('scrollin-hide');
          $('.scroll-in3').addClass('scrollin-show');

        }
        if (item4 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('.scroll-in4').removeClass('scrollin-hide');
          $('.scroll-in4').addClass('scrollin-show');
        }
        if (item5 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('.scroll-in5').removeClass('scrollin-hide');
          $('.scroll-in5').addClass('scrollin-show');
        }
        if (item6 < $(window).scrollTop()) {

          // Change class on the item to a post-load class instead of pre-load
          $('.scroll-in6').removeClass('scrollin-hide');
          $('.scroll-in6').addClass('scrollin-show');
        }
      });
    }
  };


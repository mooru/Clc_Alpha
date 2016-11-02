$(document).ready(function() {

    // $('.episodes-slider').slick({

    // });


var $document = $(document);
  var $range = $('input[type="range"]');
  var $slick = $('.episodes-slider');

  $slick
    .on('init', function() {
      $range.rangeslider({
        polyfill: false
      });
    })
    .slick({
      dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        draggable: true,
        appendArrows: $('.slider-nav-bar'),
        prevArrow: '<span class="icon-arrow_square prev slick-arrow" aria-disabled="false" style="display: block;"><span class="path1"></span><span class="path2"></span></span>',
        nextArrow: '<span class="icon-arrow_square next slick-arrow" style="display: block;" aria-disabled="false"><span class="path1"></span><span class="path2"></span></span>',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

  $document
    .on('mouseenter touchstart touchmove', '.rangeslider', function(e) {
      $slick
        .slick('slickSetOption', 'draggable', false)
        .slick('slickSetOption', 'touchMove', false);
    })
    .on('mouseleave touchend touchcancel', '.rangeslider', function() {
      $slick
        .slick('slickSetOption', 'draggable', true)
        .slick('slickSetOption', 'touchMove', true);
    });




});

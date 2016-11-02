var Site = Site || {};

$(function() {

    $(document).ready(function() {

        // on resize
        $(window).resize(function() {
            // $('img[data-src]').each(function() {
            //     ImageLoader.load(this);
            // });
        });

        // add class to images when loaded
        // $('.content-fill', '#content').imagesLoaded(function() {
        //     $('> img', '.content-fill').addClass('img-loaded');
        // });
        // $('.video-img', '#content').imagesLoaded(function() {
        //     $('> img', '.video-img').addClass('img-loaded');
        // });

        Site.alphaFooter.init();

        $('*[data-backstretch]').each(function() {
            var img = $(this).attr('data-backstretch');
            $(this).backstretch(img);
        });

        // trigger window resize on page load
        $(window).resize();
    });


    $(window).load(function() {
        setTimeout(function() {
            $('body').addClass('dom-loaded');
        }, 500);
    });


    $('body').addClass('dom-ready');

    // Site.config.getDeprecatedConfigs();

    // Universal JS
    // Site.cookieMessage.load();

    // Collection specific JS
    if (Site.collectionType === 'locked-oauth') {

        $(function() {
            Site.lockedOAuth.domLoad();
        });

    }

});

/**
 * Custom video overlay
 */
Site.alphaOverlay = {

    overlayID: 'alpha-overlay',
    content: '',

    /**
     * Prepare overlay with given content
     * @param content
     */
    init: function(opts) {
        this.processing = true;

        var that = this;
        this.opts = {
            content: '',
            container: '#content'
        };
        jQuery.extend(this.opts, opts);

        // rebuild overlay
        this.content = '<div class="overlay-content">' + this.opts.content + '</div>';
        $('#' + this.overlayID, this.opts.container).remove();
        $(this.opts.container).append('<div id="' + this.overlayID + '"><div class="overlay-inner"></div><div class="loader">Loading...</div></div>');

        // save overlay selector
        this.$overlay = $('#' + this.overlayID, this.opts.container);

        // add close button
        this.$overlay.append('<button type="button" class="close-overlay"><span class="icon-cross"></span></button>');

        // bind close button
        $('.close-overlay').on('click', function() {
            that.close();
        });

        $(window).resize(function() {
            setTimeout(function() {
                that.resizeVideo();
            }, 100);
        });
    },

    /**
     * Open overlay
     */
    open: function() {
        var that = this;
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('body').addClass('alpha-overlay-open');
        $('.overlay-content', this.$overlay).remove();
        $('.overlay-inner', this.$overlay).append(this.content);
        $('iframe', this.$overlay).load(function() {
            that.resizeVideo();
        });
    },

    /**
     * Close overlay
     */
    close: function() {
        var that = this;
        $('body').removeClass('alpha-overlay-open');
        $('.overlay-content', this.$overlay).fadeOut(600, function() {
            $(this).remove();
        });
    },

    resizeVideo: function() {
        var $videoWrapper = $('.video-wrapper iframe', this.$overlay);
        if (!$videoWrapper.size()) {
            return;
        }
        var overlayH = this.$overlay.outerHeight();

        $videoWrapper.height(overlayH - 100);
    }
};

/**
 * Alpha footer customizations
 */
Site.alphaFooter = {
    init: function() {
        var that = this;
        this.$footerBlocksGrid = $('.footer-block.grid-item', '#footer');

        // remove nav block if empty
        $('.footer-nav-block').each(function() {
            if (!$('li', $(this)).size()) {
                $(this).remove();
            }
        });

        $('#footer').addClass('grid-items-' + $('.footer-block.grid-item', '#footer').size());
    }
};



/*********************************************************************
 * Legacy code
 *********************************************************************/

function imgLoad() {
    //   load custom video thumbnail
    $('img[data-src]').each(function() {
        $(this).attr("data-load", "true");
        $(this).parent().addClass("content-fill");
    });

    // SS script to reload ImageLoader images
    // Y.all('img[data-src]').each(function(img) {
    //     ImageLoader.load(img);
    // });
}

//set the box size

function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    offsetTop = $(selector).offset().top + verticalOffset;

    var viewport = $('html, body');

    viewport.on("scroll.STE mousedown.STE DOMMouseScroll.STE mousewheel.STE keyup.STE", function(e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            viewport.stop().off('.STE');
        }
    });

    viewport.animate({
        scrollTop: offsetTop
    }, time, 'swing', function() {
        viewport.off('.STE');
    });
}

function loadGoogleMap($map) {

    // Only use when map container is visible on page
    var loc = new google.maps.LatLng($map.data('lat'), $map.data('lng'));

    var mapOptions = {
        zoom: 13,
        center: loc,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($map[0], mapOptions);

    var marker = new google.maps.Marker({
        position: loc,
        map: map
    });

    $map.addClass('google-map-loaded');
    return map;

}

function accordion() {

    var time = 700; // Animation time
    $('.accordion-content').hide();

    function slide($div) {
        $div.addClass('accordion-open').find('.accordion-content').slideDown(time, function() {

            imgLoad();
            scrollToElement($div, time, -200);
            var map = $div.find('.google-map:not(.google-map-loaded)');
            if (map.length)
                setTimeout(function() {
                    loadGoogleMap(map);
                }, 1000);

        });
    }

    $('body').on("click", ".accordion-trigger", function() {

        var that = $(this).parents('.accordion-panel'); // Get panel
        var open = $('.accordion-open');

        if (that.hasClass('accordion-open')) {
            // If this panel is open, close it
            that.removeClass('accordion-open').find('.accordion-content').slideUp(time);

        } else if (open.length) {
            // If other panels are open, close them and open this
            open.removeClass('accordion-open').find('.accordion-content').slideUp(time, slide(that));

        } else {
            // Otherwise, open this panel
            slide(that);
        }

    });

}

function grid($container, $blocks) {

    // This makes sure (along with CSS) that last element takes up remainder of row
    var blockCount = 0;
    $blocks.last().addClass('last');
    $blocks.not('.last').each(function() {
        if ($(this).hasClass('three-wide')) {
            blockCount += 3;
        } else if ($(this).hasClass('two-wide')) {
            blockCount += 2;
        } else {
            blockCount += 1;
        }
    });
    var RmThree = blockCount % 3;
    var RmFour = blockCount % 4;
    $container.addClass('three-' + RmThree);
    $container.addClass('four-' + RmFour);
    ImageLoader.load($blocks.last().find('img')[0]);

    $container.masonry({
        columnWidth: 1
    });

}

function gridjournal($container, $blocks) {

    // This makes sure (along with CSS) that last element takes up remainder of row
    var blockCount = 0;
    $blocks.last().addClass('last');
    $blocks.not('.last').each(function() {
        if ($(this).hasClass('three-wide')) {
            blockCount += 3;
        } else if ($(this).hasClass('two-wide')) {
            blockCount += 2;
        } else {
            blockCount += 1;
        }
    });
    var RmThree = blockCount % 3;
    var RmFour = blockCount % 4;
    $container.addClass('three-' + RmThree);
    $container.addClass('four-' + RmFour);
    ImageLoader.load($blocks.last().find('img')[0]);

    $container.masonry({
        columnWidth: 1
    });

}

function translate() {

    var siteVersionSubfolder = Site.config.local.siteVersion ? Site.config.local.siteVersion + "/" : '';

    $.ajax({
        type: "GET",
        url: "http://s3-eu-west-1.amazonaws.com/trans.alpha.org/" + siteVersionSubfolder + "messages." + Site.config.local.lang + ".xlf",
        dataType: 'XML',
        cache: false
    }).done(function(data) {

        var strings = [];
        $(data).find('body').children('trans-unit').each(function(i, val) {
            strings[i] = $(val).children('target').text();
            //     console.log(i + " " + $(val).children('source').text());
        });

        $('#content').find('.sqs-search-input input[type="text"]').attr('placeholder', strings[3]);

        $('.global .tooltip').text(strings[0]); // Global symbol in nav
        $('.events .tooltip').text(strings[34]); // Global symbol in nav
        // $('#main-block .home-info-more').text(strings[1]);
        $('.run-articles .run-login').text(strings[4]);
        $('.tv-articles .tv-login').text(strings[5]);
        $('.event-register').text(strings[30]);
        $('.event-register').text(strings[30]);
        $('#yfs-title').text(strings[42]);
        $('#yfs-para-1').text(strings[43]);
        $('#yfs-para-2').text(strings[44]);
        $('#yfs-email').text(strings[45]);
        $('#yfs-register').text(strings[47]);
        $('#yfs-go').text(strings[46]);

        $('.translate').each(function(index) {

            var translation = strings[$(this).data('translate')];
            if (translation) {

                var translateType = $(this).data('translate-type');

                if (!translateType) {
                    $(this).text(translation);
                } else if (translateType == "value") {
                    $(this).val(translation);
                } else if (translateType == "placeholder") {
                    $(this).attr('placeholder', translation);
                } else {
                    $(this).text(translation);
                }

            }

        });

        // Find better way
        var $lockedOAuthCompLink = $('#coursesAlphaLink');
        $lockedOAuthCompLink.attr('href',
            $lockedOAuthCompLink.attr('href') + "?lang=" + lang
        );

        invalidEmailMsg = strings[50];
        cannotFindMsg = strings[48];
        followMsg = strings[49];

        //  $('.comment-count > span').text(strings[7]);
        //  $('.comment-btn').text(strings[16]);
        //  $('.preview-comment').text(strings[16]);

        $('.sqs-search-ui-button').click(function() {
            _.defer(function() {
                var sdiv = $('.yui3-searchcontainer');
                sdiv.find('.field-input').attr('placeholder', strings[3]);
                sdiv.find('.search-result-notice').text(strings[2]);
            });
        });

        Site.translation = Site.translation || {};
        Site.translation.strings = strings;

    });

}


$(function() {

    imgLoad();

    $('html').removeClass('no-js');

    // if (typeof lang === "undefined") {
    //     var lang = 'EN';
    // }

    if (typeof lang != "undefined" && lang) {
        translate();
    }

    // Language Switch
    if (typeof languageSwitch != "undefined" && languageSwitch.length > 1) {

        var languageDivs = $('.language-switch').removeClass('hidden'); // Note there are two of these (normal + mobile sidebar)

        _.each(languageSwitch, function(language) {

            var newLinks = $("<a></a>").appendTo(languageDivs);
            newLinks.text(language[0]);
            newLinks.attr('href', language[1]);
            if (language[2] === true) {
                newLinks.addClass('active').click(function(e) {
                    e.preventDefault();
                });
            }

        });

    }

    // Sliding panels
    accordion();

    // Events Icon
    var eventsNav = $('#main-navigation .collection-events, #main-navigation .collection-events-cal').first().hide().children('a');
    if (eventsNav.length) {
        $('#header .nav-icon.events').attr('href', eventsNav.attr('href')).children('.tooltip').text(eventsNav.text());
    } else {
        $('#header .nav-icon.events').remove();
    }

    // Mobile Sidebar
    var sidebar = $('#mobile-sidebar');
    $('#mobile-toggle').on('click', function(e) {
        $(this).toggleClass('open');
        sidebar.toggleClass('open');
    });

    // Mobile Folder
    var folder = $('#mobile-folder');
    if (folder.length) {
        folder.children('.active-title').text(folder.find('.active-link a').text());
        folder.on('click', function() {
            $(this).children('.folder-arrow').toggleClass('rotate');
            $(this).children('ul').slideToggle();
        });
        folder.find('a').on('click', function(e) {
            e.stopPropagation();
        });
    }

    // TV page
    if ($('.page-tv').length) {

        var header = $('#content .tv-header');
        header.height($('#content').width() / 1.77777); //16:9 aspect

        $('.sqs-video-overlay').each(function() {
            // Clone nodes to remove SS event listeners
            var old_element = $(this)[0];
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
            $(new_element).addClass('content-fill').find('img').attr('data-load', 'true');
        });

        $('.tv-articles').on('click', '.sqs-video-wrapper', function() {
            header.children('iframe').remove();
            header.append($(this).data('html'));
            setTimeout(function() {
                // Let video iframe load before animating (performance)
                scrollToElement(header[0], 500, -100);
            }, 400);
        });

    }

    // Journal overview
    if ($('.page-journal-index').length) {
        $('.journal-entry').each(function() {

            // Get category span
            var cat = $(this).find('.category');
            // Format and display string

            var journalIndex = cat.closest('#journal-index');

            var span = journalIndex.find('.' + cat.data('collectionid'));

            cat.text(span.data('pagetitle'));

        });
    }

    // If index
    if ($('.page-journal-index').length) {
        cont = $('#journal-index');
        grid(cont, cont.children());
    }

    // If locked content
    if ($('.collection-type-locked').length) {
        lockedPage();
    }



});

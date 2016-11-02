/* global Site */
/* global moment */
var Site = Site || {};
Site.blog = (function($, Site) {

	$('document').ready(function(){
		list.init();
		post.init();
	});


	var list = {

		init: function(){
			var that = this;
			this.$content = $('#article-list');
			if (!this.$content.size()) {
				return;
			}
			this.$articlesWrapper = $('.others-wrapper', this.$content);
			this.$pagerWrapper = $('.pagination', this.$content);
			this.processArticlesLink($('.new-post', this.$content));
			$('.featured', this.$content).remove();
			this.equalHeight();
			$('.new-post', this.$content).removeClass('new-post');

			this.processPager();
		},

		processPager: function(){
			var $link = $('a.older-posts', this.$content);
			var that = this;

			$link.on('click', function(e){
				e.preventDefault();
				that.loadMore($(this));
			});
		},

		processArticlesLink: function($articles){
			$articles.each(function(){
				if ($('.post-driver', $(this)).size()) {
					var t = $('.translate', $(this)).text();
					if (t!='Read' && t!='Watch') {
						$('.translate', $(this)).text('Read');
					}
				}
				else{
					$(this).append('<a class="post-driver" href="' + $('>a', $(this)).attr('href') + '"><span class="translate">Read</span> ></a>');
				}
			});
		},

		loadMore: function($elem){
			var that = this;
			var nextUrl = $elem.attr('href');
			this.$pagerWrapper.html('<div class="loader-wrapper"><div class="loader translate">Loading...</div></div>');
			$.ajax({
				type: "GET",
				url: nextUrl,
				success: function(data) {
					var $data = $(data);
					var $posts = $(".others-wrapper", $data);
					$('.featured', $posts).remove();
					var $pager = $(".pagination", $data);
					that.$articlesWrapper.append($posts.html());
					that.$pagerWrapper.html($pager);

					$('img[data-src]:not(.img-loaded)').each(function() {
						ImageLoader.load(this);
					});
					that.processArticlesLink($('.new-post', that.$articlesWrapper));
					that.equalHeight();
					$('.new-post', that.$articlesWrapper).imagesLoaded(function() {
						$('.new-post', that.$articlesWrapper).removeClass('new-post');
					});
					that.processPager();
				}
			});
		},

		equalHeight: function(){
			var h, $post;
			$('article', this.$content).each(function(i){
				if ((i%2)==0) {
					if ($(this).height()>h) {
						$post.height($(this).height());
					}
					else{
						$(this).height(h)
					}
				}
				else {
					$post = $(this);
					h = $post.height();
				}

			});
		}
	};


	var post = {
		init: function(){

			this.$post = $('#blog-post .article-wrapper > article');
			this.$sidebar = $('#blog-post .article-wrapper > aside .sticky');
			this.id = this.$post.attr('data-item-id');
			this.$relatedWrapper = $('.post-related-items-wrapper');

			// remove current post from related
			$('.post-id-' + this.id, this.$relatedWrapper).remove();

			$('.quote-block:first', this.$post).addClass('moved-to-sidebar');
			this.$sidebar.prepend($('.moved-to-sidebar', this.$post).html());

			post.updateStickeSidebar();

			$(window).load(function(){
				$('.ss-social-button').click();
			});

			this.processRelated();

			$('*[data-block-type=2]', this.$post).each(function(i){
				if (!$('h2', $(this)).size() && !$('.first-letter-paragraph', this.$post).size()) {
					$(this).addClass('first-letter-paragraph');
				}
			});
		},

		processRelated: function(){
			if (!$('.posts-slider').size()) {
				return;
			}

			list.processArticlesLink($('.posts-slider article.related-post', this.$relatedWrapper));

			$('.posts-slider', this.$relatedWrapper).slick({
//				dots: true,
//				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 3,
				appendArrows: '.slider-nav-bar',
				prevArrow: '<span class="icon-arrow_square prev"><span class="path1"></span><span class="path2"></span></span>',
				nextArrow: '<span class="icon-arrow_square next"><span class="path1"></span><span class="path2"></span></span>',
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});

			$('input[type="range"]').attr('max', $('.slick-track').width() - $('.posts-slider').width()).rangeslider({

				polyfill: false,

				// Callback function
				onSlide: function(position, value) {
					$('.slick-track').css({
						'left': - value
					});
				}
			});

			$(window).resize(function(){
				setTimeout(function(){
					$('input[type="range"]')
						.attr('max', $('.slick-track').width() - $('.posts-slider').width())
						.rangeslider('update', true);
					$('img[data-src]').each(function() {
						ImageLoader.load(this);
					});
				}, 500);
			});

			$('.posts-slider', this.$content).on('afterChange', function(event, slick, currentSlide, nextSlide){
				var pos = Math.abs($('.slick-track').position().left);
				$('input[type="range"]').val(pos).change();
			});

			var pos = Math.abs($('.slick-track').position().left);
			$('input[type="range"]').val(pos).change();

			post.updateStickeSidebar();

		},

		updateStickeSidebar: function(){
			setTimeout(function(){
				post.$sidebar.sticky({
					topSpacing: 80,
					bottomSpacing: post.$relatedWrapper.height() + $('#footer').height() + 200
				});
			}, 1000);
		}
	};


})(window.jQuery, window.Site);




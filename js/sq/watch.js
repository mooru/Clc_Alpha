/* global Site */
/* global moment */


	$('document').ready(function(){

		list.init();
		episodesSlider.init();

		if (location.hash.indexOf('episode-')>-1) {
			var episodeId = location.hash.replace('episode-', '');
			player.init($('.episode-data', episodeId));

			if (episodesSlider.$content.size()){
				$('.episodes-slider', episodesSlider.$content).slick('slickGoTo', $(episodeId).index());
				episodesSlider.setCurrentEpisode($(episodeId));
			}
		}
		else{
			if (episodesSlider.$content.size()){
				episodesSlider.setCurrentEpisode($('.episode-item:first-child'));
			}
		}

	});

	var videoEmbed = {
		invoke: function(){

			$('body').html(function(i, html) {
				return videoEmbed.convertMedia(html);
			});

		},
		convertMedia: function(html){
			var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
			var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
			var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;

			if(pattern1.test(html)){
				var replacement = '<iframe width="420" height="345" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

				var html = html.replace(pattern1, replacement);
			}


			if(pattern2.test(html)){
				var replacement = '<iframe width="420" height="345" src="//www.youtube.com/embed/$1?autoplay=1&amp;rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
				var html = html.replace(pattern2, replacement);
			}


			if(pattern3.test(html)){
				var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
				var html = html.replace(pattern3, replacement);
			}
			return html;
		}
	};


	var episodesSlider = {
		init: function(){
			this.$content = $('#series-episodes');
			if (!this.$content.size()) return;

			$('.episodes-slider', this.$content).slick({
//				dots: true,
//				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
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

			$('input[type="range"]').attr('max', ($('.slick-track').width() - $('.episodes-slider').width())).rangeslider({

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
						.attr('max', ($('.slick-track').width() - $('.episodes-slider').width()))
						.rangeslider('update', true);
				}, 500);
			});

			$('.episodes-slider', this.$content).on('afterChange', function(event, slick, currentSlide, nextSlide){
				episodesSlider.updateScrollBar();
			});

			episodesSlider.updateScrollBar();

			this.isDragging = false;
			$('.episodes-slider .episode-item', this.$content)
				.mousedown(function() {
					that.isDragging = false;
				})
				.mousemove(function() {
					that.isDragging = true;
				});

			var that = this;
			$('.episodes-slider .episode-item', this.$content).each(function(){
				var $this = $(this);
				$('h4', $this).html(function (i, html) {
					return html.replace(/(\w+\s\w+)/, '<span>$1</span><br/>')
				});

				$this.find('.episode-data').attr('data-series-title', that.$content.attr('data-title'));

				$(this).on('click', function(){
					setTimeout(function(){
						if (!that.isDragging) {
							player.init($this.find('.episode-data'), true);
							that.setCurrentEpisode($this);
						}
					}, 10);

				});
			});

		},

		setCurrentEpisode: function($elem){
			$('.episodes-slider .episode-item', this.$content).removeClass('in-player');
			$elem.addClass('in-player');
		},


		updateScrollBar: function(){
			var pos = Math.abs($('.slick-track').position().left);
			$('input[type="range"]').val(pos).change();
		}
	};

	var list = {
		init: function(){
			var that = this;
			this.$content = $('#watch-index-content, #watch-series-content');
			if (!this.$content.size()) {
				return;
			}

			$('article.video-series', '#series-list').each(function(){
				var $this = $(this);
				$('.video-img', $(this)).on('click', function(){
					if ($this.hasClass('episodes-1')) {
						$('button.watch-episode', $this).click();
					}
					else{
						location.href = $('a.watch-series', $this).attr('href');
					}
				});

				$('button.watch-episode', $(this)).on('click', function(){
					player.init($(this).parent().find('.episode-data'), true);
				});
			});


			player.processVideo();
		}
	};

	var player = {
		init: function($episodeData, play){
			var that = this;

			if (typeof play === 'undefined') {
				play = false;
			}
			var playerHtml = '<div class="watch-episode-inner">' +
				'<div class="video-info-wrapper">' +
				'<div class="video-info">' +
				'<div class="series-title">' + $episodeData.attr('data-series-title') + '</div>' +
				'<h2>' + $episodeData.attr('data-episode-title') + '</h2>' + $episodeData.attr('data-episode-body') +
				'<button type="button" class="play-video play-video-text translate">Watch episode ></button>' +
				'</div></div>' +
				'<div class="video-img">' +
				'<img src="' + $episodeData.attr('data-episode-image') + '?format=750w" />' +
				'<button class="play-video" type="button" data-video-url="' + $episodeData.attr('data-episode-video-url') + '">' +
				'<span class="icon-play_mono"></span>' +
				'</button>' +
				'</div></div>';

			$('#watch-episode').html(playerHtml);
			player.processVideo();
			$("html, body").animate({ scrollTop: 0 }, "slow");

			if (play) {
				setTimeout(function(){
					that.play();
				}, 300);
			}

			location.hash = 'episode-' + $episodeData.attr('data-id');

		},

		/**
		 * Replace video with overlay
		 */
		processVideo: function(){
			var $playButton = $('.video-img .play-video', this.$content);
			var videoUrl = $playButton.attr('data-video-url');
			videoUrl = videoUrl.replace('§', '');

			if (!videoUrl) {
				return;
			}

			var videoHTML = videoEmbed.convertMedia(videoUrl);

			Site.alphaOverlay.init({
				content: '<div class="video-wrapper">' + videoHTML + '</div>',
				container: '#watch-episode .watch-episode-inner'
			});

			$('.play-video', this.$content).on('click', function(){
				Site.alphaOverlay.open();
			});

		},

		play: function(){
			$('.play-video', this.$content).click();
		}
	};







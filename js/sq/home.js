/* global Site */
/* global moment */
var Site = Site || {};
Site.home = (function($, Site) {

	$('document').ready(function(){
		page.init();
	});

	var page = {
		init: function(){
			var that = this;
			this.$content = $('#homepage-content');
			this.image = this.$content.attr('data-img');

			$(window).resize(function(){
				that.contentSize();
			});

			this.contentSize();
			this.processVideo();
		},

		/**
		 * Set the content container height
		 */
		contentSize: function(){
			$('#homepage-content, #homepage-content .table').css({
				'min-height': $(window).height() - $('#header').height()
			});
		},

		/**
		 * Replace video with overlay
		 */
		processVideo: function(){
			var $videoBlock = $('.video-block', '#home-video');
			var $videoTag = $('.sqs-video-wrapper', $videoBlock);
			if (!$videoTag.size()) {
				return;
			}

			var linkText = $('.video-caption', $videoBlock).text();
			$('#home-video').append('<button type="button" class="play-video"><span class="icon-play_mono"></span><em>' + linkText + '</em></button>');

			videoHTML = $videoTag.attr('data-html').replace('?', '?autoplay=1&amp;rel=0&amp;showinfo=0&amp;');
			Site.alphaOverlay.init({
				content: '<div class="video-wrapper">' + videoHTML + '</div>'
			});


			$('.play-video', '#home-video').on('click', function(){
				Site.alphaOverlay.open();
			});

		}
	};


})(window.jQuery, window.Site);








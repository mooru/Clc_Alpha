/* global Site */
/* global moment */
Site.cookieMessage = (function($, Site, Cookies) {
	var exp = {},
		ui = {
			cookieMessage: '#cookieMessage',
			acceptCookiesButton: "#acceptCookies",
			declineCookiesButton: '#declineCookies'
		},
		$ui = {},
		cookieName = "Alpha_EUCookiesAllowed";

	exp.load = function() {
		if (Site.config.local.EUCookieMessageEnabled === true) {

			var cookie = getCookie();

			if (cookie === "true") {
				Site.config.cookies = true;
			} else if (cookie === "false") {
				// Site.config.cookies = false;

				/* Site does not accept declining cookies, only redirect to cookie info page */
				showCookieMessage();
			} else {
				showCookieMessage();
			}

		}
	};

	var getCookie = function() {
		return Cookies.getItem(cookieName);
	};

	var setCookie = function(allowCookie) {
		allowCookie = (allowCookie) ? "true" : "false";
		Cookies.setItem(cookieName, allowCookie, moment().add('days', 30).toDate());
		if (allowCookie === "true") { Site.config.cookies = true; }
	};

	var showCookieMessage = function() {

		function hideCookieMessage() {
			$ui.cookieMessage.hide();
		}

		function cookiesAccepted(e) {
			e.preventDefault();
			setCookie(true);
			hideCookieMessage();
		}

		/*function cookiesDeclined() {
			setCookie(false);
			hideCookieMessage();
		}*/

		$(function() {
			$ui = Site.helpers.getJQueryElements(ui);
			$ui.declineCookiesButton.attr('href', Site.config.local.EUCookieMessageLink);
			$ui.acceptCookiesButton.on('click', cookiesAccepted);
			$ui.cookieMessage.show();
		});

	};

	return exp;
})(window.jQuery, window.Site, window.docCookies);

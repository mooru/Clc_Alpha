var Site = Site || {};
Site.production = true;
Site.config = {
	api: (function() {
			if (Site.production) {
				return {
					courses: "http://courses-api.alpha.org",
					tryCourses: "http://acs.alpha.org/api/rest/v1/courses/getAlphaCourses/",
					OAuth: "https://auth.alpha.org",
					regent: "http://regent-api.alpha.org",
					checkEmail: "http://acs.acs-srv.com/api/rest/v1/courses/hasCourse",
					oAuthClientID: "f6e028c2ab97c5c2d30a304fb783bc15"
				};
			} else {
				return {
					courses: "http://courses-api.develop.alpha.org",
					tryCourses: "http://acs.test.alpha.org/api/rest/v1/courses/getAlphaCourses/",
					OAuth: "https://auth.test.alpha.org",
					regent: "http://regent-api.develop.alpha.org",
					checkEmail: "http://acs.test.alpha.org/api/rest/v1/courses/hasCourse",
					oAuthClientID: "07219ba1a823694d27eddf33660000c8"
				};
			}
		})(),

	// Variables unique to each site. Override these in Squarespace Code Injection
	local: {
		siteVersion: '',
		lang: 'en',
		EUCookieMessageEnabled: false,
		EUCookieMessageLink: "/cookies",
		// Twitter
		twitterPage: "/twitter",
		twitterHashTag: "#TryAlpha",
		// Try page:
		tryPage: "/try",
		tryDefaultCountry: "GB",
		tryDefaultLocation: "London",
    tryDefaultCourseType: "Alpha",
    tryHide: "The Marriage Course,The Marriage Preparation Course,The Parenting Children Course,The Parenting Teenagers Course",
    tryTwelveHourClock: "false",
		// Other pages etc.
		// Locked OAuth page:
		justInterestedGoLink: "/",
		// Splash screen
		splashEnabled: false,
		splashVideoURIs: {
			/* Make sure these are served with correct MIME types ("video/mp4" etc.) */
			tom: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom.ogg"
			},
			sophia: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia.ogg"
			},
			tom_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tom_hd.ogg"
			},
			sophia_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sophia_hd.ogg"
			},
			ali: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali.ogg"
			},
			julius: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius.ogg"
			},
			ali_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_ali_hd.ogg"
			},
			julius_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_julius_hd.ogg"
			},
			james: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james.ogg"
			},
			james_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_james_hd.ogg"
			},
			sam: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam.ogg"
			},
			sam_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_hd.ogg"
			},
			sam_finnish: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish.ogg"
			},
			sam_finnish_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_sam_finnish_hd.ogg"
			},
			teklia: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_teklia.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tekila.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tekila.ogg"
			},
			teklia_hd: {
				mp4: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_teklia_hd.mp4",
				webm: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tekila_hd.webm",
				ogg: "//d2f5i9x228sgrc.cloudfront.net/alpha/alpha-splash-video/alpha_invite_tekila_hd.ogg"
			}
		},
		splashVideo: "tom"
	},

	/*
		Set by cookie-message.js - check this value is true before settings cookies
		False: user has actively declined cookies
		True: user has accepted cookies
	 */
	cookies: null,

	/* Get older config options and set them. Call after header (user) code injection */
	getDeprecatedConfigs: function() {

		/* Old Try defaults */
		if (typeof window.try_country !== "undefined") {
			this.local.tryDefaultCountry = window.try_country;
		}
		if (typeof window.try_city !== "undefined") {
			this.local.tryDefaultLocation = window.try_city;
		}

		/* Old cookie setting */
		if (typeof window.euro_cookie !== "undefined") {
			if (window.euro_cookie === 1) {
				this.local.EUCookieMessageEnabled = true;
			} else {
				this.local.EUCookieMessageEnabled = false;
			}
		}

	}

};
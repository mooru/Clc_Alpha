/* global Site */
/* global moment */
/* global lang */
/*
Check if OAuth token present
	-> If not, get one.
Get users email and check if user has course
	-> If yes -> Show locked content
	-> If no -> Show form
		-> Get form options (locale)
		-> Validate
		-> POST venue
			-> POST course
				-> Show locked content
Fail open - On any ajax failure
	-> Show locked content
*/
Site.lockedOAuth = (function($, _) {

	var apis = Site.config.api;

	var exp = {};
	exp.domLoad = function() {
		init();
	};

	var $coursesFormWrapper,
		$coursesForm;

	// Configure OAuth
	var langQueryString = (typeof lang == "string") ? ("?lang=" + lang) : "";
	jso_configure({
		"alpha": {
			client_id: apis.oAuthClientID,
			redirect_uri: window.location.protocol + "//" + window.location.hostname + window.location.pathname,
			authorization: apis.OAuth + "/oauth/authorize" + langQueryString,
			presenttoken: "qs",
			scope: ["basic", "email"],
			isDefault: true
		}
	});

	var init = function() {

		$coursesFormWrapper = $('.locked-oauth-form-wrapper');
		$coursesForm = $('#lockedOAuthForm');

		// If there is a token - from localstorage or redirect
		if (jso_getToken('alpha')) {

			// Hide the login button and check if user already has course
			$('.locked-oauth-login-form').hide();
			exp.access_token = jso_getToken('alpha');
			checkUserAllowed();

		} else {

			$('#loginButton').on('click', function(e) {
				e.preventDefault();
				// Force get token
				jso_ensureTokens({
					"alpha": ["basic", "email"]
				});
			});

		}

	};

	var failed = function(msg) {
		// Somethings gone wrong. Don't block user?
		if (msg) {
			console.log("Failed: " + String(msg));
		} else {
			console.log("Failed.");
		}
		$('.locked-oauth-main-header, .locked-oauth-login-form, .locked-oauth-form-wrapper, .locked-oauth-overlay').remove();
	};

	var checkUserAllowed = function() {

		var getUserEmail = function(callback) {

			$.oajax({
				url: apis.OAuth + "/oauth2/verify-token",
				type: "GET",
				dataType: 'json',
				jso_provider: "alpha",
				jso_scopes: ["basic"],
				jso_allowia: false,
				cache: false
			}).done(function(data){
				callback(data.username); // Callback with email passed
			}).fail(function(){
				failed("getUserEmail");
			});

		};

		var checkEmail = function(email) {

//			var langCode = (typeof window.lang === "string") ? window.lang : "";
      var countryCode = (typeof window.try_country === "string") ? window.try_country : "";

			$.ajax({
				url: apis.checkEmail + "/" + email + "/alpha/" + countryCode,
				type: "GET",
				dataType: 'json',
				cache: false
			}).done(function(data) {

				if (data.body > 0) {
					userHasCourse();
				} else {
					showForm();
				}

			}).fail(function() {
				failed("checkEmail");
			});

		};

		// Get the users email THEN checkEmail
		if (Site.production) {
			getUserEmail(checkEmail);
		} else {
			// getUserEmail(checkEmail);
			showForm(); // Lets you see form in development
		}

	};

	var userHasCourse = function() { // Unlock the content!
		$('.locked-oauth-form-header, .locked-oauth-overlay').hide();
		$coursesForm.hide();
		$('.locked-oauth-form-complete').show();
	};

	var showForm = function() {

		placeholderPolyfill();
		getFormOptions();
		getOrgs();
		justInterestedModal();
		formValidators();

		$coursesForm.parsley({
			"ui-enabled": true,
			"focus": "first"
		});
		$coursesFormWrapper.show();

		$coursesForm.on('submit', function(e) {
			e.preventDefault();
			_.once(submitForm());
		});

		function placeholderPolyfill() {
			if (window.Modernizr.input.placeholder === false) {
				console.log('No placeholder support');
				$coursesForm.find('input[type="text"]').each(function(index) {
					$(this).val($(this).attr('placeholder'))
							.on('focus.default-text', function() {
								$(this).val('').off('focus.default-text');
							});
				});
			}
		};

		function formValidators() {
			window.ParsleyValidator.addValidator('textDateFuture', function (value, requirement) {
				if (moment(value, requirement).isAfter(moment())) {
					return true;
				}
				return false;
			}, 5);
		}

		function justInterestedModal() {
			var $coursesFormJIModal = $('#justInterestedModal');
			$('#justInterestedGo').attr('href', Site.config.local.justInterestedGoLink);
			$('#formRole').on('change', function() {
				if ($('#justInterested').prop('selected')) {
					$coursesFormJIModal.show();
				} else {
					$coursesFormJIModal.hide();
				}
			});
			$('#justInterestedCancel').on('click', function(e) {
				e.preventDefault();
				$coursesFormJIModal.hide();
				$('#runningAlpha').prop('selected', true);
			});
		}

		function getOrgs() {
			var orgSelect = $('#orgName').hide();
			var orgInput = $('#orgInput');
			var previousAjax;

			orgInput.on('keyup', function(e) {
				orgSelect.removeClass('alreadyCreated');
				var val = orgInput.val();
				if (val != "") {
					_.debounce(searchOrg(val), 400);
				}
			});

			orgSelect.on('change click', function(e) {
				$(this).addClass('alreadyCreated');
				orgInput.val($(this).children(':selected').text());
			});

			function searchOrg(search) {

				previousAjax && previousAjax.abort();
				orgInput.addClass('ajax-loading');

				previousAjax = $.oajax({
					url: apis.regent + "/organisations/search",
					type: "GET",
					dataType: "json",
					data: {
						q: search
					},
					jso_provider: "alpha",
					jso_scopes: ["basic"],
					cache: false
				}).done(function(data, textStatus, xhr){

					orgInput.removeClass('ajax-loading');

					if (xhr.status == 204 || data.length === 0) {
						orgSelect.html('').hide();
						return;
					}

					orgSelect.show();

					addOptionsToForm(
						orgSelect,
						data,
						function(val, key){
							if (val.status == "ACTIVE") {
								return [val.id, val.companyName];
							} else {
								return false;
							}
						}
					);

				});
			}
		}

		function getFormOptions() {

			// Locales
			$.oajax({
				url: apis.courses + "/intl/locales/" + lang,
				type: "GET",
				dataType: 'json',
				jso_provider: "alpha",
				jso_scopes: ["basic"],
				cache: false
			}).done(function(data){

				addOptionsToForm(
					$coursesForm.find('select#courseLang'),
					data.locales,
					function(val, key){
						return [key, val];
					}
				);

			}).fail(function(xhr, status, error){
				failed("getFormOptions - locales");
			});

		}

		var addOptionsToForm = function($selectEl, data, findData) {
			var ops = [];
			_.each(data, function(val, key) {
				var option = findData(val, key);
				if (option) {
					ops.push('<option value="'+ option[0] +'">'+ option[1] +'</option>');
				}
			});
			$selectEl.html(ops.join(""));
		};

	};

	var submitForm = function () {

		$coursesForm.find('input[type="submit"]').prop("disabled", true);

		createOrg(createVenue(createMain));

		function createOrg(callback) {

			if ($('#orgName').hasClass('alreadyCreated')) {
				callback.call();
			} else {

				var newOrgName = $('#orgInput').val();

				$.oajax({
					url: apis.regent + "/organisations",
					type: "POST",
					dataType: 'text',
					data: {
						'organisation[type]': "Church",
						'organisation[companyName]': newOrgName,
						'organisation[status]': "ACTIVE"
					},
					jso_provider: "alpha",
					jso_scopes: ["basic"],
					cache: false
				}).done(function(data, status, xhr) {

					var org_id = "";
					header = xhr.getResponseHeader('Location');
					if (header != null) {
						org_id = _.last(header.split("/"));
					}

					$('#orgName').html('<option value="'+ org_id +'">'+ newOrgName +'</option>');

					callback.call();

				}).fail(function(err) {
					failed("submitForm - POST org");
				});

			}
			
		}

		function createMain() {

			$('#startDate, #endDate').each(function() {
				var date = moment($(this).val(), 'dd/mm/yyyy');
				$(this).val(date.toISOString());
			});

			// TODO figure out why this particular $.oajax doesn't work
			// $.oajax({
			// 	url: coursesURI + "/courses",
			// 	type: 'POST',
			// 	dataType: 'text', // required to trigger .done()
			// 	data: $coursesForm.serialize(),
			// 	jso_provider: "alpha",
			// 	jso_scopes: ["basic"],
			// 	cache: false
			// }).done(function(data) {
			// 	console.log("Post Success!");
			// 	userHasCourse();
			// }).fail(function(err) {
			// 	failed("submitForm - POST course");
			// }).always(function(){
			// 	$('#content')[0].scrollIntoView(true);
			// });
			$.ajax({
				url: apis.courses + "/courses",
				type: 'POST',
				dataType: 'text', // required to trigger .done()
				data: $coursesForm.serialize() + '&access_token=' + jso_getToken('alpha'),
				cache: false
			}).done(function(data) {
				userHasCourse();
			}).fail(function(err) {
				failed("submitForm - POST course");
			}).always(function(){
				$('#content')[0].scrollIntoView(true);
			});

		}

		function createVenue(callback) {
			$.oajax({
				url: apis.courses + "/venues",
				type: 'POST',
				dataType: 'text', // required to trigger .done()
				data: {
					"venue[address1]": $coursesForm.find('#address1').val(),
					"venue[address2]": $coursesForm.find('#address2').val(),
					"venue[town]": $coursesForm.find('#addressTown').val(),
					"venue[postcode]": $coursesForm.find('#addressPS').val()
				},
				jso_provider: "alpha",
				jso_scopes: ["basic"],
				cache: false
			}).done(function(data, status, xhr) {
				header = xhr.getResponseHeader('Location');
				if (header != null) {
					var venue_id = _.last(header.split("/"));
					$coursesForm.find('#venueId').val(venue_id).prop('disabled', false);
				}
				callback.call();
			}).fail(function(err) {
				failed("submitForm - POST venue");
			});
		}

	};

	return exp;
})(window.jQuery, window._);

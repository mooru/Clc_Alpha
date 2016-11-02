
$(document).ready(function() {
		var divHeight = $("#locked-content-div").height();
		var divWidth = $("#locked-content-div").width() + 100;
		$("#locked-overlay-div").height(divHeight);
		$("#locked-overlay-div").width(divWidth);
});



function lockedPage() {

	//check for a valid cookie first
	if (readCookie('yfscookie')=='valid') {
		$('#message').hide();
		$('#message').html("");
  	$('.locked-overlay').hide();
	}

  $('#yfs-go').on('click', function(e){
	  checkEmailField();
  });

  // $('#yfs-login-course').on('click', function(e){
  // 	  var url = "http://courses.alpha.org?lang=" + lang;
  //   window.location = url;
  // });

	$("#yfs-email-check").keypress(function(e) {
	    if(e.which == 13) {
	        checkEmailField();
	    }
	});

}

function checkEmailField(){
  //get the postocode
  var email = $('#yfs-email-check').val();
  // Validation
  if (validateEmail(email)) {
	  checkUser(email, function(num){
      if (num>0) {
				//Success! We have at least one course
				$('#message').hide();
				$('#message').html("");
      	$('.locked-overlay').hide();
				createCookie('yfscookie','valid',7);
      } else {
				$('#message').show();
				$('#message').html(cannotFindMsg + "<br/>" + followMsg);
      	$('.locked-overlay').show();
      }
		});
  } else {
		$('#message').show();
    $('#message').html(invalidEmailMsg);
  }
}


function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
	}
}

function checkUser(email, callback) {
	var type = '/alpha';
	var urlString = 'http://acs.alpha.org/api/rest/v1/courses/hasCourse/';
	//var urlString = 'http://local.acs.alpha.org/api/rest/v1/courses/hasCourse/';

	var num = 0;

	//  dataType: (msie) ? 'text' : 'json'

  $.ajax({
	type: "GET",
  url: urlString + email + type,
  dataType: 'json',
	cache: false,
  }).done(function(data) {
	  $.each(data, function(index, element) {
			if (index=="body") {
				num = element;
				callback(num);
	  	}
    });


  }).fail(function(a,b) {
    $('.try-message.error').show();
  });

}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}



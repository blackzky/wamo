$(document).ready(function() {
	//window.fbAsyncInit = function() {
		FB.init({
			appId      : '398061643641199', // App ID
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
	//};

	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));

	/*
	$("#fb-login").click(function(e){
		e.preventDefault();
		FB.login();
	});
	*/
});

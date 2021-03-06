$(function(){
	$.extend(WorkoutLog, {
		// signup method
		signup: function(){
			//username & password variables
			var username = $("#su_username").val();
			var password = $("#su_password").val();
			// user object
			var user = {
				user: {
					username: username,
					password: password
				}
			};

		//signup post
		var signup = $.ajax({
			type: "POST",
			url: WorkoutLog.API_BASE + "user",
			data: JSON.stringify(user),
			contentType: "application/json"
		});

		//signup done/fail
		signup.done(function(data){
			if(data.sessionToken){
				WorkoutLog.setAuthHeader(data.sessionToken);
				console.log("Thanks for being my friend and signing up successfully.")
				console.log(data.sessionToken);
				WorkoutLog.definition.fetchAll();
				WorkoutLog.log.fetchAll();				
			}
			$("#signup-modal").modal("hide");
			$(".disabled").removeClass("disabled");
			$("#loginout").text("Logout");
			console.log("Great job signing up!");
			$('a[href="#define"]').tab("show");

			$("#su_username").val("");
			$("#su_password").val("");

			})

			.fail(function(){
				$("#su_error").text("There was an issue with sign up").show();
		});
	},
		// login method
		login: function(){
			// login variables
			var username = $("#li_username").val();
			var password = $("#li_password").val();
			var user = {
				user: {
					username: username,
					password: password
				}
			};

			// local POST
			var login = $.ajax({
				type: "POST",	
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
			});

			// login done/fail
			login.done(function(data){
				if(data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken);
					WorkoutLog.definition.fetchAll();
					WorkoutLog.log.fetchAll();
				}

				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");
				$("li_username").val("");
				$("li_password").val("");
				$('a[href="#define"]').tab("show");
			})

			.fail(function(){
				$("#li_error").text("There was an issue with sign up").show();
			});
		},

		//loginout method
		loginout: function(){
			if(window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
			//TODO: on logout make sure stuff is disabled
		}
	}),


	// bind events
	$("#login").on("click", WorkoutLog.login);
	$("#signup").on("click", WorkoutLog.signup);
	$("#loginout").on("click", WorkoutLog.loginout);

	if(window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}


});
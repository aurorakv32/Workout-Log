$(document).ready(function(){
	// this ensures that jquery is running when test api is clicked
	$("#testAPI").on("click", function(){
		console.log("It is working");
	});

	// GET request from localhost:3000
	var test = $.ajax({
		type: 'GET',
		// getting data from the server
		url: "http://localhost:3000/api/test"
	});

	// when test is done running, console log the data returned
	test.done(function(data){
		console.log(data);
	});
	
	// if the test fails, console an error msg
	test.fail(function(){
		console.log("Oh no!!");
	});
});
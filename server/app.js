var express = require('express');
var app = express();

// this allows the app to use the headers file in the middleware folder
app.use(require('./middleware/headers'));

// this is a test function
app.use('/api/test', function(req, res){
	res.send("Hello World");
});


// this shows that the 3000 port is open and active
app.listen(3000,function(){
	console.log("app is listening on 3000");
});


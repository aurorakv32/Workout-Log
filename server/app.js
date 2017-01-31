var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import(__dirname + '/models/user');


//creates the table in postgres
//matches the model we defined
//Doesn't drop the db
 
User.sync();

// *******DANGER: drops the table completely(line 27-ish)******
// User.sync({ force: true });

app.use(bodyParser.json());

// this allows the app to use the headers file in the middleware folder
app.use(require('./middleware/headers'));

app.use('/api/user', require('./routes/user'));

//login route
app.use('/api/login', require('./routes/session'));

// this is a test function
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

// this shows that the 3000 port is open and active
app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

app.post('/api/user', function(req, res) {
	// when we post to api user, it will want a user object in the body
		var username = req.body.user.username;
		var pass = req.body.user.password;
		//Need to create a user object and use sequelize to put that user into
	 	//to put that user into our database.
 		// match the model we create above
 		// Sequelize - take the user model and go out to the db and create this:

		User.create({
			username: username,
			passwordhash: ""
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				res.json({
						user: user,
						message: 'created'
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
	});





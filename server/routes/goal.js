var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');
var Goal = sequelize.import('../models/goal');

router.post('/', function(req, res){
	// variables
	var description = req.body.goal.desc;
	var result = req.body.goal.result;
	var owner = req.user.id;

	//methods
	Goal
		// objects must match the model
		.create({
			description: description,
			result: result,
			owner: owner
		})
		.then(
			// createSucces function
			function createSuccess(goal){
				// send a response as JSON
				res.json(goal);
			},
			//createError function
			function createError(err){
				res.send(500, err.message);
			}
		);
});


module.exports = router;
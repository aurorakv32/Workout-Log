var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');

router.post('/', function(req, res){
	// variables
	var description = req.body.log.desc;
	var result = req.body.log.result;
	var user = req.user;
	var definition = req.body.log.def;

	//methods
	Log
		// objects must match the model
		.create({
			description: description,
			result: result,
			owner: user.id,
			def: definition
		})
		.then(
			// createSucces function
			function createSuccess(log){
				// send a response as JSON
				res.json(log);
			},
			//createError function
			function createError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/', function(req, res){
	//user variable
	var userid = req.user.id;

	Log
	//findAll by owner method
	.findAll({
		where: {owner: userid}
	})
	.then(
		//success
		function findAllSuccess(data){
			//console.log(data);
			res.json(data);
		},

		//error
		function findAllError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;
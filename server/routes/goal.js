var router = require('express').Router();
var sequelize = require('../db');
// var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
// var Definition = sequelize.import('../models/definition');
var Goal = sequelize.import('../models/goal');

router.post('/', function(req, res){
	// variables
	var description = req.body.goal.desc;
	var result = req.body.goal.result;
	var user = req.user;

	//methods
	Goal
		// objects must match the model
		.create({
			description: description,
			result: result,
			owner: user.id
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

// router.get('/', function(req, res){
// 	//user variable
// 	var userid = req.user.id;

// 	Log
// 	//findAll by owner method
// 	.findAll({
// 		where: {owner: userid}
// 	})
// 	.then(
// 		//success
// 		function findAllSuccess(data){
// 			//console.log(data);
// 			res.json(data);
// 		},

// 		//error
// 		function findAllError(err){
// 			res.send(500, err.message);
// 		}
// 	);
// });

// This will retrieve one workout specified by the log id
router.get('/:id', function(req, res){
	var data = req.params.id;
	//console.log(data); here for testing purposes
	Goal
	.findOne({
		where: { id: data }
	}).then(
		function getSuccess(updateData) {
			res.json(updateData);
		},

		function getError(err) {
			res.send(500, err.message);
		}
	);
});

//This will return the data from the log that was updated
router.put('/', function(req, res){
	var description = req.body.goal.desc;
	var result = req.body.goal.result;
	var data = req.body.goal.id;
	console.log(req);

	Goal
	.update(
	{
		description: description,
		result: result,
		def: definition
	}, 
	{where: {id: data}}
	).then(
		function updateSuccess(updatedLog){
			res.json(updatedLog);
		},

		function updateError(err){
			res.send(500, err.message);
		}
	)
});

// router.delete('/', function(req, res){
// 	var data = req.body.log.id;

// 	Log
// 		.destroy({
// 			where: { id: data }
// 		}).then(
// 			function deleteLogSuccess(data){
// 				res.send("you removed a log");
// 			},
// 			function deleteLogError(err){
// 				res.send(500, err.message);
// 			}
// 		);
// });

module.exports = router;
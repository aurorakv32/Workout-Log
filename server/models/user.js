//user model created using sequelize
//talks to the table user
module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	});
		return User;
};

// build a user model in sequelize
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	});
};
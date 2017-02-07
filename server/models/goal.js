// build a model in sequelize
module.exports = function(sequelize, DataTypes){
	return sequelize.define('goal', {
		description: DataTypes.STRING,
		result: DataTypes.STRING,
		owner: DataTypes.INTEGER,
	},{
	});
};
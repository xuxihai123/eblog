"use strict";
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User",
		{
			ID: {type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true},
			user_login: {type: DataTypes.STRING(60), allowNull: false},
			user_pass: {type: DataTypes.STRING(255), allowNull: false},
			display_name: DataTypes.STRING(255),
			user_nicename: DataTypes.STRING(50),
			user_email: DataTypes.STRING(100),
			user_url: DataTypes.STRING(100),
			user_registered: DataTypes.DATE,
			user_activation_key: DataTypes.STRING(255),
			user_level:{type: DataTypes.INTEGER, allowNull: false,defaultValue:0},
			user_status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
		},
		{
			tableName: "users",
			timestamps:false
		});

	return User;
};
"use strict";
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User",
		{
			ID: {type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true},
			user_login: {type: DataTypes.STRING(60),allowNull: false,defaultValue:''},
			user_pass: {type: DataTypes.STRING(255), allowNull: false,defaultValue:''},
			user_nicename: {type:DataTypes.STRING(50),allowNull:false,defaultValue:''},
			user_email: {type:DataTypes.STRING(100),allowNull:false,defaultValue:''},
			user_url: {type:DataTypes.STRING(100),allowNull:false,defaultValue:''},
			user_registered: {type:DataTypes.DATE,allowNull:false,defaultValue:'0000-00-00 00:00:00'},
			user_activation_key: {type:DataTypes.STRING(255),allowNull:false,defaultValue:''},
			user_status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
			display_name: {type:DataTypes.STRING(250),allowNull:false,defaultValue:''}
		},
		{
			tableName: "wp_users",
			indexes:[
				{
					unique: false,
					name:'user_login_key',
					fields: ['user_login']
				},
				{
					unique: false,
					name:'user_nicename',
					fields: ['user_nicename']
				},
				{
					unique: false,
					name:'user_email',
					fields: ['user_email']
				}
			],
			timestamps:false
		});

	return User;
};
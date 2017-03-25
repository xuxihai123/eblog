"use strict";
module.exports = function (sequelize, DataTypes) {
	var Options = sequelize.define("Option",
		{
			option_id: {type: DataTypes.INTEGER(20).UNSIGNED, autoIncrement: true, primaryKey: true},
			option_name: {type: DataTypes.STRING(191), allowNull: false,defaultValue:''},
			option_value: {type: DataTypes.TEXT('long'), allowNull: false},
			autoload: {type: DataTypes.STRING(20), allowNull: false,defaultValue:'yes'}
		},
		{
			tableName: "wp_options",
			indexes:[
				{
					unique:true,
					name:'option_name',
					fields:['option_name']
				}
			],
			timestamps:false
		});

	return Options;
};
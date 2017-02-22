"use strict";

module.exports = function (sequelize, DataTypes) {
	var Term = sequelize.define("Term",
		{
			term_id: {type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true},
			name: {type: DataTypes.STRING(200), allowNull: false},
			slug: {type: DataTypes.STRING(200), allowNull: false},
			term_group: {type: DataTypes.BIGINT(10), defaultValue: 0},
		},
		{
			tableName: 'terms'
		});

	return Term;
};
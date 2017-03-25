//MySQL [wp_blog2]> desc wp_term_relationships;
//+------------------+---------------------+------+-----+---------+-------+
//| Field            | Type                | Null | Key | Default | Extra |
//+------------------+---------------------+------+-----+---------+-------+
//| object_id        | bigint(20) unsigned | NO   | PRI | 0       |       |
//| term_taxonomy_id | bigint(20) unsigned | NO   | PRI | 0       |       |
//| term_order       | int(11)             | NO   |     | 0       |       |
//+------------------+---------------------+------+-----+---------+-------+

"use strict";
module.exports = function (sequelize, DataTypes) {
	var TermRelationShip = sequelize.define("TermRelationShip",
		{
			object_id: {type: DataTypes.BIGINT(20).UNSIGNED,primaryKey:true, defaultValue: 0},
			term_taxonomy_id: {type: DataTypes.BIGINT(20),primaryKey:true, defaultValue: 0},
			term_order: {type: DataTypes.INTEGER(11),allowNull:false, defaultValue: 0}
		},
		{
			tableName: "wp_term_relationships",
			indexes:[
				{
					unique:true,
					name:"term_taxonomy_id",
					fields:['term_taxonomy_id']
				}
			],
			timestamps:false
		});

	return TermRelationShip;
};
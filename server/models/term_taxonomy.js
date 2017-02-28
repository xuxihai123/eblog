"use strict";
//+------------------+---------------------+------+-----+---------+----------------+
//| Field            | Type                | Null | Key | Default | Extra          |
//+------------------+---------------------+------+-----+---------+----------------+
//| term_taxonomy_id | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
//| term_id          | bigint(20) unsigned | NO   | MUL | 0       |                |
//| taxonomy         | varchar(32)         | NO   | MUL |         |                |
//| description      | longtext            | NO   |     | NULL    |                |
//| parent           | bigint(20) unsigned | NO   |     | 0       |                |
//| count            | bigint(20)          | NO   |     | 0       |                |
//+------------------+---------------------+------+-----+---------+----------------+
module.exports = function (sequelize, DataTypes) {
	var TermTaxonomy = sequelize.define("TermTaxonomy",
		{
			term_id: {type: DataTypes.BIGINT(20), defaultValue: 0},
			taxonomy: {type: DataTypes.STRING(32), allowNull: false},
			description: {type: DataTypes.TEXT, defaultValue: ""},
			parent: {type: DataTypes.BIGINT(20), defaultValue: 0},
			count: {type: DataTypes.BIGINT(20), defaultValue: 0}
		},
		{
			tableName: "term_taxonomy",
			timestamps:false,
			classMethods:{
				associate:function(models) {
					TermTaxonomy.belongsTo(models.Term);
					TermTaxonomy.hasMany(models.TermRelationShip,{as:"TermRelationShips"});
				}
			}
		});

	return TermTaxonomy;
};
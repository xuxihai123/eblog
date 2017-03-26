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
			term_taxonomy_id:{type: DataTypes.BIGINT(20).UNSIGNED,primaryKey:true, autoIncrement: true},
			term_id: {type: DataTypes.BIGINT(20).UNSIGNED,allowNull: false, defaultValue: 0},
			taxonomy: {type: DataTypes.STRING(32), allowNull: false,defaultValue:''},
			description: {type: DataTypes.TEXT('long'),allowNull: false},
			parent: {type: DataTypes.BIGINT(20).UNSIGNED, allowNull: false,defaultValue: 0},
			count: {type: DataTypes.BIGINT(20), allowNull: false,defaultValue: 0}
		},
		{
			tableName: "wp_term_taxonomy",
			indexes:[
				{
					unique: true,
					name:'term_id_taxonomy',
					fields: ['term_id','taxonomy']
				},
				{
					unique:false,
					name:'taxonomy',
					fields:['taxonomy']
				}
			],
			timestamps:false,
			classMethods:{
				associate:function(models) {
					TermTaxonomy.belongsTo(models.Term,{foreignKey:"term_id",constraints:false});
					TermTaxonomy.belongsToMany(models.Post, {
						as:"posts",
						through: {
							model: models.TermRelationShip,
							unique: false
						},
						foreignKey: 'term_taxonomy_id',
						constraints: false
					});
					TermTaxonomy.hasMany(models.TermRelationShip, {foreignKey: "term_taxonomy_id",constraints: false});
				}
			}
		});

	return TermTaxonomy;
};
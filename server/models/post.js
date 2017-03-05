"use strict";
module.exports = function (sequelize, DataTypes) {
	var models = sequelize.models;
	var Post = sequelize.define("Post",
		{
			ID: {type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true},
			post_author: {type: DataTypes.STRING(200), allowNull: false},
			post_date: {type: DataTypes.DATE, allowNull: false},
			post_date_gmt: {type: DataTypes.DATE, allowNull: false},
			post_content: {type: DataTypes.TEXT, allowNull: false},
			post_title: {type: DataTypes.TEXT, allowNull: false},
			post_status: {type: DataTypes.STRING(200), allowNull: false},
			comment_status: {type: DataTypes.STRING(20), defaultValue: 'open'},
			post_name: {type: DataTypes.STRING(200)},
			post_type: {type: DataTypes.STRING(20), allowNull: false},
			user_id: {type: DataTypes.BIGINT(20), allowNull: false},
			comment_count: {type: DataTypes.INTEGER(20), defaultValue: 0}
		},
		{
			tableName: "posts",
			timestamps: false,
			classMethods: {
				associate: function (models) {
					Post.belongsTo(models.User, {as:"user",foreignKey: "user_id"});
					Post.belongsToMany(models.TermTaxonomy, {
						as:"termTaxonomys",
						through: {
							model: models.TermRelationShip,
							unique: false
						},
						foreignKey: 'object_id',
						constraints: false
					});
					Post.hasMany(models.TermRelationShip, {as:"termRelations",foreignKey: "object_id"});
				}
			},
			getterMethods:{
				taxonomy:function() {
					return this.termTaxonomy && this.termTaxonomy.taxonomy;
				}
			},
			scopes:{
				post: {
					where: {
						post_type:"post"
					}
				},
				page: {
					where: {
						post_type:"page"
					}
				}
			}
		});

	return Post;
};
"use strict";
// +-----------------------+---------------------+------+-----+---------------------+----------------+
// | ID                    | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
// | post_author           | bigint(20) unsigned | NO   | MUL | 0                   |                |
// | post_date             | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
// | post_date_gmt         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
// | post_content          | longtext            | NO   |     | NULL                |                |
// | post_title            | text                | NO   |     | NULL                |                |
// | post_excerpt          | text                | NO   |     | NULL                |                |
// | post_status           | varchar(20)         | NO   |     | publish             |                |
// | comment_status        | varchar(20)         | NO   |     | open                |                |
// | ping_status           | varchar(20)         | NO   |     | open                |                |
// | post_password         | varchar(20)         | NO   |     |                     |                |
// | post_name             | varchar(200)        | NO   | MUL |                     |                |
// | to_ping               | text                | NO   |     | NULL                |                |
// | pinged                | text                | NO   |     | NULL                |                |
// | post_modified         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
// | post_modified_gmt     | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
// | post_content_filtered | longtext            | NO   |     | NULL                |                |
// | post_parent           | bigint(20) unsigned | NO   | MUL | 0                   |                |
// | guid                  | varchar(255)        | NO   |     |                     |                |
// | menu_order            | int(11)             | NO   |     | 0                   |                |
// | post_type             | varchar(20)         | NO   | MUL | post                |                |
// | post_mime_type        | varchar(100)        | NO   |     |                     |                |
// | comment_count         | bigint(20)          | NO   |     | 0                   |                |
// +-----------------------+---------------------+------+-----+---------------------+----------------+
module.exports = function (sequelize, DataTypes) {
	var models = sequelize.models;
	var Post = sequelize.define("Post",
		{
			ID: {type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true},
			post_author: {type: DataTypes.BIGINT(20).UNSIGNED, allowNull: false,defaultValue:0},
			post_date: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			post_date_gmt: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			post_content: {type: DataTypes.TEXT('long'), allowNull: false},
			post_title: {type: DataTypes.TEXT, allowNull: false},
			post_excerpt: {type: DataTypes.TEXT, allowNull: false},
			post_status: {type: DataTypes.STRING(20), allowNull: false,defaultValue:'publish'},
			comment_status: {type: DataTypes.STRING(20), allowNull: false,defaultValue: 'open'},
			ping_status: {type: DataTypes.STRING(20), allowNull: false,defaultValue: 'open'},
			post_password: {type: DataTypes.STRING(20),allowNull: false,defaultValue:''},
			post_name: {type: DataTypes.STRING(200),unique:false,allowNull: false,defaultValue:''},
			to_ping: {type: DataTypes.TEXT, allowNull: false},
			pinged: {type: DataTypes.TEXT, allowNull: false},
			post_modified: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			post_modified_gmt: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			post_content_filtered: {type: DataTypes.TEXT('long'), allowNull: false},
			post_parent: {type: DataTypes.BIGINT(20).UNSIGNED, unique:false,allowNull: false,defaultValue:0},
			guid: {type: DataTypes.STRING(255), allowNull: false,defaultValue:''},
			menu_order: {type: DataTypes.INTEGER(11), allowNull: false,defaultValue:0},
			post_type: {type: DataTypes.STRING(20),unique:false, allowNull: false,defaultValue:'post'},
			post_mime_type: {type: DataTypes.STRING(100), allowNull: false,defaultValue:''},
			comment_count: {type: DataTypes.BIGINT(20),allowNull: false, defaultValue: 0}
		},
		{
			tableName: "wp_posts",
			timestamps: false,
			classMethods: {
				associate: function (models) {
					Post.belongsTo(models.User, {as:"user",foreignKey: "post_author"});
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
				},
				user_login:function() {
					return this.user&&this.user.user_login
				}
			},
			scopes:{
				date:{
					order:"post_date DESC"
				},
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
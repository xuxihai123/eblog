"use strict";
//+-----------------------+---------------------+------+-----+---------------------+----------------+
//| Field                 | Type                | Null | Key | Default             | Extra          |
//+-----------------------+---------------------+------+-----+---------------------+----------------+
//| ID                    | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| post_author           | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| post_date             | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_date_gmt         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_content          | longtext            | NO   |     | NULL                |                |
//| post_title            | text                | NO   |     | NULL                |                |
//| post_excerpt          | text                | NO   |     | NULL                |                |
//| post_status           | varchar(20)         | NO   |     | publish             |                |
//| comment_status        | varchar(20)         | NO   |     | open                |                |
//| ping_status           | varchar(20)         | NO   |     | open                |                |
//| post_password         | varchar(20)         | NO   |     |                     |                |
//| post_name             | varchar(200)        | NO   | MUL |                     |                |
//| to_ping               | text                | NO   |     | NULL                |                |
//| pinged                | text                | NO   |     | NULL                |                |
//| post_modified         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_modified_gmt     | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_content_filtered | longtext            | NO   |     | NULL                |                |
//| post_parent           | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| guid                  | varchar(255)        | NO   |     |                     |                |
//| menu_order            | int(11)             | NO   |     | 0                   |                |
//| post_type             | varchar(20)         | NO   | MUL | post                |                |
//| post_mime_type        | varchar(100)        | NO   |     |                     |                |
//| comment_count         | bigint(20)          | NO   |     | 0                   |                |
module.exports = function (sequelize, DataTypes) {
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
			user_id:{type: DataTypes.BIGINT(20),allowNull:false},
			comment_count: {type: DataTypes.INTEGER(20), defaultValue: 0}
		},
		{
			tableName: "posts",
			timestamps:false,
			classMethods:{
				associate:function(models) {
					Post.hasMany(models.TermRelationShip,{as:"TermRelationShips"});
					Post.hasOne(models.User,{as:"user"});
				}
			}
		});

	return Post;
};
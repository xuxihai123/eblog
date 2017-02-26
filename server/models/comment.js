"use strict";
//MySQL [wp_blog2]> desc wp_comments;
//+----------------------+---------------------+------+-----+---------------------+----------------+
//| Field                | Type                | Null | Key | Default             | Extra          |
//+----------------------+---------------------+------+-----+---------------------+----------------+
//| comment_ID           | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| comment_post_ID      | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| comment_author       | tinytext            | NO   |     | NULL                |                |
//| comment_author_email | varchar(100)        | NO   | MUL |                     |                |
//| comment_author_url   | varchar(200)        | NO   |     |                     |                |
//| comment_author_IP    | varchar(100)        | NO   |     |                     |                |
//| comment_date         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| comment_date_gmt     | datetime            | NO   | MUL | 0000-00-00 00:00:00 |                |
//| comment_content      | text                | NO   |     | NULL                |                |
//| comment_karma        | int(11)             | NO   |     | 0                   |                |
//| comment_approved     | varchar(20)         | NO   | MUL | 1                   |                |
//| comment_agent        | varchar(255)        | NO   |     |                     |                |
//| comment_type         | varchar(20)         | NO   |     |                     |                |
//| comment_parent       | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| user_id              | bigint(20) unsigned | NO   |     | 0                   |                |
//+----------------------+---------------------+------+-----+---------------------+----------------+
module.exports = function (sequelize, DataTypes) {
	var Comment = sequelize.define("Comment",
		{
			comment_ID: {type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true},
			comment_post_ID: {type: DataTypes.BIGINT(20), defaultValue: 0},
			comment_author: {type: DataTypes.STRING(255), allowNull: false},
			comment_author_email: {type: DataTypes.STRING(100), allowNull: false},
			comment_author_url: {type: DataTypes.STRING(200)},
			comment_author_IP: {type: DataTypes.STRING(100)},
			comment_date: {type: DataTypes.DATE, allowNull: false},
			comment_date_gmt: {type: DataTypes.DATE, allowNull: false},
			comment_content: {type: DataTypes.TEXT, allowNull: false},
			comment_approved: {type: DataTypes.STRING(20), defaultValue: '1'},
			comment_agent: {type: DataTypes.STRING(255), allowNull: false},
			comment_type: {type: DataTypes.STRING(20), allowNull: false},
			user_id: {type: DataTypes.BIGINT(20), defaultValue: 0}
		},
		{
			tableName: "comments",
			timestamps:false
		});
	return Comment;
};
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
			comment_ID: {type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true},
			comment_post_ID: {type: DataTypes.BIGINT(20).UNSIGNED,allowNull: false, defaultValue: 0},
			comment_author: {type: DataTypes.TEXT('tiny'), allowNull: false},
			comment_author_email: {type: DataTypes.STRING(100), allowNull: false,defaultValue:''},
			comment_author_url: {type: DataTypes.STRING(200),allowNull: false,defaultValue:''},
			comment_author_IP: {type: DataTypes.STRING(100),allowNull: false,defaultValue:''},
			comment_date: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			comment_date_gmt: {type: DataTypes.DATE, allowNull: false,defaultValue:'0000-00-00 00:00:00'},
			comment_content: {type: DataTypes.TEXT, allowNull: false},
			comment_karma: {type: DataTypes.INTEGER(11), allowNull: false,defaultValue:0},
			comment_approved: {type: DataTypes.STRING(20), allowNull: false,defaultValue: '1'},
			comment_agent: {type: DataTypes.STRING(255), allowNull: false,defaultValue:''},
			comment_type: {type: DataTypes.STRING(20), allowNull: false,defaultValue:''},
			comment_parent: {type: DataTypes.BIGINT(20).UNSIGNED, allowNull: false,defaultValue:0},
			user_id: {type: DataTypes.BIGINT(20).UNSIGNED,allowNull: false, defaultValue: 0}
		},
		{
			tableName: "wp_comments",
			indexes:[
				{
					unique:false,
					name:"comment_post_ID",
					fields:['comment_post_ID']
				},{
					unique:false,
					name:"comment_approved_date_gmt",
					fields:['comment_approved','comment_date_gmt']
				},{
					unique:false,
					name:"comment_date_gmt",
					fields:['comment_date_gmt']
				},{
					unique:false,
					name:"comment_parent",
					fields:['comment_parent']
				},{
					unique:false,
					name:"comment_author_email",
					fields:['comment_author_email']
				}
			],
			timestamps:false
		});
	return Comment;
};
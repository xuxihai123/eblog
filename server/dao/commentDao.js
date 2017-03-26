"use strict";
var sqlhelp = require('../utils/sqlHelper');
var pagehelp = require('./pageSqlHelper');
module.exports = {
	create:function(comment){
		var sql = "insert into wp_comments set ?";
		return sqlhelp.query(sql, comment);
	},
	remove:function(comment){
		var sql = "delete  from wp_comments where comment_ID=?";
		return sqlhelp.query(sql, [comment.comment_ID]);
	},
	getById:function(id){
		var sql = 'select * from wp_comments where comment_ID=?';
		return sqlhelp.query(sql, [id]);
	},
	getPageModel:function(offset,limit){
		var sql = "select * from wp_comments";
		return pagehelp.getPageModel(offset, limit, sql);
	},
	findAllByPostId:function(postId){
		var sql = "select * from wp_comments where comment_post_ID=?";
		sql = sqlhelp.format(sql, [postId]);
		return sqlhelp.query(sql);
	}
};
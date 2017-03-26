"use strict";
var pagehelp = require('./pageSqlHelper');
var sqlhelp = require('../utils/sqlHelper');
var postSqls = require("./SQLTemplate").postSql;
module.exports = {
	create: function (post) {
		return sqlhelp.query(postSqls.save, post);
	},
	remove: function (post) {
		return sqlhelp.query(postSqls.delete, post.ID);
	},
	update: function (post) {
		return sqlhelp.query(postSqls.update, [post.post_title, post.post_content, post.ID]);
	},
	getById: function (id) {
		return sqlhelp.query(postSqls.get, [id]).then(function (result) {
			return result[0];
		});
	},
	getPrev:function(id){
		return sqlhelp.query(postSqls.getPrev, [id]).then(function (result) {
			return result[0];
		});
	},
	getNext:function(id){
		return sqlhelp.query(postSqls.getNext, [id]).then(function (result) {
			return result[0];
		});
	},
	getPageModel1: function (offset, limit) {
		return pagehelp.getPageModel(offset, limit, postSqls.getPostPageModel);
	},
	getPageModel2: function (offset, limit) {
		return pagehelp.getPageModel(offset, limit, postSqls.getPagePageModel);
	},
	getArchive: function (offset, limit) {
		return sqlhelp.query(postSqls.findArticleArchive);
	},
	getLastestPost: function (count) {
		return sqlhelp.query(postSqls.findNewestList);
	},
	getLastestPage: function (count) {
		return sqlhelp.query(postSqls.findNewestPage);
	},
	findByWord: function (offset, limit, word) {
		word = "%" + word + "%";
		var sql = postSqls.findPostByWordPageModel;
		sql = sqlhelp.format(sql, [word]);
		return pagehelp.getPageModel(offset, limit, sql);
	},
	findByArchive: function (offset, limit, archive) {
		var sql = sqlhelp.format(postSqls.findByYearMonthPageModel, [archive.year, archive.month]);
		return pagehelp.getPageModel(offset, limit, sql);
	},

	findByCategory: function (offset, limit, category) {
		var sql = sqlhelp.format(postSqls.findByCategoryPageModel, [category]);
		return pagehelp.getPageModel(offset, limit, sql);
	}

};
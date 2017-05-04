"use strict";
var Post = require('../models').Post;
var pagehelp = require('./pageSqlHelper');
var Promise = require('bluebird');
var sqlhelp = require('../utils/sqlHelper');
var postSqls = require("./SQLTemplate").postSql;
var termRelationshipSql = require("./SQLTemplate").termRelationshipSql;
module.exports = {
	create: function (obj) {
		var conn;
		return new Promise(function (resolve, reject) {
			function reject2(err, connection) {
				connection.rollback(function () {
					console.log('rollback.........');
					connection && connection.release();
					reject(err);
				});
			}
			sqlhelp.getConnection(function (err, connection) {
				conn = connection;
				if (err) {
					return reject2(err, conn);
				}
				connection.beginTransaction(function (err) {
					if (err) {
						return reject2(err, conn);
					}
					var post = new Post(obj);
					connection.query(postSqls.save, post, function (err, okPacket) {
						if (err) {
							return reject2(err, conn);
						}
						var termRelations =obj.termRelations,values=[];
						termRelations.forEach(function (temp) {
							temp.object_id=okPacket.insertId;
							values.push([okPacket.insertId, temp.term_taxonomy_id,0]);
						});
						connection.query(termRelationshipSql.saveMulti, [values], function (err, okPacket) {
							if (err) {
								reject2(err, conn);
							} else {
								connection.commit(function (err) {
									if (err) {
										reject2(err, conn);
									} else {
										resolve(okPacket);
									}
								});

							}
						});
					});
				});
			});
		});

	},
	createPage: function (obj) {
		return new Promise(function (resolve, reject) {
			sqlhelp.getConnection(function (err, connection) {
				if (err) {
					return reject(err);
				}
				var post = new Post(obj);
				connection.query(postSqls.save, post, function (err, okPacket) {
					if (err) {
						return reject(err);
					}
					resolve(okPacket);
				});
			});
		});

	},
	remove: function (post) {
		return sqlhelp.query(postSqls.delete, post.ID);
	},
	update: function (post) {
		return sqlhelp.query(postSqls.update, [post.post_title, post.post_content, post.ID]);
	},
	updateCategory:function (post) {
		return sqlhelp.query(postSqls.updateCategory, [post.term_taxonomy_id,post.ID]);
	},
	getById: function (id) {
		return sqlhelp.queryOne(postSqls.getById, [id]);
	},
	getPostTerms:function (id) {
        return sqlhelp.query(postSqls.getPostTerms, [id]);
    },
	getPageById: function (id) {
		return sqlhelp.queryOne(postSqls.getPageById, [id]);
	},
	getPrev: function (id) {
		return sqlhelp.queryOne(postSqls.getPrev, [id]);
	},
	getNext: function (id) {
		return sqlhelp.queryOne(postSqls.getNext, [id]);
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
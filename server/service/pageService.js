"use strict";
var transaction = require('../dao').transaction;
var postDao = require("../dao").PostDao;
var Promise = require('bluebird');
module.exports = {
	addPage: function (post) {
		return new Promise(function (resolve, reject) {
			transaction().then(function(trans){
				post.post_type = 'page';
				post.post_status = 'publish';
				return postDao.create2(post, trans).then(function (result) {
					return trans.commit().then(function () {
						resolve(result);
					});
				}, function (error) {
					return trans.rollback().then(function () {
						reject(error);
					});
				});
			},function(error){
				reject(error);
			},function(error){
				reject(error);
			});
		});
	},
	removePage: function (postID) {
		return new Promise(function (resolve, reject) {
			postDao.remove({ID:postID}).then(function (result) {
				resolve(result);
			},function(error){
				reject(error);
			});
		});
	},
	updatePage: function (user, key) {
		return new Promise(function (resolve, reject) {
			if (key) {
				User.findOne({
					where: {
						user_login: username
					}
				}).then(function (result) {
					if (result === null) {
						reject({
							errorMessage: "用户不已存在！"
						});
					} else {
						resolve(this.updateUser(user));
					}
				});
			} else {
				reject({
					errorMessage: "key...is need！"
				})
			}

		});
	},
	getPage: function (postId) {
		return new Promise(function (resolve, reject) {
			postDao.getById(postId).then(function (post) {
				resolve(post);
			}, function (error) {
				reject(error);
			});
		});
	},
	pageModelOfPage: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			postDao.getPageModel2(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	},
	findLastestPage:function() {
		return new Promise(function (resolve, reject) {
			postDao.getLastestPage(6).then(function (result) {
				resolve(result.rows);
			}, function (error) {
				reject(error);
			});
		});
	}
};
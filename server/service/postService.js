"use strict";
var transaction = require('../dao').transaction;
var postDao = require("../dao").PostDao;
var Promise = require('bluebird');
module.exports = {
	addPost: function (post) {
		return new Promise(function (resolve, reject) {
			transaction().then(function(trans){
				post.post_type = 'post';
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
				reject({
					errorCode: "591000",
					errorMessage: "创建事务失败！",
					errorSource: error
				});
			});
		});
	},
	removePost: function (postID) {
		return new Promise(function (resolve, reject) {
			postDao.remove({ID:postID}).then(function (result) {
				resolve(result);
			},function(error){
				reject({
					errorMessage: "key...is need！",
					error:error
				})
			});
		});
	},
	updatePost: function (user, key) {
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
	getPost: function (postId) {
		return new Promise(function (resolve, reject) {
			return postDao.getById(postId).then(function (post) {
				resolve(post);
			}, function (error) {
				reject({
					errorSorce: error
				});
			});
		});
	},
	pageModelOfPost: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			return postDao.getPageModel1(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorSorce: error
				});
			});
		});
	},
	/**前台服务**/
	findPostPageModel:function(offset,limit){
		return new Promise(function (resolve, reject) {
			return postDao.getPageModel1(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorSorce: error
				});
			});
		});
	},
	findArticleArchive:function() {
		return new Promise(function (resolve, reject) {
			return postDao.getArchive().then(function (result) {
				var list = JSON.parse(JSON.stringify(result));
				resolve(list);
			}, function (error) {
				reject({
					errorSorce: error
				});
			});
		});
	},
	findLastestPost:function() {
		return new Promise(function (resolve, reject) {
			return postDao.getLastestPost(6).then(function (result) {
				resolve(result.rows);
			}, function (error) {
				reject({
					errorSorce: error
				});
			});
		});
	}

};
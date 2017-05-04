"use strict";
var postDao = require("../dao").PostDao;
var Promise = require('bluebird');
module.exports = {
	addPage: function (post) {
		return new Promise(function (resolve, reject) {
			post.post_type = 'page';
			post.post_status = 'publish';
			return postDao.createPage(post).then(function (result) {
				return resolve(result);
			}, function (error) {
				return reject(error);
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
	updatePage: function (post2) {
		return new Promise(function (resolve, reject) {
			postDao.getById(post2.ID).then(function (post) {
				if (post === null) {
					reject({
						errorMessage: "post不存在！"
					});
				} else {
					resolve(postDao.update(post2));
				}
			});
		});
	},
	getPage: function (postId) {
		return new Promise(function (resolve, reject) {
			postDao.getPageById(postId).then(function (post) {
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
				resolve(result);
			}, function (error) {
				reject(error);
			});
		});
	}
};
"use strict";
var postDao = require("../dao").PostDao;
var termDao = require("../dao").TermDao;
var Promise = require('bluebird');
var cache = {findArticleArchive: {}};
module.exports = {
	addPost: function (post) {
		return new Promise(function (resolve, reject) {
			post.post_type = 'post';
			post.post_status = 'publish';
			return postDao.create(post).then(function (result) {
				cache.findArticleArchive.dirty = true;
				return resolve(result);
			}, function (error) {
				return reject(error);
			});
		});
	},
	removePost: function (postID) {
		return new Promise(function (resolve, reject) {
			postDao.remove({ID: postID}).then(function (result) {
				cache.findArticleArchive.dirty = true;
				resolve(result);
			}, function (error) {
				reject(error);
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
			console.log('------'+postId);
			return postDao.getById(postId).then(function (post) {
				resolve(post);
			}, function (error) {
				reject(error);
			});
		});
	},
	findPrev: function (postId) {
		return new Promise(function (resolve, reject) {
			return postDao.getPrev(postId).then(function (post) {
				resolve(post);
			}, function (error) {
				reject(error);
			});
		});
	},
	findNext: function (postId) {
		return new Promise(function (resolve, reject) {
			return postDao.getNext(postId).then(function (post) {
				resolve(post);
			}, function (error) {
				reject(error);
			});
		});
	},
	pageModelOfPost: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			return postDao.getPageModel1(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	},
	/**前台服务**/
	findPostPageModel: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			return postDao.getPageModel1(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	},
	findArticleArchive: function () {
		return new Promise(function (resolve, reject) {
			if(cache.findArticleArchive.dirty==false){
				return resolve(cache.findArticleArchive.result);
			}
			return postDao.getArchive().then(function (result) {
				var list = JSON.parse(JSON.stringify(result));
				cache.findArticleArchive.result = list;
				cache.findArticleArchive.dirty = false;
				resolve(list);
			}, function (error) {
				reject(error);
			});
		});
	},
	findLastestPost: function () {
		return new Promise(function (resolve, reject) {
			return postDao.getLastestPost(6).then(function (result) {
				resolve(result);
			}, function (error) {
				reject(error);
			});
		});
	},
	findPostByWordPageModel: function (offset, limit, word) {
		return new Promise(function (resolve, reject) {
			return postDao.findByWord(offset, limit, word).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	},
	findByArchivePageModel: function (offset, limit, archive) {
		return new Promise(function (resolve, reject) {
			return postDao.findByArchive(offset, limit, archive).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	},
	findByCategoryPageModel: function (offset, limit, category) {
		return new Promise(function (resolve, reject) {
			return termDao.termFindPost(offset, limit, category).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject(error);
			});
		});
	}

};
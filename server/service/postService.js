"use strict";
var postDao = require("../dao").PostDao;
var termDao = require("../dao").TermDao;
var Promise = require('bluebird');
var filterTerm = require('../utils/filters');
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
	updatePost: function (post2) {
		return new Promise(function (resolve, reject) {
			postDao.getById(post2.ID).then(function (post) {
				if (post === null) {
					reject({
						errorMessage: "post不存在！"
					});
				} else {
					if(post.term_taxonomy_id!=post2.Cttid){
						resolve(Promise.all([postDao.updateCategory(post2),resolve(postDao.update(post2))]))
					}else{
						resolve(postDao.update(post2));
					}
				}
			});

		});
	},
	getPost: function (postId) {
		return new Promise(function (resolve, reject) {
			Promise.all([postDao.getById(postId), postDao.getPostTerms(postId)])
				.spread(function (post, terms) {
					post.categoryList = filterTerm.filterCategory(terms);
					post.tagList = filterTerm.filterTags(terms);
					resolve(post);
				})
				.caught(function (error) {
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
			if (cache.findArticleArchive.dirty == false) {
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
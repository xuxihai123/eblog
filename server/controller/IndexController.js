var User = require("../models/wp_users");
var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
var Q = require('q');
/**
 * 首页
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: "/",
		controller: function (req, res, next) {
			var offset = req.query.start || 0;
			var limit = req.query.limit || 10;
			Q.all([Post.findNewestListPage(offset, limit),
					Term.getAllCategory(),
					Post.findArticleArchive(),
					Post.findNewestList()])
				.spread(function (postPageModel, categoryList, articleArchList, postNewestList) {
					req.postNewestList = postNewestList;
					req.articleArchList = articleArchList;
					req.categoryList = categoryList;
					req.home = {
						type: "index",
						pageModel: postPageModel
					};
					return res.render("index", {"title": "Express"});
				}).fail(function (err) {
				res.errorProxy("SqlException", err);
			});
		}
	}
};
/**
 * 关键字搜索
 * @returns {{url: string, controller: controller}}
 */
exports.search = function () {
	return {
		url: "/search",
		controller: function (req, res, next) {
			var word = req.query.word;
			var offset = req.query.start || 0;
			var limit = req.query.limit || 10;
			Q.all([Post.findPostByWordPage(word, offset, limit),
					Term.getAllCategory(),
					Post.findArticleArchive(),
					Post.findNewestList()])
				.spread(function (pageModel, categoryList, articleArchList, postNewestList) {
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.home = {
						type: "index",
						pageModel: pageModel
					};
					return res.render("index", {"title": "Express"});
				}).fail(function (err) {
				res.errorProxy("SqlException", err);
			});
		}
	}
};
/**
 * 阅读文章
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexArticle = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/(\d+)\/?$/,
		controller: function (req, res, next) {
			//var year = req.params[0];
			//var month = req.params[1];
			//var day = req.params[2];
			var slug = req.params[0];

			Q.all([Post.get(slug),
					Post.getPrev(slug),
					Post.getNext(slug),
					Term.getAllCategory(),
					Post.findArticleArchive(),
					Post.findNewestList()])
				.spread(function (posts, prevPosts, nextPosts, categoryList, articleArchList, postNewestList) {
					req.previewPost = posts[0];
					if (prevPosts.length > 0) {
						req.prevPost = prevPosts[0];
					}
					if (nextPosts.length > 0) {
						req.nextPost = nextPosts[0];
					}
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.home = {
						type: "article"
					};
					return res.render("index", {"title": "Express"});
				})
				.fail(function (err) {
					res.errorProxy("SqlException", err);
				});
		}
	}
};
/**
 * 文章归档
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexArchive = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /(\d{4})\/(\d{1,2})\/?$/,
		controller: function (req, res, next) {
			var offset = req.query.start || 0;
			var limit = req.query.limit || 10;
			var year = req.params[0];
			var month = req.params[1];
			Q.all([Post.findByYearMonthPage({year: year, month: month}, offset, limit),
					Term.getAllCategory(),
					Post.findArticleArchive(),
					Post.findNewestList()])
				.spread(function (pageModel, list2, list3, list4) {
					req.home = {
						type: "archive",
						year: year,
						month: month,
						pageModel: pageModel
					};
					req.categoryList = list2;
					req.articleArchList = list3;
					req.postNewestList = list4;
					res.render("index", {"title": "Express"});
				})
				.fail(function (err) {
					res.errorProxy("SqlException", err);
				});
		}
	}
};
/**
 * 分类归档
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexCategory = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\/category\/(\w[\w\d_]+)(\/(\w[\w\d_]+)\/?|\/?)?$/,
		controller: function (req, res, next) {

			var pargs1 = req.params[0];
			var pargs2 = req.params[1];
			var pargs3 = req.params[2];
			var offset = req.query.start || 0;
			var limit = req.query.limit || 10;
			if (pargs2) { //have children
				console.log(pargs1 + "->" + pargs3);
			} else {
				Q.all([Post.findByCategoryPage(pargs1, offset, limit),
						Term.getAllCategory(),
						Post.findArticleArchive(),
						Post.findNewestList()])
					.spread(function (pageModel, list2, list3, list4) {
						req.home = {
							type: "category",
							category: pargs1,
							pageModel: pageModel
						};
						req.categoryList = list2;
						req.articleArchList = list3;
						req.postNewestList = list4;
						res.render("index", {"title": "Express"});
					})
					.fail(function (err) {
						res.errorProxy("SqlException", err);
					});
			}
		}
	}
};
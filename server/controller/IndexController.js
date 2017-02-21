var User = require("../models/wp_users");
var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
var comment = require("../models/wp_comments");
var filters = require("../utils/filters");
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
			var limit = req.query.limit || 5;
			Q.all([Post.findNewestListPageModel(offset, limit),
					Term.getAllCategory(),
					Term.getAllTags(),
					Post.findArticleArchive(),
					Post.findNewestList(),
					Post.findNewestPage()])
				.spread(function (postPageModel, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
					req.postNewestList = postNewestList;
					req.articleArchList = articleArchList;
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "index",
						pageModel: postPageModel
					};
					return res.render("index");
				}).fail(function (err) {
				res.errorProxy("500", err);
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
			var limit = req.query.limit || 5;
			if(!word){
					return res.redirect("/");
			}
			Q.all([Post.findPostByWordPageModel(word, offset, limit),
					Term.getAllCategory(),
					Term.getAllTags(),
					Post.findArticleArchive(),
					Post.findNewestList(),
					Post.findNewestPage()])
				.spread(function (pageModel, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "search",
						word:word,
						pageModel: pageModel
					};
					return res.render("index");
				}).fail(function (err) {
				res.errorProxy("500", err);
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
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/post(\d+)\/?$/,
		controller: function (req, res, next) {
			var slug = req.params[0];

			Q.all([Post.get(slug),
					Post.getPrev(slug),
					Post.getNext(slug),
					comment.getCommentByPostId(slug),
					Term.getAllCategory(),
					Term.getAllTags(),
					Post.findArticleArchive(),
					Post.findNewestList(),
					Post.findNewestPage()])
				.spread(function (posts, prevPosts, nextPosts,commentList, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
					req.previewPost = posts[0];
					req.previewPost.categoryList = filters.filterPostCategory(posts);
					req.previewPost.tagList = filters.filterPostTags(posts);
					if (prevPosts.length > 0) {
						req.prevPost = prevPosts[0];
					}
					if (nextPosts.length > 0) {
						req.nextPost = nextPosts[0];
					}
					req.commentList = commentList;
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "article"
					};
					return res.render("index", {"title": req.previewPost.post_title});
				})
				.fail(function (err) {
					res.errorProxy("500", err);
				});
		}
	}
};
/**
 * 展示关于等页面
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexPage = function () {
	return {
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/page(\d+)\/?$/,
		controller: function (req, res, next) {
			var id = req.params[0];

			Q.all([Post.get(id),
					Term.getAllCategory(),
						Term.getAllTags(),
					Post.findArticleArchive(),
					Post.findNewestList(),
					Post.findNewestPage()])
				.spread(function (posts, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
					req.previewPost = posts[0];
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "article"
					};
					return res.render("index", {"title": posts[0].name});
				})
				.fail(function (err) {
					res.errorProxy("500", err);
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
			var limit = req.query.limit || 5;
			var year = req.params[0];
			var month = req.params[1];
			Q.all([Post.findByYearMonthPageModel({year: year, month: month}, offset, limit),
					Term.getAllCategory(),
						Term.getAllTags(),
					Post.findArticleArchive(),
					Post.findNewestList(),
					Post.findNewestPage()])
				.spread(function (pageModel, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
					req.home = {
						type: "archive",
						year: year,
						month: month,
						pageModel: pageModel
					};
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					res.render("index");
				})
				.fail(function (err) {
					res.errorProxy("500", err);
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
		url: /\/category\/([^\s\/]+)\/?$/,
		controller: function (req, res, next) {

			var pargs1 = req.params[0];
			var pargs2 = req.params[1];
			var pargs3 = req.params[2];
			var offset = req.query.start || 0;
			var limit = req.query.limit || 5;
			if (pargs2) { //have children
				console.log(pargs1 + "->" + pargs3);
			} else {
				Q.all([Post.findByCategoryPageModel(pargs1, offset, limit),
						Term.getBySlug(pargs1),
						Term.getAllCategory(),
						Term.getAllTags(),
						Post.findArticleArchive(),
						Post.findNewestList(),
						Post.findNewestPage()])
					.spread(function (pageModel,term, categoryList,tagsList, articleArchList, postNewestList, pageNewestList) {
						req.home = {
							type: "category",
							category: pargs1,
							pageModel: pageModel
						};
						req.categoryList = categoryList;
						req.tagsList = tagsList;
						req.articleArchList = articleArchList;
						req.postNewestList = postNewestList;
						req.pageNewestList = pageNewestList;
						res.render("index", {"title":term[0].name});
					})
					.fail(function (err) {
						res.errorProxy("500", err);
					});
			}
		}
	}
};

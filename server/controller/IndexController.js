var services = require('../service');
var postService = services.PostService;
var termService = services.TermService;
var pageService = services.PageService;
var commentService = services.CommentService;
var Promise = require('bluebird');
/**
 * 首页
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: "/",
		controller: function (req, res, next) {
			var offset = Number(req.query.start) || 0;
			var limit = Number(req.query.limit) || 5;
			Promise.all([postService.findPostPageModel(offset, limit),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (postPageModel, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.postNewestList = postNewestList;
					req.articleArchList = articleArchList;
					req.categoryList = categoryList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "list",
						listType:"index",
						pageModel: postPageModel
					};
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
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
			var offset = Number(req.query.start) || 0;
			var limit = Number(req.query.limit) || 5;
			if (!word) {
				return res.redirect("/");
			}
			Promise.all([postService.findPostByWordPageModel(offset, limit, word),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (pageModel, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "list",
						listType:"search",
						word: word,
						pageModel: pageModel
					};
					var title = word+'-关键字搜索';
					var type = '搜索结果';
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	}
};
/**
 * 阅读文章
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexPost = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/post(\d+)\/?$/,
		controller: function (req, res, next) {
			var postID = req.params[0];
			Promise.all([postService.getPost(postID),
				postService.findPrev(postID),
				postService.findNext(postID),
				commentService.findAllByPostId(postID),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (post, prevPost, nextPost, commentList, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.previewPost = post;
					req.prevPost = prevPost;
					req.nextPost = nextPost;
					req.commentList = commentList;
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "article"
					};
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
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

			Promise.all([pageService.getPage(id),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (post, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.previewPost = post;
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "page"
					};
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
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
			var offset = Number(req.query.start) || 0;
			var limit = Number(req.query.limit) || 5;
			var year = req.params[0];
			var month = req.params[1];
			Promise.all([postService.findByArchivePageModel(offset, limit, {year: year, month: month}),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (pageModel, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.home = {
						type: "list",
						listType:"archive",
						year: year,
						month: month,
						pageModel: pageModel
					};
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
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
			var offset = Number(req.query.start) || 0;
			var limit = Number(req.query.limit) || 5;
			Promise.all([postService.findByCategoryPageModel(offset, limit, pargs1),
				termService.getBySlug(pargs1),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (pageModel, term, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.home = {
						type:"list",
						listType: "category",
						category: pargs1,
						pageModel: pageModel
					};
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	}
};
/**
 * 标签分类
 * @returns {{url: RegExp, controller: controller}}
 */
exports.indexTag = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\/tag\/([^\s\/]+)\/?$/,
		controller: function (req, res, next) {

			var pargs1 = req.params[0];
			var offset = Number(req.query.start) || 0;
			var limit = Number(req.query.limit) || 5;
			Promise.all([postService.findByCategoryPageModel(offset, limit, pargs1),
				termService.getBySlug(pargs1),
				termService.getAllCategory(),
				postService.findArticleArchive(),
				postService.findLastestPost(),
				pageService.findLastestPage()])
				.spread(function (pageModel, term, categoryList, articleArchList, postNewestList, pageNewestList) {
					req.home = {
						type:"list",
						listType: "tag",
						category: pargs1,
						pageModel: pageModel
					};
					req.categoryList = categoryList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					return res.render("index");
				}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	}
};

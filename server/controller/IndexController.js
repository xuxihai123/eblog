var services = require('../service');
var postService = services.PostService;
var termService = services.TermService;
var pageService = services.PageService;
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
					termService.getAllTags(),
					postService.findArticleArchive(),
					postService.findLastestPost(),
					pageService.findLastestPage()])
				.spread(function (postPageModel, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
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
			var offset = req.query.start || 0;
			var limit = req.query.limit || 5;
			if (!word) {
				return res.redirect("/");
			}
			Promise.all([postService.findPostByWordPageModel(offset, limit,word),
					termService.getAllCategory(),
					termService.getAllTags(),
					postService.findArticleArchive(),
					postService.findLastestPost(),
					pageService.findLastestPage()])
				.spread(function (pageModel, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "search",
						word: word,
						pageModel: pageModel
					};
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
exports.indexArticle = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/post(\d+)\/?$/,
		controller: function (req, res, next) {
			var slug = req.params[0];
			Promise.all([postService.get(slug),
					postService.getPrev(slug),
					postService.getNext(slug),
					postService.getCommentByPostId(slug),
					postService.getAllCategory(),
					postService.getAllTags(),
					postService.findArticleArchive(),
					postService.findLastestPost(),
					pageService.findLastestPage()])
				.spread(function (posts, prevPosts, nextPosts, commentList, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
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
				.caught(function (err) {
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

			Promise.all([postService.getPost(id),
					termService.getAllCategory(),
					termService.getAllTags(),
					postService.findArticleArchive(),
					postService.findLastestPost(),
					pageService.findLastestPage()])
				.spread(function (post, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
					req.previewPost = post;
					req.categoryList = categoryList;
					req.tagsList = tagsList;
					req.articleArchList = articleArchList;
					req.postNewestList = postNewestList;
					req.pageNewestList = pageNewestList;
					req.home = {
						type: "article"
					};
					return res.render("index", {"title": post.name});
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
			var offset = req.query.start || 0;
			var limit = req.query.limit || 5;
			var year = req.params[0];
			var month = req.params[1];
			Promise.all([postService.findByArchivePageModel({year: year, month: month}, offset, limit),
					termService.getAllCategory(),
					termService.getAllTags(),
					postService.findArticleArchive(),
					postService.findLastestPost(),
					pageService.findLastestPage()])
				.spread(function (pageModel, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
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
				.caught(function (error) {
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
			Promise.all([postService.findByCategoryPageModel(offset, limit,pargs1),
						termService.getBySlug(pargs1),
						termService.getAllCategory(),
						termService.getAllTags(),
						postService.findArticleArchive(),
						postService.findLastestPost(),
						pageService.findLastestPage()])
					.spread(function (pageModel, term, categoryList, tagsList, articleArchList, postNewestList, pageNewestList) {
						req.home = {
							type: "category",
							category: pargs1,
							pageModel: pageModel
						};
						console.log(JSON.stringify(pageModel, null, 4));
						req.categoryList = categoryList;
						req.tagsList = tagsList;
						req.articleArchList = articleArchList;
						req.postNewestList = postNewestList;
						req.pageNewestList = pageNewestList;
						res.render("index", {"title": term.name});
					}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	}
};

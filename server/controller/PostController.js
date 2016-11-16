var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
var TermTaxonomy = require("../models/wp_term_taxonomy");
var TermRelationship = require("../models/wp_term_relationships");
var Q = require("q");
/**
 * add user
 * @returns {Function}
 */
//管理接口
exports.doAjax = function () {
	return {
		"/admin/postList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			Post.getPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				error(err);
			});
		},
		"/admin/postAllTag.do": function (req, res, next) {
			Term.getAllTag().then(function (allTag) {
				res.json(allTag);
			}, function (err) {
				error(err);
			});
		},
		"/admin/postTagList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			Term.getTagPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				error(err);
			});
		},
		"/admin/postAllCategory.do": function (req, res, next) {
			Term.getAllCategory().then(function (allCategory) {
				res.json(allCategory);
			}, function (err) {
				error(err);
			});
		},
		"/admin/postCategoryList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			Term.getCategoryPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				error(err);
			});
		},
		"/admin/post_new.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_title = req_pargs.post_title;
			var term_id1 = req_pargs.term_id1;
			var term_id2 = req_pargs.term_id2;
			var post_content = req_pargs.post_content;
			var newPost = new Post({
				post_author: req.session.user.ID,
				post_title: post_title,
				post_content: post_content,
				post_date: new Date(),
				post_date_gmt: new Date(),
			});
			Post.save(newPost).then(function (okPacket) {
				var relationships1 = [okPacket.insertId, term_id1, 0];
				var relationships2 = [okPacket.insertId, term_id2, 0];
				var relations = [];
				if (term_id1) {
					relations.push(relationships1);
				}
				if (term_id2) {
					relations.push(relationships2);
				}
				return TermRelationship.saveMulti(relations);
			}).then(function (okPacket) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).fail(function (err) {
				res.render("admin/post_new", {"title": "Express", error: msg});
			});
		},
		"/admin/post_category.do": function (req, res, next) {
			var req_pargs = req.body;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var parent = req_pargs.parent;
			var description = req_pargs.description;
			var newTerm = new Term({
				name: name,
				slug: slug,
				term_group: 0
			});
			Term.save(newTerm).then(function (okPacket) {
				var newTaxonomy = new TermTaxonomy({
					term_id: okPacket.insertId,
					parent: parent,
					description: description,
					taxonomy: 'category',
					count: 0
				});
				return TermTaxonomy.save(newTaxonomy);
			}).then(function () {
				res.json({
					success: "ok",
					loginStatus: "1",
				})
			}).fail(function (err) {
				req.session.error = err.errorCode;
				res.redirect("/admin/post?post_type=category");
			});

		},
		"/admin/post_tag.do": function (req, res, next) {
			var req_pargs = req.body;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var description = req_pargs.description;
			var newTerm = new Term({
				name: name,
				slug: slug,
				term_group: 0
			});
			Term.save(newTerm).then(function (okPacket) {
				var newTaxonomy = new TermTaxonomy({
					term_id: okPacket.insertId,
					description: description,
					taxonomy: 'post_tag',
					count: 0
				});
				return TermTaxonomy.save(newTaxonomy);
			}).then(function (okPacket) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).fail(function (err) {
				console.log(err.message);
				req.session.error = err.message;
				res.redirect("/admin/post?post_type=tag");
			});
		},
		"/admin/delete_post.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			Post.delete(post_id).then(function (okPacket) {
				if (okPacket) {
					res.json({
						success: "ok",
						loginStatus: "1"
					});
				}
			}).fail(function (err) {
				res.json(err);
			});
		},
		"/admin/delete_category.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			TermTaxonomy.getByTermId(term_id).then(function (termtaxonomy) {
				var tempTermtax = termtaxonomy[0];
				if (tempTermtax.count > 0) {
					res.json({
						errorMessage: "不能删除，该分类下的文章数不为0！"
					});
				} else {
					Q.all([Term.delete(term_id), TermTaxonomy.delByTermId(term_id)]).then(function () {
						res.json({
							success: "ok",
							loginStatus: "1"
						});
					}).fail(function (err) {
						res.json(err);
					})
				}
			}).fail(function (err) {
				error(err)
			});
			function error(msg) {
				res.json(msg);
			}
		},
		"/admin/delete_tag.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			TermTaxonomy.getByTermId(term_id).then(function (termtaxonomy) {
				var tempTermtax = termtaxonomy[0];
				if (tempTermtax.count > 0) {
					res.json({
						errorMessage: "不能删除，该分类下的文章数不为0！"
					});
				} else {
					Q.all([Term.delete(term_id), TermTaxonomy.delByTermId(term_id)]).then(function () {
						res.json({
							success: "ok",
							loginStatus: "1"
						});
					}).fail(function (err) {
						res.json(err);
					})
				}
			}).fail(function (err) {
				error(err)
			});
			function error(msg) {
				res.json(msg);
			}
		},
		"/admin/get_post.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			Post.get(post_id).then(function (postList) {
				if (postList.length > 0) {
					res.json(postList[0]);
				} else {
					res.json({
						errorMessage: "文章不存在"
					});
				}
			}).fail(function (err) {
				error(err)
			});
			function error(msg) {
				res.json(msg);
			}
		},
		"/admin/edit_post.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			var post_title = req_pargs.post_title;
			var post_content = req_pargs.post_content;
			Post.update({
				ID: post_id,
				post_title: post_title,
				post_content: post_content
			}).then(function (okPacket) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).fail(function (err) {
				res.render("admin/post_new", {"title": "Express", error: msg});
			});
		}
	};
};
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
exports.managerGet = function () {
	return {
		url: "/admin/post",
		controller: function (req, res, next) {
			var post_type = req.query.post_type || "list";
			var pageNum = parseInt(req.query.pageNum) || 1;
			var pageSize = parseInt(req.query.pageSize) || 10;
			req.session.error = null;
			if (post_type == "list") {
				Post.getPage(pageNum, pageSize).then(function (pageModel) {
					req.pageModel = pageModel;
					res.render("admin/post", {
						post_type: "list",
					});
				}, function (err) {
					error(err);
				});
			} else if (post_type == "addUI") {
				Q.all([Term.getAllCategory(), Term.getAllTag()])
					.spread(function (list1, list2) {
						req.categoryList = list1;
						req.tagList = list2;
						res.render("admin/post", {
							post_type: "addUI",
						});
					})
					.fail(function (err) {
						error(err);
					});

			} else if (post_type == "category") {
				Q.all([Term.getAll(), Term.getPage(pageNum, pageSize)]).spread(function (allCategory, pageModel) {
					req.allCategory = allCategory;
					req.pageModel = pageModel;
					res.render("admin/post", {
						post_type: "category",
					});
				}).fail(function (err) {
					error(err);
				});
			} else if (post_type == "tag") {
				Term.getAllTag().then(function (list) {
					req.termsList = list;
					res.render("admin/post", {
						user_type: "tag",
					});
				}, function (err) {
					error(err);
				});
			}
			function error(msg) {
				res.render("admin/post", {"title": "Express", error: msg});
			}
		}
	}
};
exports.doGet = function () {
	return {
		"/admin/delete_post": function (req, res, next) {
			var post_id = req.query.postId;

		},
		"/admin/delete_category": function (req, res, next) {
			var term_id = req.query.termId;
			TermTaxonomy.getByTermId(term_id).then(function (termtaxonomy) {
				if(termtaxonomy.count>0){

				}else{

				}
			}).fail(function (err) {
				error(err)
			});
			function error(msg) {
				res.render("admin/post", {"title": "Express", error: msg});
			}
		}
	};
};
exports.doPost = function () {
	return {
		"/admin/post_new": function (req, res, next) {
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
				res.redirect("/admin/post?post_type=list");
			}).fail(function (err) {
				res.render("admin/post_new", {"title": "Express", error: msg});
			});
		},
		"/admin/post_category": function (req, res, next) {
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
				res.redirect("/admin/post?post_type=category");
			}).fail(function (err) {
				req.session.error = err.errorCode;
				res.redirect("/admin/post?post_type=category");
			});

		},
		"/admin/post_tag": function (req, res, next) {
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
				res.redirect("/admin/post?post_type=tag");
			}).fail(function (err) {
				console.log(err.message);
				req.session.error = err.message;
				res.redirect("/admin/post?post_type=tag");
			});
		}
	};
};
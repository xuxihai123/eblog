var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
var TermTaxonomy = require("../models/wp_term_taxonomy");
var TermRelationship = require("../models/wp_term_relationships");
/**
 * add user
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: "/",
		controller: function (req, res, next) {
			res.render("index", {"title": "Express"});
		}
	}
};
//管理接口
exports.managerGet = function () {
	return {
		url: "/admin/post",
		controller: function (req, res, next) {
			var post_type = req.query.post_type || "list";
			req.session.error = null;
			if (post_type == "list") {
				Post.getAll(function (err, list) {
					req.postsList = list;
					res.render("admin/post", {
						user_type: "list",
					});
				});
			} else if (post_type == "addUI") {
				Term.getAllCategory(function (err, list) {
					req.categoryList = list;
					Term.getAllTag(function (err, list) {
						req.tagList = list;
						res.render("admin/post", {
							post_type: "addUI",
						});
					});
				});

			} else if (post_type == "category") {
				Term.getAllCategory(function (err, list) {
					req.termsList = list;
					res.render("admin/post", {
						user_type: "category",
					});
				});
			} else if (post_type == "tag") {
				Term.getAllTag(function (err, list) {
					req.termsList = list;
					res.render("admin/post", {
						user_type: "tag",
					});
				});
			}
		}
	}
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

			Post.save(newPost, function (err, okPacket) {
				if (err) {
					req.session.error = err.errorCode;
					res.json(err);
					//res.redirect("/admin/post_new?post_type=category");
				} else {
					var relationships1 = [okPacket.insertId, term_id1, 0];
					var relationships2 = [okPacket.insertId, term_id2, 0];
					var relations = [];
					if (term_id1) {
						relations.push(relationships1);
					}
					if (term_id2) {
						relations.push(relationships2);
					}
					TermRelationship.saveMulti(relations, function (err, okPacket) {
						if (err) {
							res.json(err);
						} else {
							res.redirect("/admin/post?post_type=list");
						}
					});
				}
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

			Term.save(newTerm, function (err, okPacket) {
				if (err) {
					req.session.error = err.errorCode;
					res.redirect("/admin/post?post_type=category");
				} else {
					var newTaxonomy = new TermTaxonomy({
						term_id: okPacket.insertId,
						parent: parent,
						description: description,
						taxonomy: 'category',
						count: 0
					});
					TermTaxonomy.save(newTaxonomy, function (err, okPacket) {
						if (err) {
							req.session.error = err.errorCode;
							res.redirect("/admin/post?post_type=category");
						} else {
							res.redirect("/admin/post?post_type=category");
						}
					});
				}
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

			Term.save(newTerm, function (err, okPacket) {
				if (err) {
					console.log(err.message);
					req.session.error = err.message;
					res.redirect("/admin/post?post_type=tag");
				} else {
					var newTaxonomy = new TermTaxonomy({
						term_id: okPacket.insertId,
						description: description,
						taxonomy: 'post_tag',
						count: 0
					});
					TermTaxonomy.save(newTaxonomy, function (err, okPacket) {
						if (err) {
							req.session.error = err.message;
							console.log(err.message);
							res.redirect("/admin/post?post_type=tag");
						} else {
							res.redirect("/admin/post?post_type=tag");
						}
					});
				}
			});
		}
	};
};
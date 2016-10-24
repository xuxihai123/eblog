var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
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
			if (post_type == "list") {
				Post.getAll(function (err, list) {
					req.postsList = list;
					res.render("admin/post", {
						user_type: "list",
					});
				});
			} else if (post_type == "addUI") {
				res.render("admin/post", {
					post_type: "addUI",
				});
			} else if (post_type == "category") {
				Term.getAll(function (err, list) {
					req.termsList = list;
					res.render("admin/post", {
						user_type: "category",
					});
				});
			} else if (post_type == "tag") {
				res.render("admin/post", {
					post_type: "tag",
				});
			}
		}
	}
};
exports.doPost = function () {
	return {
		"/admin/post_category": function (req, res, next) {
			var req_pargs=req.body;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var parent = req_pargs.parent;
			var describe = req_pargs.describe;
			var newTerm = new Term({
				name:name,
				slug:slug,
				parent:parent,
				describe:describe,
			});
			Term.save(newTerm, function (err, term) {
				if(err){
					req.session.error = err;
					res.redirect("/admin/post?post_type=category");
				}else{
					res.redirect("/admin/post?post_type=category");
				}
			});
		},
		"/admin/post_tag": function (req, res, next) {
			var req_pargs=req.body;
			res.send("tag");
		}
	};
};
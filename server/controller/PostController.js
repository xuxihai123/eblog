//var Post = require("../bak/wp_posts");
//var Term = require("../bak/wp_terms");
//var TermTaxonomy = require("../bak/wp_term_taxonomy");
//var TermRelationship = require("../bak/wp_term_relationships");
//var Promise = require('bluebird');
///**
// * add user
// * @returns {Function}
// */
////管理接口
//exports.doAjax = function () {
//	return {
//		"/admin/postList.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var offset = req_pargs.offset || 0;
//			var limit = req_pargs.limit || 10;
//			Post.getPostPageModel(offset, limit).then(function (pageModel) {
//				res.json(pageModel);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/pageList.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var offset = req_pargs.offset || 0;
//			var limit = req_pargs.limit || 10;
//			Post.getPagePageModel(offset, limit).then(function (pageModel) {
//				res.json(pageModel);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/postAllTag.do": function (req, res, next) {
//			Term.getAllTags().then(function (allTag) {
//				res.json(allTag);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/postTagList.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var offset = req_pargs.offset || 0;
//			var limit = req_pargs.limit || 10;
//			Term.getTagPage(offset, limit).then(function (pageModel) {
//				res.json(pageModel);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/postAllCategory.do": function (req, res, next) {
//			Term.getAllCategory().then(function (allCategory) {
//				res.json(allCategory);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/postCategoryList.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var offset = req_pargs.offset || 0;
//			var limit = req_pargs.limit || 10;
//			Term.getCategoryPage(offset, limit).then(function (pageModel) {
//				res.json(pageModel);
//			}, function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/post_new.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_title = req_pargs.post_title;
//			var term_taxonomy_id1 = req_pargs.term_id1;
//			var term_taxonomy_id2 = req_pargs.term_id2;
//			var post_content = req_pargs.post_content;
//			var newPost = new Post({
//				post_author: req.session.user.ID,
//				post_title: post_title,
//				post_content: post_content,
//				post_date: new Date(),
//				post_date_gmt: new Date(),
//			});
//			Post.save(newPost).then(function (okPacket) {
//				var relationships1 = [okPacket.insertId, term_taxonomy_id1, 0];
//				var relationships2 = [okPacket.insertId, term_taxonomy_id2, 0];
//				var relations = [];
//				if (term_taxonomy_id1) {
//					relations.push(relationships1);
//				}
//				if (term_taxonomy_id2) {
//					relations.push(relationships2);
//				}
//				return TermRelationship.saveMulti(relations);
//			}).then(function (okPacket) {
//				res.json({
//					success: "ok",
//					loginStatus: "1"
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/page_new.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_title = req_pargs.post_title;
//			var post_content = req_pargs.post_content;
//			var newPost = new Post({
//				post_author: req.session.user.ID,
//				post_title: post_title,
//				post_content: post_content,
//				post_date: new Date(),
//				post_date_gmt: new Date()
//			});
//			newPost.post_type = "page";
//			Post.save(newPost).then(function (okPacket) {
//				res.json({
//					success: "ok",
//					loginStatus: "1"
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/post_category.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var name = req_pargs.name;
//			var slug = req_pargs.slug;
//			var parent = req_pargs.parent;
//			var description = req_pargs.description;
//			var newTerm = new Term({
//				name: name,
//				slug: slug,
//				term_group: 0
//			});
//			var newTaxonomy = new TermTaxonomy({
//				parent: parent,
//				description: description,
//				taxonomy: 'category',
//				count: 0
//			});
//			Term.saveWithTrans(newTerm,newTaxonomy).then(function (okPacket) {
//				res.json({
//					success:"ok",
//					loginStatus:"1"
//				});
//			}).fail(function (err) {
//					res.errorProxy("SqlException",err);
//			});
//
//		},
//		"/admin/post_tag.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var name = req_pargs.name;
//			var slug = req_pargs.slug;
//			var description = req_pargs.description;
//			var newTerm = new Term({
//				name: name,
//				slug: slug,
//				term_group: 0
//			});
//			var newTaxonomy = new TermTaxonomy({
//				description: description,
//				taxonomy: 'post_tag',
//				count: 0
//			});
//			Term.saveWithTrans(newTerm,newTaxonomy).then(function (okPacket) {
//				res.json({
//					success:"ok",
//					loginStatus:"1"
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException",err);
//			});
//		},
//		"/admin/delete_post.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			Post.delete(post_id).then(function (okPacket) {
//				if (okPacket) {
//					res.json({
//						success: "ok",
//						loginStatus: "1"
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/delete_page.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			Post.delete(post_id).then(function (okPacket) {
//				if (okPacket) {
//					res.json({
//						success: "ok",
//						loginStatus: "1"
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/delete_category.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var term_id = req_pargs.term_id;
//			TermTaxonomy.getByTermId(term_id).then(function (termtaxonomy) {
//				var tempTermtax = termtaxonomy[0];
//				if (tempTermtax.count > 0) {
//					res.json({
//						errorMessage: "不能删除，该分类下的文章数不为0！"
//					});
//				} else {
//					Promise.all([Term.delete(term_id), TermTaxonomy.delByTermId(term_id)]).then(function () {
//						res.json({
//							success: "ok",
//							loginStatus: "1"
//						});
//					}).fail(function (err) {
//						res.errorProxy("SqlException", err);
//					})
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/delete_tag.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var term_id = req_pargs.term_id;
//			TermTaxonomy.getByTermId(term_id).then(function (termtaxonomy) {
//				var tempTermtax = termtaxonomy[0];
//				if (tempTermtax.count > 0) {
//					res.json({
//						errorMessage: "不能删除，该分类下的文章数不为0！"
//					});
//				} else {
//					Promise.all([Term.delete(term_id), TermTaxonomy.delByTermId(term_id)]).then(function () {
//						res.json({
//							success: "ok",
//							loginStatus: "1"
//						});
//					}).fail(function (err) {
//						res.errorProxy("SqlException", err);
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/get_post.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			Post.get(post_id).then(function (postList) {
//				if (postList.length > 0) {
//					res.json(postList[0]);
//				} else {
//					res.errorProxy("NotFoundException", {
//						errorMessage: "文章不存在"
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/get_page.do":function(req,res,next){
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			Post.get(post_id).then(function (postList) {
//				if (postList.length > 0) {
//					res.json(postList[0]);
//				} else {
//					res.errorProxy("NotFoundException", {
//						errorMessage: "页面不存在"
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/get_category.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			Post.get(post_id).then(function (postList) {
//				if (postList.length > 0) {
//					res.json(postList[0]);
//				} else {
//					res.errorProxy("NotFoundException", {
//						errorMessage: "文章分类不存在"
//					});
//				}
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/edit_post.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			var post_title = req_pargs.post_title;
//			var post_content = req_pargs.post_content;
//			Post.update({
//				ID: post_id,
//				post_title: post_title,
//				post_content: post_content
//			}).then(function (okPacket) {
//				res.json({
//					success: "ok",
//					loginStatus: "1"
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/edit_page.do":function(req,res,next){
//			var req_pargs = req.body;
//			var post_id = req_pargs.post_id;
//			var post_title = req_pargs.post_title;
//			var post_content = req_pargs.post_content;
//			Post.update({
//				ID: post_id,
//				post_title: post_title,
//				post_content: post_content
//			}).then(function (okPacket) {
//				res.json({
//					success: "ok",
//					loginStatus: "1"
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/edit_category.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var term_id = req_pargs.term_id;
//			var name = req_pargs.name;
//			var slug = req_pargs.slug;
//			var parent = req_pargs.parent;
//			var description = req_pargs.description;
//			if (!term_id) {
//				res.json({
//					errorMessage: "term_id>>>?X?????"
//				});
//			}
//			Promise.all([
//				Term.update({
//					term_id: term_id,
//					name: name,
//					slug: slug
//				}),
//				TermTaxonomy.updateCategory({
//					term_id: term_id,
//					parent: parent,
//					description: description
//				})]).spread(function (okPacket1, okPacket2) {
//				res.json({
//					success: "ok",
//					loginStatus: "1",
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		},
//		"/admin/edit_tag.do": function (req, res, next) {
//			var req_pargs = req.body;
//			var term_id = req_pargs.term_id;
//			var name = req_pargs.name;
//			var slug = req_pargs.slug;
//			var description = req_pargs.description;
//			if (!term_id) {
//				res.json({
//					errorMessage: "term_id>>>?X?????"
//				});
//			}
//			Promise.all([
//				Term.update({
//					term_id: term_id,
//					name: name,
//					slug: slug
//				}),
//				TermTaxonomy.updateTag({
//					term_id: term_id,
//					description: description
//				})]).spread(function (okPacket1, okPacket2) {
//				res.json({
//					success: "ok",
//					loginStatus: "1",
//				});
//			}).fail(function (err) {
//				res.errorProxy("SqlException", err);
//			});
//		}
//	};
//};

var termService = require('../service/index').TermService;
//分类管理
exports.doAjax = function () {
	return {
		"/admin/addCategory.do": function (req, res, next) {
			var req_pargs = req.body;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var parent = req_pargs.parent;
			var description = req_pargs.description;
			var newTerm = {
				name: name,
				slug: slug,
				parent: parent,
				description: description
			};
			termService.addCategory(newTerm).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});

		},
		"/admin/addTag.do": function (req, res, next) {
			var req_pargs = req.body;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var description = req_pargs.description;
			var newTerm = {
				name: name,
				slug: slug,
				description: description
			};
			termService.addTag(newTerm).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deleteCategory.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			termService.removeTerm(term_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deleteTag.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			termService.removeTerm(term_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/updateCategory.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var parent = req_pargs.parent;
			var description = req_pargs.description;
			termService.updateCategory({
				term_id: term_id,
				name: name,
				slug: slug,
				parent: parent,
				description: description
			}).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/updateTag.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			var name = req_pargs.name;
			var slug = req_pargs.slug;
			var description = req_pargs.description;
			termService.updateTag({
				term_id: term_id,
				name: name,
				slug: slug,
				description: description
			}).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/termTagList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getTagPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getCategoryList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getCategoryPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getTagList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getTagPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getAllCategory.do": function (req, res, next) {
			termService.getAllCategory().then(function (allTag) {
				res.json(allTag);
			}, function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getAllTag.do": function (req, res, next) {
			termService.getAllTags().then(function (allTag) {
				res.json(allTag);
			}, function (error) {
				res.errorProxy(error);
			});
		}
	};
};
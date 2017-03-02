var termService = require('../service/index').TermService;
//分类管理
exports.doAjax =function() {
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
				parent:parent,
				description: description
			};
			termService.addCategory(newTerm).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.json({
					errorMessage: error.message
				});
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
				res.json({
					errorMessage: error.message
				});
			});
		},
		"/admin/deleteCategory.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			termService.remove(term_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.json({
					errorMessage: error.message
				});
			});
		},
		"/admin/deleteTag.do": function (req, res, next) {
			var req_pargs = req.body;
			var term_id = req_pargs.term_id;
			termService.remove(term_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.json({
					errorMessage: error.message
				});
			});
		},
		"/admin/termTagList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getTagPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/getCategoryList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getCategoryPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/getTagList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			termService.getAllCategory(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/getAllCategory.do":function (req, res, next) {
			termService.getAllCategory().then(function (allTag) {
				res.json(allTag);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/getAllTag.do": function (req, res, next) {
			termService.getAllTags().then(function (allTag) {
				res.json(allTag);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},

	};
};
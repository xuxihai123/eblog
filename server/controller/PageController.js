var PageService = require('../service').PageService;
//管理接口
exports.doPost=function() {
	return {
		"/admin/addPage.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_title = req_pargs.post_title;
			var post_content = req_pargs.post_content;
			var post_status = req_pargs.post_status;
            var dt=new Date();
            var gmt = new Date(dt.setMinutes(dt.getMinutes() + 480));
			PageService.addPage({
				post_author: req.session.user.ID,
				post_title: post_title,
				post_content: post_content,
				post_status: post_status,
				post_date: new Date(),
				post_date_gmt: new Date(),
                post_modified: gmt, //本地时间为dt+8*60
                post_modified_gmt: dt, //假设系统时间以GMT时间为准
			}).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deletePage.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			PageService.removePage(post_id).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getPage.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			PageService.getPage(post_id).then(function (page) {
				res.json(page);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/updatePage.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			var post_title = req_pargs.post_title;
			var post_content = req_pargs.post_content;
			var post_status = req_pargs.post_status;
			var dt=new Date();
			var gmt = new Date(dt.setMinutes(dt.getMinutes() + 480));
			PageService.updatePage({
				ID: post_id,
				post_title: post_title,
				post_status: post_status,
				post_content: post_content,
				post_modified: gmt, //本地时间为dt+8*60
				post_modified_gmt: dt, //假设系统时间以GMT时间为准
			}).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/pageList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			PageService.pageModelOfPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	};
};
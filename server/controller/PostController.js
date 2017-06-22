var postService = require('../service').PostService;
/**
 * add user
 * @returns {Function}
 */
//管理接口
exports.doAjax = function () {
	return {
		"/admin/addPost.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_title = req_pargs.post_title;
			var post_content = req_pargs.post_content;
			var post_status = req_pargs.post_status;
			var dt=new Date();
			var gmt = new Date(dt.setMinutes(dt.getMinutes() + 480));
			var user = req.session.user;
			postService.addPost({
				post_author: user.ID,
				post_title: post_title,
				post_content: post_content,
				post_status: post_status,
				post_date: gmt, //本地时间为dt+8*60
				post_date_gmt: dt, //假设系统时间以GMT时间为准
				post_modified: gmt, //本地时间为dt+8*60
				post_modified_gmt: dt, //假设系统时间以GMT时间为准
				termRelations: req_pargs.termRelations
			}).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deletePost.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			postService.removePost(post_id).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/updatePost.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			var post_title = req_pargs.post_title;
			var post_content = req_pargs.post_content;
			var post_status = req_pargs.post_status;
			var dt=new Date();
			var gmt = new Date(dt.setMinutes(dt.getMinutes() + 480));
			postService.updatePost({
				ID: post_id,
				post_title: post_title,
				post_content: post_content,
				post_status: post_status,
				post_modified: gmt, //本地时间为dt+8*60
				post_modified_gmt: dt, //假设系统时间以GMT时间为准
				termRelations:req_pargs.termRelations
			}).then(function (result) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getPost.do": function (req, res, next) {
			var req_pargs = req.body;
			var post_id = req_pargs.post_id;
			postService.getPost(post_id).then(function (post) {
				res.json(post);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/postList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			postService.pageModelOfPost(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	};
};

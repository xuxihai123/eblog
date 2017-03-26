var util = require("../utils/dateutils");
var commentService = require('../service').CommentService;
var Promise = require('bluebird');

exports.doPost = function () {
	return {
		"/comment/postComment.do": function (req, res, next) {
			var req_pargs = req.body;
			//客户端获取数据
			var comment_post_ID = req_pargs.post_id;
			var comment_author = req_pargs.author;
			var comment_author_email = req_pargs.email;
			var comment_author_url = req_pargs.url;
			var comment_content = req_pargs.content;
			var comment_parent = req_pargs.comment_parent;
			//计算或出来
			var comment_author_IP = req.headers.host.replace(/\:\d+/, "");
			var dt = new Date;
			dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
			var comment_date = util.format(new Date(), "yyyy-MM-dd HH:mm:ss");
			var comment_date_gmt = util.format(dt, "yyyy-MM-dd HH:mm:ss");
			var comment_agent = req.headers["user-agent"];
			var user_id = req.session.user && req.session.user.user_login;
			commentService.addComment({
				comment_post_ID: comment_post_ID,
				comment_author: comment_author,
				comment_author_email: comment_author_email,
				comment_author_url: comment_author_url,
				comment_content: comment_content,
				comment_parent: comment_parent,
				comment_author_IP: comment_author_IP,
				comment_agent: comment_agent,
				comment_date: comment_date,
				comment_date_gmt: comment_date_gmt,
				user_id: user_id
			}).then(function (result) {
				return res.render("result/success", {"title": "Express", "prevUrl": "/"});
			}, function (error) {
				console.log(error);
				res.render("result/error", {"title": "Express", error: error, "prevUrl": "/"});
			});
		}
	}
};

//管理接口
exports.doAjax = function () {
	return {
		"/admin/commentlist.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = Number(req_pargs.offset) || 0;
			var limit = Number(req_pargs.limit) || 10;
			commentService.getPageModel(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/getComment.do": function (req, res, next) {
			var req_pargs = req.body;
			var comment_ID = req_pargs.comment_ID;
			commentService.findById(comment_ID).then(function (commentList) {
				if (commentList.length > 0) {
					res.json(commentList[0]);
				} else {
					res.errorProxy("NotFoundException", {
						errorMessage: "没有找到该条评论"
					});
				}
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/commentApprove.do": function (req, res, next) {
			var req_pargs = req.body;
			var comment_ID = req_pargs.comment_ID;
			var comment_approved = req_pargs.comment_approved;
			commentService.updateByApprove({
				comment_ID: comment_ID,
				comment_approved: comment_approved
			}).then(function (okPacket) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deleteComment.do": function (req, res, next) {
			var req_pargs = req.body;
			var comment_ID = req_pargs.comment_ID;
			commentService.removeComment(comment_ID).then(function (okPacket) {
				res.json({
					success: "ok",
					loginStatus: "1"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	}
};
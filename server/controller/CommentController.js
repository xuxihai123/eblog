var Comment = require("../models/wp_comments");
var util = require("../utils/dateutils");
var Q = require("q");

exports.doPost = function () {
	return {
		"/comment/post_comment.do": function (req, res, next) {
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
			var comment = new Comment({
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
			});
			Comment.save(comment).then(function (okPacket) {
				return res.render("result/success", {"title": "Express", "prevUrl": "/"});
			}).fail(function (err) {
				res.render("result/error", {"title": "Express", error: err, "prevUrl": "/"});
			});
		}
	}
};

//管理接口
exports.doAjax = function () {
	return {
		"/admin/commentlist.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			Comment.getPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				error(err);
			});
		},
	}
};
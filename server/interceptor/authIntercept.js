/**
 * @description 客户端接口,user for permission intercept
 * */

'use strict';

module.exports = intercept;


function intercept(path, options) {
	var opts = options || {};

	var REGEX_VIEW_ADMIN = /^\/admin\/\w.*\.c$/;


	return function intercept(req, res, next) {

		if (REGEX_VIEW_ADMIN.test(req.url)) {
			checkPermission(req, res, next);
		} else {
			next();
		}
	};

	function checkPermission(req, res, next) {
		var session = req.session, now = new Date();
		if (!session.user) { //user not login
			req.session.error = "请您先登录!";
			res.redirect("/signin.c");
		} else if (session.cookie && session.cookie.expires < now) { //session timeout
			req.session.user = undefined;
			req.session.error = "回话超时,请重新登录!";
			res.redirect("/signin.c");
		} else {  //user login
			next();
		}
	}
};
/**
 * @description 客户端接口,user for permission intercept
 * */

'use strict';

module.exports = intercept;


function intercept(path, options) {
	var opts = options || {};

	return function intercept(req, res, next) {
		//var result = {},session=req.session,now=new Date();
		//if (/userManager\.do$/.test(req.url)||/verifycode\.do/.test(req.url)) { //开放userManager
		//	next();
		//} else {
		//	if (!session.$user) { //user not login
		//		result.success = "000000";
		//		result.authcode = "999998";
		//		result.error = {
		//			errmsg: "请您先登录!"
		//		}
		//		res.status(200).json(result);
		//	} else if (session.cookie&&session.cookie.expires<now) { //session timeout
		//		result.success = "000000";
		//		result.authcode = "999999";
		//		result.error = {
		//			errmsg: "回话超时,请重新登录!"
		//		}
		//		res.status(200).json(result);
		//	} else {  //user login
		//		next();
		//	}
		//}
		next();
	};
};
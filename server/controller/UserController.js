var dateutils = require("../utils/dateutils");
var userService = require('../service/index').UserService;
/**
 * add user
 * @returns {Function}
 */
//通用接口
exports.login = function () {
	return {
		url: "/user/signin",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;
			userService.userLogin(user_login, user_pass).then(function (user) {
				res.json({
					success: "ok",
					user: user
				});
			}).caught(function (error) {
				res.json({
					errorMessage: error.message
				});
			});
		}
	};
};
exports.signup = function () {
	return {
		url: "/user/signup",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var newUser = {
				user_login: req_pargs.user_login,
				user_pass: req_pargs.user_pass,
				user_email: req_pargs.user_email,
				user_url: req_pargs.user_url,
				display_name: req_pargs.display_name,
				user_nicename: req_pargs.user_nicename
			};
			userService.userRegister(newUser).then(function (user) {
				res.json({
					success: "ok",
					user: user
				});
			}).caught(function (error) {
				res.json({
					errorMessage: error.message
				});
			});
		}
	};
};
exports.signout = function () {
	return {
		url: "/user/signout",
		method: "post",
		controller: function (req, res, next) {
			var user = req.session.user;
			if (user) {
				req.session.user = undefined;
			}
			res.json({
				success: "ok",
				loginStatus: "0"
			});
		}
	};
};
exports.reset = function () {
	return {
		url: "/user/reset",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var reset_key = req_pargs.reset_key;
			var newUser = new User({
				user_login: req_pargs.user_login,
				user_pass: req_pargs.user_pass
			});
			//检查用户名是否已经存在
			userService.userResetPwd(newUser, reset_key).then(function (user) {
				return res.json({
					success: "ok",
					user: user
				});
			}).caught(function (error) {
				res.errorProxy("SqlException", err);
			});
		}
	};
};
//管理接口
exports.doAjax = function () {
	return {
		"/admin/getInfo.do": function (req, res, next) {
			var user = req.session.user;
			res.json({
				user_login: user.user_login,
				display_name: user.display_name,
				user_nicename: user.user_nicename,
				user_email: user.user_email,
				user_url: user.user_url,
				user_status: user.user_status
			});
		},
		"/admin/userList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			userService.getUserPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}).caught(function (error) {
				res.json({
					errorMsg: error.message
				});
			});
		},
		"/admin/userinfo.do": function (req, res, next) {
			var user_login = req.session.user.user_login;
			userService.getUserInfo(user_login).then(function (result) {
				req.user = result;
				res.json(req.user);
			}).caught(function (err) {
				res.json(err);
			});
		},
		"/admin/useradd.do": function (req, res, next) {
			var req_pargs = req.body;
			var newUser = {
				user_login: req_pargs.user_login,
				user_pass: req_pargs.user_pass,
				user_email: req_pargs.user_email,
				user_url: req_pargs.user_url,
				display_name: req_pargs.display_name,
				user_nicename: req_pargs.user_nicename
			};
			userService.addUser(newUser).then(function (user) {
				res.json({
					"success": "ok",
					user:user
				})
			}).caught(function (error) {
				res.json({
					errorType: "dfdsf",
					errorMsg: error.message
				});
			});
		},
		"/admin/delete_user.do": function (req, res, next) {
			var req_pargs = req.body;
			var user_id = req_pargs.user_id;
			userService.removeUser(user_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function(error){
				res.json({
					errorType: "fsf",
					errorMsg: error.message
				});
			})
		},
		"/setup/install.do": function (req, res, next) {
			var req_pargs = req.body;
			var newUser = {
				user_login: req_pargs.user_login,
				user_pass: req_pargs.user_pass,
				user_email: req_pargs.user_email,
				user_url: req_pargs.user_url,
				display_name: req_pargs.display_name,
				user_nicename: req_pargs.user_nicename
			};
			userService.setupManager(newUser).then(function (user) {
				req.app.set('setupFlag', false);
				res.redirect('/');
			}).caught(function (e) {
				res.json({
					errorType: "dfdsf",
					errorMsg: e.message
				});
			});
		}
	};
};
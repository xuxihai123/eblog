var userService = require('../service/index').UserService;
/**
 * add user
 * @returns {Function}
 */
//ajax接口
exports.doAjax = function () {
	return {
		"/user/login.do": function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;
			userService.userLogin(user_login, user_pass).then(function (user) {
				req.session.user = user;
				res.json({
					success: "ok",
					user: user
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/user/register.do": function (req, res, next) {
			//var req_pargs = req.body;
			//var newUser = {
			//	user_login: req_pargs.user_login,
			//	user_pass: req_pargs.user_pass,
			//	user_email: req_pargs.user_email,
			//	user_url: req_pargs.user_url,
			//	display_name: req_pargs.display_name,
			//	user_nicename: req_pargs.user_nicename
			//};
			//userService.userRegister(newUser).then(function (user) {
			//	res.json({
			//		success: "ok",
			//		user: user
			//	});
			//}).caught(function (error) {
			//	res.json({
			//		errorMessage: error.message
			//	});
			//});
			res.json({
				errorMessage: '接口不可用!'
			});
		},
		"/user/logout.do": function (req, res, next) {
			var user = req.session.user;
			if (user) {
				req.session.user = undefined;
			}
			res.json({
				success: "ok",
				loginStatus: "0"
			});
		},
		"/user/resetpwd.do": function (req, res, next) {
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
				res.errorProxy(error);
			});
		},
		"/admin/getLoginInfo.do": function (req, res, next) {
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
				res.errorProxy(error);
			});
		},
		"/admin/getUser.do": function (req, res, next) {
			var UserId = req.body.UserId;
			userService.getUserInfo(UserId).then(function (user) {
				res.json(user);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/addUser.do": function (req, res, next) {
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
					user: user
				})
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deleteUser.do": function (req, res, next) {
			var req_pargs = req.body;
			var user_id = req_pargs.user_id;
			userService.removeUser(user_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			})
		},
		"/admin/updateUser.do": function (req, res, next) {
			var req_pargs = req.body;
			var newUser = {
				ID:req_pargs.user_id,
				user_login: req_pargs.user_login,
				oldpassword: req_pargs.oldpassword,
				newpassword: req_pargs.newpassword,
				user_email: req_pargs.user_email,
				user_url: req_pargs.user_url,
				display_name: req_pargs.display_name,
				user_nicename: req_pargs.user_nicename
			};
			userService.updateUser(newUser).then(function (user) {
				res.json({
					"success": "ok",
					user: user
				})
			}).caught(function (error) {
				res.errorProxy(error);
			});
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
			}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	};
};
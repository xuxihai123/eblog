var User = require("../models/wp_users");
var crypto = require("crypto");
var dateutils = require("../utils/dateutils");
/**
 * add user
 * @returns {Function}
 */
//通用接口
exports.register = function () {
	return {
		url: "/user/signup",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;
			var user_pass2 = req_pargs.user_pass2;
			var display_name = req_pargs.display_name;
			var user_nicename = req_pargs.user_nicename;
			var user_url = req_pargs.user_url;
			var user_email = req_pargs.user_email;

			if (user_pass != user_pass2) {
				//req.flash('error', '两次输入的密码不一致!');
				req.session.error = "两次输入的密码不一致";
				return res.redirect('/signup.c');//返回主册页
			}
			//生成密码的 md5 值
			var md5 = crypto.createHash('md5'),
				user_pass = md5.update(user_pass).digest('hex');
			var newUser = new User({
				user_login: user_login,
				user_pass: user_pass,
				display_name: display_name,
				user_nicename: user_nicename,
				user_email: user_email,
				user_url: user_url,

			});
			//检查用户名是否已经存在
			User.get(newUser.user_login, function (err, user) {
				if (user) {
					req.session.error = "用户已存在";
					return res.redirect('/signup.c');//返回注册页
				} else {
					newUser.user_status = "0";
					newUser.user_activation_key = dateutils.randomStr(16);
					newUser.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
					//如果不存在则新增用户
					User.save(newUser, function (err, user) {
						if (err) {
							req.session.error = err;
							return res.redirect('/signup.c');//注册失败返回主册页
						}
						//req.session.user = user;//用户信息存入 session
						return res.redirect('/');//注册成功后返回主页
					});
				}
			});

		}
	};
};
exports.login = function () {
	return {
		url: "/user/signin",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;

			//生成密码的 md5 值
			var md5 = crypto.createHash('md5'),
				user_pass = md5.update(user_pass).digest('hex');
			var newUser = new User({
				user_login: user_login,
				user_pass: user_pass,
			});
			//检查用户名是否已经存在
			User.get(newUser.user_login, function (err, user) {
				if (user) {
					if (user.user_pass == newUser.user_pass) {
						req.session.user = user;
						return res.redirect('/admin/index.c');//进入主页
					} else {
						req.session.error = "密码错误";
						return res.redirect('/signin.c');//返回登录
					}

				} else {
					//如果不存在
					req.session.error = "用户不存在";
					return res.redirect('/signin.c');//返回登录
				}
			});
		}
	};
};
exports.signout = function () {
	return {
		url: "/user/signout",
		controller: function (req, res, next) {
			var user = req.session.user;
			if (user) {
				req.session.user = undefined;
			}
			return res.redirect('/signin.c');//返回登录
		}
	};
};
//管理接口
exports.managerGet = function () {
	return {
		url: "/admin/user",
		controller: function (req, res, next) {
			var operate = req.query.user_type || "list";
			if (operate == "list") {
				User.getAll(function (err, list) {
					req.usersList = list;
					res.render("admin/user", {
						user_type: "list",
						//request: req,
						//response: res,
						//session: req.session,
					});
				});

			} else if (operate == "addUI") {
				res.render("admin/user", {
					user_type: "addUI",
				});
			} else if (operate == "userinfo") {
				var user_login = req.session.user.user_login;
				User.get(user_login, function (err, user) {
					req.user = user;
					res.render("admin/user", {
						user_type: "userinfo",
					});
				});
			}

		}
	};
};

exports.managerPost = function () {
	return {
		url: "/admin/user_add",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;
			var display_name = req_pargs.display_name;
			var user_nicename = req_pargs.user_nicename;
			var user_url = req_pargs.user_url;
			var user_email = req_pargs.user_email;
			var newUser = new User({
				user_login: user_login,
				user_pass: user_pass,
				display_name: display_name,
				user_nicename: user_nicename,
				user_email: user_email,
				user_url: user_url,
			});
			User.get(newUser.user_login, function (err, user) {
				if (user) {
					req.session.error = "用户已存在";
					return res.redirect('/admin/user?user_type=addUI');//返回注册页
				} else {
					newUser.user_status = "0";
					newUser.user_activation_key = dateutils.randomStr(16);
					newUser.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
					//如果不存在则新增用户
					User.save(newUser, function (err, user) {
						if (err) {
							req.session.error = "添加出错！";
							return res.redirect('/admin/user?user_type=addUI');//注册失败返回主册页
						}
						//req.session.user = user;//用户信息存入 session
						return res.redirect('/admin/user?user_type=list');//注册成功后返回主页
					});
				}
			});
		}
	};
};
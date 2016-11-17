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
			User.get(newUser.user_login).then(function (user) {
				if (user && user.length > 0) {
					req.session.error = "用户已存在";
					return res.redirect('/signup.c');//返回注册页
				} else {
					newUser.user_status = "0";
					newUser.user_activation_key = dateutils.randomStr(16);
					newUser.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
					//如果不存在则新增用户
					User.save(newUser).then(function (result) {
						//req.session.user = user;//用户信息存入 session
						return res.redirect('/');//注册成功后返回主页
					}).fail(function (err) {
						req.session.error = err;
						return res.redirect('/signup.c');//注册失败返回主册页
					});
				}
			}, function (err) {
				req.session.error = err;
				return res.redirect('/signup.c');//注册失败返回主册页
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
			User.get(newUser.user_login).then(function (result) {
				if (result && result.length > 0) {
					var user = result[0];
					if (user.user_pass == newUser.user_pass) {
						req.session.user = user;
						res.json({
							user_login: user.user_login,
							display_name: user.display_name,
							user_nicename: user.user_nicename,
							user_email: user.user_email,
							user_url: user.user_url,
							user_status: user.user_status
						});
					} else {
						res.json({
							errorMessage: "密码错误！"
						});
					}

				} else {
					res.json({
						errorCode: "600404",
						errorMessage: "用户不存在！"
					});
				}
			}).fail(function (err) {
				req.session.error = err;
				console.log(err.message);
				return res.redirect('/signin.c');//注册失败返回主册页
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
			User.getPage(offset, limit).then(function (pageModel) {
				res.json(pageModel);
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/userinfo.do": function (req, res, next) {
			var user_login = req.session.user.user_login;
			User.get(user_login).then(function (result) {
				req.user = result[0];
				res.json(req.user);
			}).fail(function (err) {
				res.json(err);
			});
		},
		"/admin/useradd.do": function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			var user_pass = req_pargs.user_pass;
			var display_name = req_pargs.display_name;
			var user_nicename = req_pargs.user_nicename;
			var user_url = req_pargs.user_url;
			var user_email = req_pargs.user_email;
			var md5 = crypto.createHash('md5');
			user_pass = md5.update(user_pass).digest('hex');
			var newUser = new User({
				user_login: user_login,
				user_pass: user_pass,
				display_name: display_name,
				user_nicename: user_nicename,
				user_email: user_email,
				user_url: user_url,
			});
			User.get(newUser.user_login).then(function (err, user) {
				if (user && user.length > 0) {
					res.json({
						errorMessage: "用户已存在"
					});
				} else {
					newUser.user_status = "0";
					newUser.user_activation_key = dateutils.randomStr(16);
					newUser.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
					//如果不存在则新增用户
					User.save(newUser).then(function (result) {
						//req.session.user = user;//用户信息存入 session
						res.json({
							"success": "ok",
							"loginStatus": "1",
						})
					}).fail(function (err) {
						res.errorProxy("SqlException", err);
					});
				}
			}, function (err) {
				res.errorProxy("SqlException", err);
			});
		},
		"/admin/delete_user.do": function (req, res, next) {
			var req_pargs = req.body;
			var user_login = req_pargs.user_login;
			User.get(user_login).then(function (users) {
				if (users.length > 0) {
					var user = users[0];
					if (user.user_login == "admin" || user.user_login == "java_way") {
						res.errorProxy("SqlException", {
							errorMessage:"管理员用户不能删除"
						});
					} else {
						User.delete(user_login).then(function (okPacket) {
							res.json({
								success: "ok",
								loginStatus: "1"
							});
						}).fail(function (err) {
							res.errorProxy("SqlException", err);
						});
					}
				} else {
					res.json({
						errorCode: "600404",
						errorMessage: "用户不存在"
					});
				}
			}).fail(function (err) {
				res.errorProxy("SqlException", err);
			});
		}
	};
};
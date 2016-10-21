var User = require("../models/wp_users");
var crypto = require("crypto");
/**
 * add user
 * @returns {Function}
 */
exports.register = function () {
	return {
		url: "/user/sign",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var username = req_pargs.username;
			var password = req_pargs.password;
			var password2 = req_pargs.password2;
			var email = req_pargs.email;

			if (password != password2) {
				//req.flash('error', '两次输入的密码不一致!');
				//return res.redirect('/user/reg');//返回主册页
				res.send("两次输入的密码不一致");
			}
			//生成密码的 md5 值
			var md5 = crypto.createHash('md5'),
				password = md5.update(password).digest('hex');
			var newUser = new User({
				name: username,
				password: password,
				email: email
			});
			//检查用户名是否已经存在
			User.get(newUser.name, function (err, user) {
				if (user) {
					//req.flash('error', '用户已存在!');
					//return res.redirect('/user/reg');//返回注册页
					res.send("用户已存在");
				}else{
					//如果不存在则新增用户
					User.save(newUser, function (err, user) {
						if (err) {
							req.flash('error', err);
							res.send(err);
							//return res.redirect('/user/reg');//注册失败返回主册页
						}
						//req.session.user = user;//用户信息存入 session
						//req.flash('success', '注册成功!');
						res.send("注册成功");
						//res.redirect('/');//注册成功后返回主页
					});
				}
			});

		}
	};
};
exports.login = function () {
	return {
		url: "/user/login",
		method: "post",
		controller: function (req, res, next) {
			var req_pargs = req.body;
			var username = req_pargs.username;
			var password = req_pargs.password;

			//生成密码的 md5 值
			var md5 = crypto.createHash('md5'),
					password = md5.update(password).digest('hex');
			var newUser = new User({
				name: username,
				password: password,
			});
			//检查用户名是否已经存在
			User.get(newUser.name, function (err, user) {
				if (user) {
					if(user.password==newUser.password) {
						res.send("登录成功！");
					}else{
						res.send("登录失败！");
					}

				}else{
					//如果不存在
					res.send("用户不存在！");
				}
			});
		}
	};
};
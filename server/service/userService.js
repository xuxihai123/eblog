"use strict";
var User = require("../models").User;
var pageHelper = require('../utils/pageHelper');
var Promise = require('bluebird');
var crypto = require('crypto');
var dateutils = require('../utils/dateutils');
module.exports = {
	userLogin: function (username, password) {
		return new Promise(function (resolve, reject) {
			var md5 = crypto.createHash('md5');
			password = md5.update(password).digest('hex');
			User.findOne({
				where: {
					user_login: username
				}
			}).then(function (user) {
				if (user) {
					if (user.user_pass !== password) {
						reject({
							errorMessage: "密码错误！"
						});
					} else {
						delete user.user_pass;
						resolve(user);
					}
				} else {
					reject({
						errorCode: "600404",
						errorMessage: "用户不存在！"
					});
				}
			});
		});
	},
	userRegister: function (user) {
		return new Promise(function (resolve, reject) {
			User.findOne({
				where: {
					user_login: username
				}
			}).then(function (result) {
				if (result) {
					reject({
						errorMessage: "用户已存在！"
					});
				} else {
					resolve(this.addUser(user));
				}
			});
		});
	},
	userResetPwd: function (user, key) {
		return new Promise(function (resolve, reject) {
			if (key) {
				User.findOne({
					where: {
						user_login: username
					}
				}).then(function (result) {
					if (result === null) {
						reject({
							errorMessage: "用户不已存在！"
						});
					} else {
						resolve(this.updateUser(user));
					}
				});
			} else {
				reject({
					errorMessage: "key...is need！"
				})
			}

		});
	},
	addUser: function (user) {
		var md5 = crypto.createHash('md5');
		user.user_pass = md5.update(user.user_pass).digest('hex');
		user.user_status = "0";
		user.user_activation_key = dateutils.randomStr(16);
		user.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		return User.create.apply(User, arguments);
	},
	setupManager: function (user) {
		user.user_level = 9;
		return this.addUser(user);
	},
	removeUser: function (user_id) {
		return new Promise(function (resolve, reject) {
			User.destroy({
				where: {
					ID: user_id
				}
			}).then(function (result) {
				resolve(result);
			}).caught(function (error) {
				reject(error);
			});
		});
	},
	updateUser: function (user) {
		return new Promise(function(resolve,reject){
			if(!user.ID){
				reject({
					errorCode: "600404",
					errorMessage: "ID必须！"
				});
			}else if(!user.oldpassword){
				reject({
					errorCode: "600404",
					errorMessage: "password必须！"
				});
			}else{
				User.findOne({
					where:{
						ID:user.ID
					}
				}).then(function(selectUser){
					var md5 = crypto.createHash('md5');
					user.user_pass = md5.update(user.oldpassword).digest('hex');
					if(user.user_pass===selectUser.user_pass){
						resolve(selectUser.update({
							user_login:user.user_login,
							user_email:user.user_email,
							user_nicename:user.user_nicename,
							display_name:user.display_name,
							user_url:user.user_url
						}));
					}else{
						reject({
							errorCode: "600404",
							errorMessage: "密码错误！"
						});
					}
				})
			}


		});
	},
	getUserInfo: function (UserId) {
		return new Promise(function (resolve, reject) {
			User.findOne({
				where: {
					ID: UserId
				}
			}).then(function (user) {
				if (user) {
					delete user.user_pass;
					resolve(user);
				} else {
					reject({
						errorCode: "600404",
						errorMessage: "用户不存在！"
					});
				}
			});
		});
	},
	getUserPage: function (offset, limit) {
		return new Promise(function (resove, reject) {
			User.findAndCountAll({
				offset: offset,
				limit: limit,
				attributes:{
					exclude:['user_pass','user_activation_key']
				}
			}).then(function (result) {
				var pageObj = new pageHelper.PageModel(offset, limit, result.rows, result.count);
				resove(pageObj);
			}).caught(function (e) {
				reject(e);
			});
		});
	}
};
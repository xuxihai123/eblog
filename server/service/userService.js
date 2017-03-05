"use strict";
var userDao = require("../dao").UserDao;
var pageHelper = require('../utils/pageHelper');
var Promise = require('bluebird');
var crypto = require('crypto');
var dateutils = require('../utils/dateutils');
module.exports = {
	userLogin: function (username, password) {
		return new Promise(function (resolve, reject) {
			var md5 = crypto.createHash('md5');
			password = md5.update(password).digest('hex');
			userDao.findByName(username).then(function (user) {
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
			userDao.findByName(user.user_login).then(function (result) {
				if (result) {
					reject({
						errorCode:"600404",
						errorMessage: "用户已存在！"
					});
				} else {
					userDao.create(user).then(function (result) {
						resolve(result);
					}, function (error) {
						reject({
							errorCode:"591000",
							errorMessage:"注册用户失败",
							error:error
						});
					});
				}
			});
		});
	},
	userResetPwd: function (user, key) {
		return new Promise(function (resolve, reject) {
			if (key) {
				userDao.findByName(user.user_login).then(function (result) {
					if (result === null) {
						reject({
							errorMessage: "用户不已存在！"
						});
					} else {
						user.ID = result.ID;
						userDao.update(user).then(function(result){
							resolve(result);
						},function(error){
							reject({
								errorCode:"591000",
								errorMessage:"重设置密码失败!",
								error:error
							});
						});
					}
				});
			} else {
				reject({
					errorCode: "123192",
					errorMessage: "key...is need！"
				});
			}

		});
	},
	addUser: function (user) {
		var md5 = crypto.createHash('md5');
		user.user_pass = md5.update(user.user_pass).digest('hex');
		user.user_status = "0";
		user.user_activation_key = dateutils.randomStr(16);
		user.user_registered = dateutils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		return new Promise(function(resolve,reject){
			userDao.findByName(user.user_login).then(function (result) {
				if (result) {
					reject({
						errorMessage: "用户已存在！"
					});
				} else {
					userDao.create(user).then(function(result){
						resolve(result);
					},function(error){
						reject({
							errorCode:"591000",
							errorMessage:"添加用户失败",
							error:error
						});
					});
				}
			});
		})
	},
	setupManager: function (user) {
		user.user_level = 9;
		return this.addUser(user);
	},
	removeUser: function (user_id) {
		return new Promise(function (resolve, reject) {
			if(!user_id){
				reject({
					errorMessage: "user_id is need"
				});
			}
			userDao.remove(user_id).then(function (result) {
				resolve(result);
			}, function (error) {
				reject({
					errorCode:"591000",
					errorMessage:"删除用户失败",
					error:error
				})
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
				userDao.getById(user.ID).then(function(selectUser){
					if(!selectUser){
						reject({
							errorCode: "600404",
							errorMessage: "用户不存在！"
						});
					}else{
						var md5 = crypto.createHash('md5');
						user.user_pass = md5.update(user.oldpassword).digest('hex');
						if(user.user_pass===selectUser.user_pass){
							var newUser = {
								user_login: user.user_login,
								user_email: user.user_email,
								user_nicename: user.user_nicename,
								display_name: user.display_name,
								user_url: user.user_url
							};
							newUser.ID = selectUser.ID;
							userDao.update(newUser).then(function(result){
								resolve(result);
							},function(error){
								reject({
									errorCode: "591000",
									errorMessage: "更新用户失败！"
								});
							});
						}else{
							reject({
								errorCode: "600404",
								errorMessage: "密码错误！"
							});
						}
					}
				},function(error){
					reject({
						errorCode: "591000",
						errorMessage: "更新用户失败！"
					});
				});
			}
		});
	},
	getUserInfo: function (UserId) {
		return new Promise(function (resolve, reject) {
			userDao.getById(UserId).then(function (user) {
				if (user) {
					delete user.user_pass;
					resolve(user);
				} else {
					reject({
						errorCode: "600404",
						errorMessage: "用户不存在！"
					});
				}
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取用户信息失败！",
					errorSource:error
				});
			});
		});
	},
	getUserPage: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			userDao.getPageModel(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取用户列表失败！",
					errorSource: error
				});
			});
		});
	}
};
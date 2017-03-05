"use strict";
var User = require("../models").User;
var pageHelper = require('../utils/pageHelper');
module.exports = {
	create: function (user) {
		return User.create(user);
	},
	remove: function (user) {
		return User.destroy({
			where: {
				ID: user.ID
			}
		});
	},
	update: function (user) {
		return User.update(user, {
			where: {
				ID: user.ID
			}
		});
	},
	getById: function (id) {
		return User.findOne({
			where: {
				ID: id
			}
		});
	},
	findAll: function () {
		return User.findAll();
	},
	findByName: function (username) {
		return User.findOne({
			where: {
				user_login: username
			}
		});
	},
	getPageModel: function (offset, limit) {
		return User.findAndCountAll({
			offset: offset,
			limit: limit,
			attributes: {
				exclude: ['user_pass', 'user_activation_key']
			}
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	}
};
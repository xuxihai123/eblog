"use strict";
var models = require("../models");
var Post = models.Post;
var pageHelper = require('../utils/pageHelper');
module.exports = {
	create2: function (post, transaction) {
		return Post.create(post, {
			include: [
				{
					model: models.TermRelationShip,
					as: "termRelations",
					transaction: transaction
				}
			],
			transaction: transaction
		});
	},
	remove: function (post) {
		return Post.destroy({
			where: {
				ID: post.ID
			}
		});
	},
	update: function (post) {
		return Post.update(post, {
			where: {
				ID: post.ID
			}
		});
	},
	getById: function (id) {
		return Post.findOne({
			where: {
				ID: id
			}
		});
	},
	findAll: function () {
		return Post.findAll();
	},
	getPageModel1: function (offset, limit) {
		return Post.scope("post").findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model:models.User,
					as: "user"
				},{
					model:models.TermTaxonomy,
					as:"termTaxonomys"
				}
			]
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},
	getPageModel2: function (offset, limit) {
		return Post.scope("page").findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model:models.User,
					as: "user"
				},{
					model:models.TermTaxonomy,
					as:"termTaxonomys"
				}
			]
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	}
};
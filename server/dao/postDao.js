"use strict";
var models = require("../models");
var sequelize = models.sequelize;
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
		return Post.scope("post", "date").findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model: models.User,
					as: "user"
				}, {
					model: models.TermTaxonomy,
					as: "termTaxonomys"
				}
			]
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},
	getPageModel2: function (offset, limit) {
		return Post.scope("page", "date").findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model: models.User,
					as: "user"
				}, {
					model: models.TermTaxonomy,
					as: "termTaxonomys"
				}
			]
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},
	//findArticleArchive: 'select year(post_date) as year,month(post_date) as month,count(ID) as archive_count ' +
	//'from wp_posts ' +
	//'where post_type=\'post\' and post_status=\'publish\' ' +
	//'group by year(post_date),month(post_date) ' +
	//'order by year(post_date) desc,month(post_date)desc',
	getArchive: function (offset, limit) {
		return Post.findAll({
			attributes: [
				[sequelize.fn('year', sequelize.col('post_date')), "year"],
				[sequelize.fn('month', sequelize.col('post_date')), "month"],
				[sequelize.fn('count', sequelize.col('ID')), "archive_count"]
			],
			group:[
				[sequelize.fn('year', sequelize.col('post_date'))],
				[sequelize.fn('month', sequelize.col('post_date'))]
			],
			order:[
				[sequelize.fn('year', sequelize.col('post_date')), 'DESC'],
				[sequelize.fn('month', sequelize.col('post_date')), 'DESC']
			]
		});
	},
	getLastestPost: function (count) {
		return Post.scope("page", "date").findAndCountAll({
			limit: count,
			include: [
				{
					model: models.User,
					as: "user"
				}, {
					model: models.TermTaxonomy,
					as: "termTaxonomys"
				}
			]
		});
	},
	getLastestPage: function (count) {
		return Post.scope("page", "date").findAndCountAll({
			limit: count,
			include: [
				{
					model: models.User,
					as: "user"
				}, {
					model: models.TermTaxonomy,
					as: "termTaxonomys"
				}
			]
		});
	}
};
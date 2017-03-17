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
	getPrev:function(id){
		return Post.findOne({
			where: {
				ID: {
					$lt:id
				}
			}
		});
	},
	getNext:function(id){
		return Post.findOne({
			where: {
				ID: {
					$gt:id
				}
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
			group: [
				[sequelize.fn('year', sequelize.col('post_date'))],
				[sequelize.fn('month', sequelize.col('post_date'))]
			],
			order: [
				[sequelize.fn('year', sequelize.col('post_date')), 'DESC'],
				[sequelize.fn('month', sequelize.col('post_date')), 'DESC']
			]
		});
	},
	getLastestPost: function (count) {
		return Post.scope("post", "date").findAndCountAll({
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
	},
	findByWord: function (offset, limit, word) {
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
			],
			where: {
				post_title: {
					$like: '%' + word + '%'
				}
			}
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},
	//获取所有文章的归档，即年月集合
	//findByYearMonthPageModel: 'select *  from wp_posts ' +
	//'where year(post_date)=? and month(post_date)=? and post_type=\'post\' and post_status=\'publish\' ' +
	//'order by post_date desc',
	findByArchive: function (offset, limit, archive) {
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
			],
			where: sequelize.and(
				sequelize.where(sequelize.fn('year', sequelize.col('post_date')), archive.year),
				sequelize.where(sequelize.fn('month', sequelize.col('post_date')), archive.month)
			)
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},

	findByCategory: function (offset, limit, category) {
		return Post.scope("post", "date").findAndCountAll({
			offset: offset,
			limit: limit,
			include: [
				{
					model: models.User,
					as: "user"
				}, {
					model: models.TermRelationShip,
					where: {
						term_id: {
							$eq: sequelize.col('term_relationship.term_id')
						}
					}
				}
			]
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	}

};
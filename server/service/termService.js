"use strict";
var Term = require("../models").Term;
var models = require("../models");
var TermTaxonomy = require("../models").TermTaxonomy;
var pageHelper = require('../utils/pageHelper');
var Promise = require('bluebird');
module.exports = {
	addCategory: function (term) {
		return new Promise(function (resolve, reject) {
			if (term.name && term.slug) {
				models.sequelize.transaction().then(function (t) {
					return Term.create(term, {transaction: t}).then(function (term) {
						var termTaxonomy = {
							term_id: term.term_id,
							parent: term.parent || 0,
							taxonomy: "category",
							description: description
						};
						TermTaxonomy.create(termTaxonomy);
					}).then(t.commit.bind(t), t.rollback.bind(t));
				}).then(function (result) {
					resolve(result);
				}, function (error) {
					reject({
						errorMessage: error.message
					});
				});
			} else {
				reject({
					errorMessage: "分类名和别名不能为空!"
				});
			}
		});
	},
	addTag: function (term) {
		return new Promise(function (resolve, reject) {
			if (term.name && term.slug) {
				models.sequelize.transaction().then(function (t) {
					Term.create(term, {transaction: t}).then(function (term) {
						var termTaxonomy = {
							term_id: term.term_id,
							taxonomy: "post_tag",
							description: description
						};
						resolve(TermTaxonomy.create(termTaxonomy, {transaction: t}));
					}).then(t.commit.bind(t), t.rollback.bind(t)).caught(function (error) {
						reject({
							errorMessage: error.message
						});
					})
				}).caught(function (error) {
					reject({
						errorMessage: error.message
					});
				});
			} else {
				reject({
					errorMessage: "标签名和别名不能为空!"
				});
			}
		});
	},
	removeTerm: function (termId) {
		return new Promise(function (resolve, reject) {
			if (!termId) {
				return reject({
					errorMessage: "termId不能为空!"
				});
			}
			Term.findOne({
				where: {
					term_id: termId
				}
			}).then(function (term) {
				if (term) {
					if (term.termTaxonomy.count > 0) {
						reject({
							errorMessage: "不能删除，该分类下的文章数不为0！"
						});
					} else {
						models.sequelize.transaction().then(function (t) {
							term.termTaxonomy.destory({transaction: t}).then(function (term) {
								var termTaxonomy = {
									term_id: term.term_id,
									taxonomy: "post_tag",
									description: description
								};
								resolve(term.destory({transaction: t}));
							}).then(t.commit.bind(t), t.rollback.bind(t)).caught(function (error) {
								reject({
									errorMessage: error.message
								});
							})
						}).caught(function (error) {
							reject({
								errorMessage: error.message
							});
						});
					}

				} else {
					reject({
						errorMessage: "term未找到!"
					});
				}
			}).caught(function (error) {
				reject(error);
			});
		});
	},
	getCategoryPage: function (offset, limit) {
		return new Promise(function (resove, reject) {
			Term.findAndCountAll({
				offset: offset,
				limit: limit,

				include: [{
					model: models.TermTaxonomy, where: {
						taxonomy: "category",
					}
				}]
			}).then(function (result) {
				var pageObj = new pageHelper.PageModel(offset, limit, result.rows, result.count);
				resove(pageObj);
			}).caught(function (e) {
				console.log(e);
				reject(e);
			});
		});
	},

	getTagPage: function (offset, limit) {
		return new Promise(function (resove, reject) {
			Term.findAll({
				include: [{
					model: models.TermTaxonomy, where: {
						taxonomy: "post_tag",
					}
				}]
			}).then(function (result) {
				var pageObj = new pageHelper.PageModel(offset, limit, result.rows, result.count);
				resove(pageObj);
			}).caught(function (e) {
				console.log(e);
				reject(e);
			});
		});
	},
	getAllCategory: function () {
		return new Promise(function (resove, reject) {
			Term.findAll({
				include: [{
					model: models.TermTaxonomy,
					where: {
						taxonomy: "category",
					}
				}]
			}).then(function (result) {
				resove(result);
			}).caught(function (e) {
				console.log(e);
				reject(e);
			});
		});
	},
	getAllTags: function (offset, limit) {
		return new Promise(function (resove, reject) {
			Term.findAll({

				include: [{
					model: models.TermTaxonomy,
					where: {
						taxonomy: "post_tag",
					}
				}]
			}).then(function (result) {
				resove(result.rows);
			}).caught(function (e) {
				console.log(e);
				reject(e);
			});
		});
	}
};
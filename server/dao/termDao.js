"use strict";
var Term = require("../models").Term;
var TermTaxonomy = require("../models").TermTaxonomy;
var pageHelper = require('../utils/pageHelper');


module.exports = {
	create: function (term, options) {
		return Term.create(term, options);
	},
	create2: function (term, transaction) {
		return Term.create(term, {
			include: [
				{
					model: TermTaxonomy,
					as: "termTaxonomy",
					transaction: transaction
				}
			],
			transaction: transaction
		});
	},
	remove: function (term) {
		return Term.destroy({
			where: {
				term_id: term.term_id
			}
		});
	},
	update: function (term, transaction) {
		return Term.update(term, {
			where: {
				term_id: term.term_id
			},
			transaction: transaction
		});
	},
	getById: function (term_id) {
		return Term.findOne({
			where: {
				term_id: term_id
			},
			include: [
				{
					model: TermTaxonomy,
					as: "termTaxonomy",
				}
			]
		});
	},
	findBySlug:function(slug){
		return Term.findOne({
			where: {
				slug: slug
			},
			include: [
				{
					model: TermTaxonomy,
					as: "termTaxonomy",
				}
			]
		});
	},
	findAllCategory: function () {
		return Term.scope({method: ["incTable", TermTaxonomy, "category"]}).findAll();
	},
	findAllTag: function () {
		return Term.scope({method: ["incTable", TermTaxonomy, "post_tag"]}).findAll();
	},
	getCategoryPage: function (offset, limit) {
		return Term.scope({method: ["incTable", TermTaxonomy, "category"]})
			.findAndCountAll({
				offset: offset,
				limit: limit,
			}).then(function (result) {
				return new pageHelper.PageModel(offset, limit, result.rows, result.count);
			});
	},
	getTagPage: function (offset, limit) {
		return Term.scope({method: ["incTable", TermTaxonomy, "post_tag"]})
			.findAndCountAll({
				offset: offset,
				limit: limit,
			}).then(function (result) {
				return new pageHelper.PageModel(offset, limit, result.rows, result.count);
			});
	},
	termFindPost:function(offset,limit,slug){
		return this.findBySlug(slug).then(function(term){
			var taxonomy = term.termTaxonomy;
			return taxonomy.getPosts().then(function(posts){
				var count=posts.length;
				var rows=posts.slice(offset, limit);
				return new pageHelper.PageModel(offset, limit, rows, count)
			});
		});
	}
};
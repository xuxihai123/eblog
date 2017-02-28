"use strict";
var Term = require("../models").Term;
var TermTaxonomy = require("../models").TermTaxonomy;
var pageHelper = require('../utils/pageHelper');
var Promise = require('bluebird');
module.exports = {
	addCategory:function(term){
		return new Promise(function(resolve,reject){
			if(term.name&&term.slug){
				resolve(Term.create(term).then(function(term){
					term.termTaxonomy.term_id=term.term_id;
					return TermTaxonomy.create(term.termTaxonomy);
				}));
			}else{
				reject({
					errorMessage:"分类名和别名不能为空!"
				});
			}
		});
	},
	addTag:function(term){
		return new Promise(function(resolve,reject){
			if(term.name&&term.slug){
				resolve(Term.create(term));
			}else{
				reject({
					errorMessage:"标签名和别名不能为空!"
				});
			}
		});
	},
	removeTerm:function(termId){
		return new Promise(function (resolve, reject) {
			if(!termId){
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
					term.destroy();
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
	},
	getTagPage:function(offset,limit){
		return new Promise(function (resove, reject) {
			Term.findAndCountAll({
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
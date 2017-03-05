"use strict";
var transaction = require('../dao').transaction;
var termDao = require('../dao').TermDao;
var taxonomyDao = require('../dao').TaxonomyDao;
var Promise = require('bluebird');
module.exports = {
	addCategory: function (term) {
		return new Promise(function (resolve, reject) {
			if (term.name && term.slug) {
				transaction().then(
					function (trans) {
						term.termTaxonomy = {
							taxonomy: "category",
							parent: term.parent || 0,
							description: term.description
						};
						return termDao.create2(term, trans).then(
							function (result) {
								return trans.commit().then(function () {
									resolve(result);
								});
							},
							function (error) {
								return trans.rollback(function () {
									reject({
										errorCode: "591000",
										errorMessage: "创建分类失败！",
										errorSource: error
									});
								});
							});
					},
					function (error) {
						reject({
							errorCode: "591000",
							errorMessage: "创建事务失败！",
							errorSource: error
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
				transaction().then(
						function (trans) {
							term.termTaxonomy = {
								taxonomy: "post_tag",
								description: term.description
							};
							return termDao.create2(term, trans).then(
									function (result) {
										return trans.commit().then(function () {
											resolve(result);
										});
									},
									function (error) {
										return trans.rollback(function () {
											reject({
												errorCode: "591000",
												errorMessage: "创建标签失败！",
												errorSource: error
											});
										});
									});
						},
						function (error) {
							reject({
								errorCode: "591000",
								errorMessage: "创建事务失败！",
								errorSource: error
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
			termDao.getById(termId).then(function (term) {
				if (term) {
					if (term.termTaxonomy.count > 0) {
						reject({
							errorMessage: "不能删除，该分类下的文章数不为0！"
						});
					} else {
						return termDao.remove(term).then(function (result) {
								resolve(result);
							},
							function (error) {
								reject({
									errorCode: "591000",
									errorMessage: "删除分类标签失败！",
									errorSource: error
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
	updateCategory: function (term) {
		return new Promise(function (resolve, reject) {
			if (term.term_id&&term.name && term.slug) {
				transaction().then(
					function (t) {
						termDao.update(term, t).then(function (result) {
							var termTaxonomy = {
								term_id: term.term_id,
								parent: term.parent || 0,
								description: term.description
							};
							return taxonomyDao.update(termTaxonomy,t);
						}).then(function (result) {
							t.commit().then(function () {
								resolve(result);
							});
						}, function (error) {
							t.rollback(function () {
								reject({
									errorCode: "591000",
									errorMessage: "更新分类失败！",
									errorSource: error
								});
							});
						});

					},
					function (error) {
						reject({
							errorCode: "591000",
							errorMessage: "创建事务失败！",
							errorSource: error
						});
					});
			} else {
				reject({
					errorMessage: "分类ID,分类名和别名不能为空!"
				});
			}
		});
	},
	updateTag: function (term) {
		return new Promise(function (resolve, reject) {
			if (term.term_id&&term.name && term.slug) {
				transaction().then(
						function (t) {
							termDao.update(term, t).then(function (result) {
								var termTaxonomy = {
									term_id: term.term_id,
									description: term.description
								};
								return taxonomyDao.update(termTaxonomy,t);
							}).then(function (result) {
								t.commit().then(function () {
									resolve(result);
								});
							}, function (error) {
								t.rollback(function () {
									reject({
										errorCode: "591000",
										errorMessage: "更新标签失败！",
										errorSource: error
									});
								});
							});

						},
						function (error) {
							reject({
								errorCode: "591000",
								errorMessage: "创建事务失败！",
								errorSource: error
							});
						});
			} else {
				reject({
					errorMessage: "标签ID,标签名和别名不能为空!"
				});
			}
		});
	},
	getCategoryPage: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			offset = offset || 0;
			limit = limit || 10;
			termDao.getCategoryPage(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取分类失败！",
					errorSource: error
				});
			});
		});
	},

	getTagPage: function (offset, limit) {
		return new Promise(function (resolve, reject) {
			offset = offset || 0;
			limit = limit || 10;
			termDao.getTagPage(offset, limit).then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取标签失败！",
					errorSource: error
				});
			});
		});
	},
	getAllCategory: function () {
		return new Promise(function (resolve, reject) {
			termDao.findAllCategory().then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取分类失败！",
					errorSource: error
				});
			});
		});
	},
	getAllTags: function () {
		return new Promise(function (resolve, reject) {
			termDao.findAllTag().then(function (pageModel) {
				resolve(pageModel);
			}, function (error) {
				reject({
					errorCode: "591000",
					errorMessage: "获取标签失败！",
					errorSource: error
				});
			});
		});
	}
};
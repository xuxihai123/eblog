var User = require("../models/wp_users");
var Post = require("../models/wp_posts");
var Term = require("../models/wp_terms");
/**
 * add user
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: "/",
		controller: function (req, res, next) {
			var postNewestList, termsList, articleArchList;
			Term.getAll(function (err, list) {
				if (err) {
					error('getAll error');
				} else {
					termsList = list;
					Post.findArticleArchive(function (err, list) {
						if (err) {
							error('getAll error');
						} else {
							articleArchList = list;
							Post.findNewestList(function (err, list) {
								if (err) {
									error('findNewestList error');
								} else {
									req.termsList = termsList;
									req.articleArchList = articleArchList;
									req.postNewestList = list;
									req.home = {
										type: "index",
										homeList: list
									};
									res.render("index", {"title": "Express"});
								}
							});
						}
					});

				}
			});

			function error(msg) {
				res.render("index", {"title": "Express", error: msg});
			}
		}
	}
};
exports.indexArticle = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\d{4}\/\d{1,2}\/\d{1,2}\/(\d+)\/?$/,
		controller: function (req, res, next) {
			for (var key in req.params) {
				console.log("key:" + key + ",value:" + req.params[key]);
			}
			//var year = req.params[0];
			//var month = req.params[1];
			//var day = req.params[2];
			var slug = req.params[0];
			req.home = {
				type: "article"
			};
			Post.get(slug,function (err, post) {
				if(err){
					error("Post get error");
				}else{
					req.previewPost = post;
					Term.getAll(function (err, list) {
						if (err) {
							error('getAll error');
						} else {
							req.termsList = list;

							Post.findArticleArchive(function (err, list) {
								if (err) {
									error('getAll error');
								} else {
									req.articleArchList = list;
									Post.findNewestList(function (err, list) {
										if (err) {
											error('findNewestList error');
										} else {

											req.postNewestList = list;
											res.render("index", {"title": "Express"});
										}
									});
								}
							});

						}
					});
				}

			});



			function error(msg) {
				res.render("index", {"title": "Express", error: msg});
			}
		}
	}
};
exports.indexArchive = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /(\d{4})\/(\d{1,2})\/?$/,
		controller: function (req, res, next) {
			for (var key in req.params) {
				console.log("key:" + key + ",value:" + req.params[key]);
			}
			var year = req.params[0];
			var month = req.params[1];
			var postNewestList, termsList, articleArchList;
			Post.findByYearMonth({
				year: year,
				month: month
			}, function (err, list) {
				if (err) {
					error("xxxx");
				} else {
					req.home = {
						type: "archive",
						year: year,
						month: month,
						homeList: list
					};
					Term.getAll(function (err, list) {
						if (err) {
							error('getAll error');
						} else {
							termsList = list;
							Post.findArticleArchive(function (err, list) {
								if (err) {
									error('getAll error');
								} else {
									articleArchList = list;
									Post.findNewestList(function (err, list) {
										if (err) {
											error('findNewestList error');
										} else {
											postNewestList = list;
											req.termsList = termsList;
											req.articleArchList = articleArchList;
											req.postNewestList = postNewestList;

											res.render("index", {"title": "Express"});
										}
									});
								}
							});

						}
					});
				}
			});


			function error(msg) {
				res.render("index", {"title": "Express", error: msg});
			}
		}
	}
};
exports.indexCategory = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: /\/category\/(\w[\w\d_]+)(\/(\w[\w\d_]+)\/?|\/?)?$/,
		controller: function (req, res, next) {
			//for(var key in req.params) {
			//	console.log("key:"+key+",value:"+req.params[key]);
			//}
			var pargs1 = req.params[0];
			var pargs2 = req.params[1];
			var pargs3 = req.params[2];
			if (pargs2) { //have children
				console.log(pargs1 + "->" + pargs3);
			} else {
				Post.findByCategory(pargs1, function (err, list) {
					if (err) {
						error("findByCategory");
					} else {
						req.home = {
							type: "category",
							category: pargs1,
							homeList: list
						};
						Term.getAll(function (err, list) {
							if (err) {
								error('getAll error');
							} else {
								req.termsList = list;
								Post.findArticleArchive(function (err, list) {
									if (err) {
										error('getAll error');
									} else {
										req.articleArchList = list;
										Post.findNewestList(function (err, list) {
											if (err) {
												error('findNewestList error');
											} else {
												req.postNewestList = list;
												res.render("index", {"title": "Express"});
											}
										});
									}
								});

							}
						});
					}
				});
			}


			function error(msg) {
				res.render("index", {"title": "Express", error: msg});
			}
		}
	}
};
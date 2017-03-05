'use strict';
var models = require('../models');
var UserDao = require('./userDao');
var PostDao = require('./postDao');
var TermDao = require('./termDao');
var TaxonomyDao = require('./taxonomyDao');
var CommentDao = require('./commentDao');
var sequelize = models.sequelize;
module.exports = {
	UserDao:UserDao,
	PostDao:PostDao,
	TermDao:TermDao,
	TaxonomyDao:TaxonomyDao,
	CommentDao:CommentDao,
	transaction:function() {
		console.log('start transcation------------');
		return sequelize.transaction.apply(sequelize, arguments);
	}
};

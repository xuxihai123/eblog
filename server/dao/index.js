'use strict';

var UserDao = require('./userDao');
var PostDao = require('./postDao');
var TermDao = require('./termDao');
var CommentDao = require('./commentDao');

module.exports = {
	UserDao:UserDao,
	PostDao:PostDao,
	TermDao:TermDao,
	CommentDao:CommentDao
};

'use strict';

var UserService = require('./userService');
var PostService = require('./postService');
var PageService = require('./pageService');
var TermService = require('./termService');
var CommentService = require('./commentService');

module.exports = {
	UserService:UserService,
	PostService:PostService,
	PageService:PageService,
	TermService:TermService,
	CommentService:CommentService
};

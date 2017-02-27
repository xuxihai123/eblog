'use strict';

var UserService = require('./userService');
var PostService = require('./postService');
var TermService = require('./termService');
var CommentService = require('./commentService');

module.exports = {
	UserService:UserService,
	PostService:PostService,
	TermService:TermService,
	CommentService:CommentService
};

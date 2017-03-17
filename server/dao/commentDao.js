"use strict";
var Comment = require("../models").Comment;
var pageHelper = require('../utils/pageHelper');
module.exports = {
	create:function(comment){
		return Comment.create(comment);
	},
	remove:function(comment){
		return Comment.destroy({
			where:{
				comment_ID:comment.comment_ID
			}
		});
	},
	update:function(comment){
		return Comment.update(comment,{
			where:{
				comment_ID:comment.comment_ID
			}
		});
	},
	getById:function(id){
		return Comment.findOne({
			where: {
				comment_ID:id
			}
		});
	},
	getPageModel:function(offset,limit){
		return Comment.findAndCountAll({
			offset:offset,
			limit:limit
		}).then(function (result) {
			return new pageHelper.PageModel(offset, limit, result.rows, result.count);
		});
	},
	findAllByPostId:function(postId){
		return Comment.findAll({
			where:{
				comment_post_ID:postId
			}
		});
	}
};
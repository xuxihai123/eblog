"use strict";
var transaction = require('../dao').transaction;
var commentDao = require("../dao").CommentDao;
var Promise = require('bluebird');
module.exports = {
	addComment:function(comment){
		return new Promise(function (resolve, reject) {
			commentDao.create(comment).then(function(result){
				resolve(result);
			},function(error){
				reject(error);
			})
		});
	},
	removeComment:function(commentId){
		return new Promise(function (resolve, reject) {
			commentDao.remove({comment_ID:commentId}).then(function(result){
				resolve(result);
			},function(error){
				reject(error);
			})
		});
	},
	findById:function(id){
		return new Promise(function (resolve, reject) {
			commentDao.getById(id).then(function (comment) {
				resolve(comment);
			}, function (error) {
				reject(error);
			});
		});
	},
	getPageModel:function(offset,limit){
		return new Promise(function (resolve, reject) {
			commentDao.getPageModel(offset,limit).then(function (comments) {
				resolve(comments);
			}, function (error) {
				reject(error);
			});
		});
	},
	findAllByPostId:function(postId){
		return new Promise(function (resolve, reject) {
			commentDao.findAllByPostId(postId).then(function (comments) {
				resolve(comments);
			}, function (error) {
				reject(error);
			});
		});
	}
};
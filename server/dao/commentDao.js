"use strict";
var User = require("../models").User;
var pageHelper = require('../utils/pageHelper');
module.exports = {
	create:function(user){
		return User.create(user);
	},
	remove:function(user){
		return User.destroy({
			where:{
				ID:user.ID
			}
		});
	},
	update:function(user){
		return User.update(user,{
			where:{
				ID:user.ID
			}
		});
	},
	getById:function(id){
		return User.findOne({
			where: {
				ID: id
			}
		});
	},
	findAll:function(){
		return User.findAll();
	}
};
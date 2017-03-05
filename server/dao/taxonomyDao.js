"use strict";
var TermTaxonomy = require("../models").TermTaxonomy;
var pageHelper = require('../utils/pageHelper');
module.exports = {
	create:function(taxonomy,options){
		return TermTaxonomy.create(taxonomy,options);
	},
	remove:function(taxonomy){
		return TermTaxonomy.destroy({
			where:{
				term_id:taxonomy.term_id
			}
		});
	},
	update:function(taxonomy,transaction){
		return TermTaxonomy.update(taxonomy,{
			where:{
				term_id:taxonomy.term_id
			},
			transaction:transaction
		});
	},
	getById:function(id){
		return TermTaxonomy.findOne({
			where: {
				term_id: id
			}
		});
	},
	findAll:function(){
		return TermTaxonomy.findAll();
	}
};
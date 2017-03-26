'use strict';
var mysql = require('mysql');
var Promise = require('bluebird');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];

var pool  = mysql.createPool({
	host     : config.host,
	user     : config.username,
	password : config.password,
	database : config.database
});

var User=require('./wp_users');
var Term=require('./wp_terms');
var TermTaxonomy=require('./wp_term_taxonomy');
var Post=require('./wp_posts');
var Comment=require('./wp_comments');
var TermRelationship=require('./wp_term_relationships');

module.exports = {
	User:User,
	Term:Term,
	TermTaxonomy:TermTaxonomy,
	Post:Post,
	TermRelationship:TermRelationship,
	Comment:Comment,
	testOk:function () {
		return new Promise(function (resolve,reject) {
			pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
				if (error) {
					reject(error);
				}else{
					console.log('The solution is: ', results[0].solution);
					process.dbpool = pool;
					resolve(results[0].solution);
				}
			});
		});
	}
};

//example1
function dbtest1() {
	var mongodb = require('mongodb');
	var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
	var db = new mongodb.Db('wp_blog', server, {safe: true});

	db.open(function (err, db) {
		if (!err) {
			db.close();
			console.log('connect');
		} else {
			console.log(err);
		}
	});
}


//example2
//newest
function dbtest2() {
	var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
	var url = 'mongodb://localhost:27017/wp_blog';
// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");
		db.close();
	});
}

function dbtest3() {
	var express = require('express');
	var mongodb = require('mongodb');
	var app = express();

	var MongoClient = require('mongodb').MongoClient;
	var db;

// Initialize connection once
	MongoClient.connect("mongodb://localhost:27017/integration_test", function (err, database) {
		if (err) throw err;

		db = database;

		// Start the application after the database connection is ready
		app.listen(3000);
		console.log("Listening on port 3000");
	});

// Reuse database object in request handlers
	app.get("/", function (req, res) {
		db.collection("replicaset_mongo_client_collection").find({}, function (err, docs) {
			docs.each(function (err, doc) {
				if (doc) {
					console.log(doc);
				}
				else {
					res.end();
				}
			});
		});
	});
}

function mysqltest() {
	var mysql = require('mysql');
	var pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'xxhblog',
		password: 'xxhblog',
		database: 'wp_blog2'
	});
	console.log(pool._closed);

}
mysqltest();
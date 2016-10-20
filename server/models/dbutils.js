var MongoClient = require('mongodb').MongoClient,
	db = require("./db");
// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/wp_blog", function (err, database) {
	if (err) {
		throw err;
	}
	db.mongodb = database;
	success();
	db.mongodb.close();
});

function success() {
	var User = require("./wp_users");
	User.test();
}
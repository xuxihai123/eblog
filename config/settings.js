var mysql = require('mysql');
exports.config = function (app) {
	console.log('config ===>setting.js');
	var pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'xxhblog',
		password: 'xxhblog',
		database: 'wp_blog2'
	});
	if (pool) {
		console.log('createPool success');
		process.dbpool = pool;
		app.myset = {
			contrlllers_path: "../server/controller/",
		};
		process.on("exit", function () {
			pool.end(function() {
				console.log("destoryPool success");
			});
		});
	} else {
		console.log('createPool failed');
		process.exit();
	}
};
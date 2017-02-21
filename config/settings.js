var mysql = require('mysql');
exports.config = function (app) {
	console.log('config ===>setting.js');
	var pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: '227754',
		database: 'wp_blog'
	});
	if (pool) {
		console.log('createPool success');
		process.dbpool = pool;
		app.myset = {
			contrlllers_path: "../server/controller/",
			reset_key:"227754"
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
var mysql = require('mysql');
exports.config = function (app) {
	app.myset = {
		contrlllers_path: "../server/controller/",
		reset_key:"227754"
	};
	process.on("exit", function () {
		console.log('exit');
	});
};
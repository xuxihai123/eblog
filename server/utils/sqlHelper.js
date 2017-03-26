var mysql = require('mysql');
var Promise = require('bluebird');
exports.query = function () {
	console.info("sql query " + arguments[0]);
	var params = Array.prototype.slice.call(arguments, 0);

	return new Promise(function (resolve, reject) {
		params.push(function (err) {
			var args = Array.prototype.slice.call(arguments, 1);
			if (err) {
				console.log(err.stack);
				reject(err);
			}
			resolve.apply(this, args);
		});
		process.dbpool.query.apply(process.dbpool, params);
	});
};
exports.getConnection = function () {
	return process.dbpool.getConnection.apply(process.dbpool, arguments);
};
exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format = mysql.format;

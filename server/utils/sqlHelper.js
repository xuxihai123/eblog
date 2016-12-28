var mysql = require('mysql');
var Q = require('q');
exports.query = function () {
	console.info("sql query " + arguments[0]);
	var params = Array.prototype.slice.call(arguments, 0);

	var deferred = Q.defer();
	params.push(function (err) {
		var args = Array.prototype.slice.call(arguments, 1);
		if (err) {
			console.log(err.stack);
			deferred.reject(err);
		}
		deferred.resolve.apply(this, args);
	});
	process.dbpool.query.apply(process.dbpool, params);

	return deferred.promise;
};
exports.getConnection = function () {
	return process.dbpool.getConnection.apply(process.dbpool, arguments);
};
exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format = mysql.format;

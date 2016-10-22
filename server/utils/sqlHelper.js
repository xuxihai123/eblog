var mysql = require('mysql');
exports.query =function() {
	process.dbpool.query.apply(process.dbpool, arguments);
};
exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format = mysql.format;
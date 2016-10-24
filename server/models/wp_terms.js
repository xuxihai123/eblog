//MySQL [wp_blog]> describe wp_terms;
//+------------+---------------------+------+-----+---------+----------------+
//| Field      | Type                | Null | Key | Default | Extra          |
//+------------+---------------------+------+-----+---------+----------------+
//| term_id    | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
//| name       | varchar(200)        | NO   | MUL |         |                |
//| slug       | varchar(200)        | NO   | MUL |         |                |
//| term_group | bigint(10)          | NO   |     | 0       |                |
//+------------+---------------------+------+-----+---------+----------------+
function Term(term) {
	this.term_id = term.term_id;
	this.name = term.name;
	this.slug = term.slug;
	this.term_group = term.term_group;
};
module.exports = Term;

var sqlhelp = require("../utils/sqlHelper");

Term.save = function save(term, callback) {
	var sql = "insert into wp_terms set ?";
	var saveterm = new Term(term);
	sqlhelp.query(sql, saveterm, function (err, term) {
		if (err) {
			console.log(err.stack);
			callback(err, null);
		} else {
			callback(null, term);
		}
	});
};
Term.get = function get(term_id, callback) {
	var sql = 'select * from wp_terms where term_id=' + sqlhelp.escape(term_id) ;
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			console.log(err.stack);
			callback(err, null);
		} else {
			var term;
			if (row&&row.length > 0) {
				term = row[0];
			}
			callback(null, term);

		}
	});
};
Term.getAll = function get(callback) {
	var sql = "select * from wp_terms";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			console.log(err.stack);
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};
Term.delete = function (term_id, callback) {
	var sql = "delete * from wp_terms where term_id='" + sqlhelp.escape(term_id) + "'";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			console.log(err.stack);
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};




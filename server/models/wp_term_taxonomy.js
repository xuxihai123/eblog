//+------------------+---------------------+------+-----+---------+----------------+
//| Field            | Type                | Null | Key | Default | Extra          |
//+------------------+---------------------+------+-----+---------+----------------+
//| term_taxonomy_id | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
//| term_id          | bigint(20) unsigned | NO   | MUL | 0       |                |
//| taxonomy         | varchar(32)         | NO   | MUL |         |                |
//| description      | longtext            | NO   |     | NULL    |                |
//| parent           | bigint(20) unsigned | NO   |     | 0       |                |
//| count            | bigint(20)          | NO   |     | 0       |                |
//+------------------+---------------------+------+-----+---------+----------------+
function TermTaxonomy(termTaxonomy) {
	//this.term_taxonomy_id = termTaxonomy.term_taxonomy_id; //auto_increment
	this.term_id = termTaxonomy.term_id;
	this.taxonomy = termTaxonomy.taxonomy;
	this.description = termTaxonomy.description;
	this.parent = termTaxonomy.parent||0;
	this.count = termTaxonomy.count||0;
};
module.exports = TermTaxonomy;

var sqlhelp = require("../utils/sqlHelper");
TermTaxonomy.save = function save(termTaxonomy, callback) {
	var sql = "insert into wp_term_taxonomy set ?";
	sqlhelp.query(sql, termTaxonomy, function (err, okPacket) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, okPacket);
		}
	});
};
TermTaxonomy.get = function get(term_taxonomy_id, callback) {
	var sql = 'select * from wp_term_taxonomy where term_taxonomy_id=' + sqlhelp.escape(term_taxonomy_id);
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			var termTaxonomy;
			if (row && row.length > 0) {
				termTaxonomy = row[0];
			}
			callback(null, termTaxonomy);

		}
	});
};
TermTaxonomy.getAll = function get(callback) {
	var sql = "select * from wp_term_taxonomy";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
		}
	});
};
TermTaxonomy.delete = function (term_taxonomy_id, callback) {
	var sql = "delete * from wp_term_taxonomy where term_taxonomy_id=?";
	sqlhelp.query(sql, [term_taxonomy_id], function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
		}
	});
};




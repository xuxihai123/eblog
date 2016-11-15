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
	this.parent = termTaxonomy.parent || 0;
	this.count = termTaxonomy.count || 0;
};
module.exports = TermTaxonomy;

var sqlhelp = require("../utils/sqlHelper");
/**
 * @return promise
 * @param termTaxonomy
 * @param callback
 */
TermTaxonomy.save = function save(termTaxonomy, callback) {
	var sql = "insert into wp_term_taxonomy set ?";
	return sqlhelp.query(sql, termTaxonomy);
};
/**
 * @return promise
 * @param term_id
 * @param callback
 */
TermTaxonomy.delByTermId = function (term_id, callback) {
	var sql = "delete  from wp_term_taxonomy where term_id=?";
	return sqlhelp.query(sql,term_id);
};
/**
 * @return promise
 * @param term_taxonomy_id
 * @param callback
 */
TermTaxonomy.get = function get(term_taxonomy_id, callback) {
	var sql = 'select * from wp_term_taxonomy where term_taxonomy_id=' + sqlhelp.escape(term_taxonomy_id);
	return sqlhelp.query(sql);
};
/**
 * @return promise
 * @param term_taxonomy_id
 * @param callback
 */
TermTaxonomy.getByTermId = function get(term_id) {
	var sql = 'select * from wp_term_taxonomy where term_id=?';
	return sqlhelp.query(sql,term_id);
};
/**
 * @return promise
 * @param callback
 */
TermTaxonomy.getAll = function get(callback) {
	var sql = "select * from wp_term_taxonomy";
	return sqlhelp.query(sql);
};
/**
 * @return promise
 * @param term_taxonomy_id
 * @param callback
 */
TermTaxonomy.delete = function (term_taxonomy_id, callback) {
	var sql = "delete  from wp_term_taxonomy where term_taxonomy_id=?";
	return sqlhelp.query(sql);
};




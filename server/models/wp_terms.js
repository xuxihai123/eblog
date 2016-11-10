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
	//this.term_id = term.term_id; //auto_increment
	this.name = term.name;
	this.slug = term.slug;
	this.term_group = term.term_group;
};
module.exports = Term;

var sqlhelp = require("../utils/sqlHelper");
var pagehelp = require("./pageHelper");
/**
 * @return promise
 * @param term
 * @param callback
 */
Term.save = function save(term, callback) {
	var sql = "insert into wp_terms set ?";
	return sqlhelp.query(sql, term);
};
Term.delCategory = function del(term_id, callback) {
	var sql = "delete from wp_terms where term_id=?";
	return sqlhelp.query(sql, term_id);
};
/**
 * @return promise
 * @param term_id
 * @param callback
 */
Term.get = function get(term_id, callback) {
	var sql = 'select * from wp_terms where term_id=' + sqlhelp.escape(term_id);
	return sqlhelp.query(sql);
};
/**
 * @return promise
 * @param callback
 */
Term.getAllCategory = function get(callback) {
	var sql = "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id and T2.taxonomy='category'";
	return sqlhelp.query(sql);
};
/**
 * return promise
 * @param callback
 */
Term.getAllTag = function get(callback) {
	var sql = "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id and T2.taxonomy='post_tag'";
	return sqlhelp.query(sql);
};
/**
 * return promise
 * @param callback
 */
Term.getAll = function get(callback) {
	var sql = "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id";
	return sqlhelp.query(sql);
};
Term.getPage = function (pageNum, pageSize) {
	var sql = "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id";
	return pagehelp.getPageModel(pageNum, pageSize, sql);
};
/**
 *@return promise
 * @param term_id
 * @param callback
 */
Term.delete = function (term_id, callback) {
	var sql = "delete * from wp_terms where term_id='" + sqlhelp.escape(term_id) + "'";
	return sqlhelp.query(sql);
};




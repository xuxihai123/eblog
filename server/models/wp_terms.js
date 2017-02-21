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
var termsqls = require("./sqlTemplate").termSql;
var Q = require('q');
/**
 * @return promise
 * @param term
 * @param callback
 */
Term.save = function save(term, callback) {
	var sql = "insert into wp_terms set ?";
	return sqlhelp.query(sql, term);
};
/**
 * save term and save taxonomy
 * @param term
 * @param taxonomy
 * @returns {*|promise.promise|jQuery.promise|d.promise|promise}
 */
Term.saveWithTrans = function saveWithTrans(term, taxonomy) {
	var defered = Q.defer(), defered2 = Q.defer(), conn;

	function reject(err, connection) {
		connection.rollback(function () {
			console.log('rollback.........');
			defered.reject(err);
			connection && connection.release();
		});
	}

	sqlhelp.getConnection(function (err, connection) {
		conn = connection;
		if (err) {
			return reject(err, conn);
		}
		connection.beginTransaction(function (err) {
			if (err) {
				return reject(err, conn);
			}
			connection.query("insert into wp_terms set ?", term, function (err, okPacket) {
				if (err) {
					return reject(err, conn);
				}
				taxonomy.term_id = okPacket.insertId;
				connection.query("insert into wp_term_taxonomy set ?", taxonomy, function (err, okPacket) {
					if (err) {
						reject(err, conn);
					} else {
						connection.commit(function (err) {
							if (err) {
								reject(err, conn);
							} else {
								defered.resolve(okPacket);
							}
						});

					}
				});
			});
		});
	});
	defered.promise.then(function (okPacket) {
		defered2.resolve(okPacket);
	}).fail(function (err) {
		console.log(err.stack);
		defered2.reject(err);
	});
	return defered2.promise;
};
/**
 * @return promise
 * @param term_id
 * @param callback
 */
Term.delCategory = function del(term_id, callback) {
	var sql = "delete from wp_terms where term_id=?";
	return sqlhelp.query(sql, term_id);
};
/**
 * @return promise
 * @param term
 * @param callback
 */
Term.update = function save(term, callback) {
	var sql = "update wp_terms set name = ?, slug = ? where term_id=?";
	return sqlhelp.query(sql, [term.name, term.slug, term.term_id]);
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

Term.getBySlug = function get(slug) {
	var sql = 'select * from wp_terms where slug=' + sqlhelp.escape(slug);
	return sqlhelp.query(sql);
};
/**
 * @return promise
 */
Term.getAllCategory = function get() {
	return sqlhelp.query(termsqls.getAllCategory);
};
/**
 * return promise
 * @param callback
 */
Term.getAllTags = function get(callback) {
	return sqlhelp.query(termsqls.getAllTags);
};
/**
 * return promise
 * @param callback
 */
Term.getAll = function get(callback) {
	var sql = "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id";
	return sqlhelp.query(sql);
};
/**
 * @param offset
 * @param limit
 * @returns {*}
 */
Term.getTagPage = function (offset, limit) {
	return pagehelp.getPageModel(offset, limit, termsqls.getTagPage);
};
/**
 * @param offset
 * @param limit
 * @returns {*}
 */
Term.getCategoryPage = function (offset, limit) {
	return pagehelp.getPageModel(offset, limit, termsqls.getCategoryPage);
};
/**
 *@return promise
 * @param term_id
 * @param callback
 */
Term.delete = function (term_id, callback) {
	var sql = "delete  from wp_terms where term_id=?";
	return sqlhelp.query(sql, term_id);
};

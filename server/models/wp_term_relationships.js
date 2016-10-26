//MySQL [wp_blog2]> desc wp_term_relationships;
//+------------------+---------------------+------+-----+---------+-------+
//| Field            | Type                | Null | Key | Default | Extra |
//+------------------+---------------------+------+-----+---------+-------+
//| object_id        | bigint(20) unsigned | NO   | PRI | 0       |       |
//| term_taxonomy_id | bigint(20) unsigned | NO   | PRI | 0       |       |
//| term_order       | int(11)             | NO   |     | 0       |       |
//+------------------+---------------------+------+-----+---------+-------+
//	3 rows in set (0.00 sec)

function TermRelationship(relationship) {
	this.object_id = relationship.object_id || 0;
	this.term_taxonomy_id = relationship.term_taxonomy_id || 0;
	this.term_order = relationship.term_order || 0;

};
module.exports = TermRelationship;

var sqlhelp = require("../utils/sqlHelper");
TermRelationship.save = function save(relationship, callback) {
	var sql = "insert into wp_term_relationships set ?";
	sqlhelp.query(sql, relationship, function (err, okPacket) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, okPacket);
		}
	});
};
TermRelationship.saveMulti = function save(relationships, callback) {
	var sql = "insert into wp_term_relationships(object_id,term_taxonomy_id,term_order) VALUES ?";
	sqlhelp.query(sql, [relationships], function (err, okPacket) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, okPacket);
		}
	});
};
TermRelationship.getAll = function get(callback) {
	var sql = "select * from wp_term_relationships";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};
TermRelationship.delete = function (relationship, callback) {
	var sql = "delete * from wp_term_relationships where object_id=? and term_taxonomy_id=?";
	sqlhelp.query(sql, relationship, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};




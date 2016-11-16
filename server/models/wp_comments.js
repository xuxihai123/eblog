//MySQL [wp_blog2]> desc wp_comments;
//+----------------------+---------------------+------+-----+---------------------+----------------+
//| Field                | Type                | Null | Key | Default             | Extra          |
//+----------------------+---------------------+------+-----+---------------------+----------------+
//| comment_ID           | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| comment_post_ID      | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| comment_author       | tinytext            | NO   |     | NULL                |                |
//| comment_author_email | varchar(100)        | NO   | MUL |                     |                |
//| comment_author_url   | varchar(200)        | NO   |     |                     |                |
//| comment_author_IP    | varchar(100)        | NO   |     |                     |                |
//| comment_date         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| comment_date_gmt     | datetime            | NO   | MUL | 0000-00-00 00:00:00 |                |
//| comment_content      | text                | NO   |     | NULL                |                |
//| comment_karma        | int(11)             | NO   |     | 0                   |                |
//| comment_approved     | varchar(20)         | NO   | MUL | 1                   |                |
//| comment_agent        | varchar(255)        | NO   |     |                     |                |
//| comment_type         | varchar(20)         | NO   |     |                     |                |
//| comment_parent       | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| user_id              | bigint(20) unsigned | NO   |     | 0                   |                |
//+----------------------+---------------------+------+-----+---------------------+----------------+

function Comment(comment) {
	this.comment_post_ID = comment.comment_post_ID || 0;
	this.comment_author = comment.comment_author;
	this.comment_author_email = comment.comment_author_email;
	this.comment_author_url = comment.comment_author_url;
	this.comment_author_IP = comment.comment_author_IP;
	this.comment_date = comment.comment_date || "0000-00-00 00:00:00";
	this.comment_date_gmt = comment.comment_date_gmt || "0000-00-00 00:00:00";
	this.comment_content = comment.comment_content;
	this.comment_karma = comment.comment_karma || 0;
	this.comment_approved = comment.comment_approved || 1;
	this.comment_agent = comment.comment_agent;
	this.comment_type = comment.comment_type || "";
	this.comment_parent = comment.comment_parent || 0;
	this.user_id = comment.user_id || 0;
};
module.exports = Comment;

var sqlhelp = require("../utils/sqlHelper");
var pagehelp = require("./pageHelper");
Comment.save = function save(comment) {
	var sql = "insert into wp_comments set ?";
	return sqlhelp.query(sql, comment);
};
Comment.get = function get(user_login, callback) {
	var sql = 'select * from wp_comments where user_login=?';
	return sqlhelp.query(sql, [user_login]);
};
Comment.getAll = function get(callback) {
	var sql = "select * from wp_comments";
	return sqlhelp.query(sql);
};
/**
 * @return promise
 * @param offset
 * @param limit
 */
Comment.getPage = function (offset, limit) {
	var sql = "select * from wp_comments";
	return pagehelp.getPageModel(offset, limit, sql);
};
Comment.getPageByPost = function (offset, limit) {
	var sql = "select * from wp_comments";
	return pagehelp.getPageModel(offset, limit, sql);
};
/**
 * @return promise
 * @param user_login
 * @param callback
 */
Comment.delete = function (comment_ID, callback) {
	var sql = "delete  from wp_comments where comment_ID=?";
	return sqlhelp.query(sql, [comment_ID]);
};
//MySQL [wp_blog]> describe wp_posts;
//+-----------------------+---------------------+------+-----+---------------------+----------------+
//| Field                 | Type                | Null | Key | Default             | Extra          |
//+-----------------------+---------------------+------+-----+---------------------+----------------+
//| ID                    | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| post_author           | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| post_date             | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_date_gmt         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_content          | longtext            | NO   |     | NULL                |                |
//| post_title            | text                | NO   |     | NULL                |                |
//| post_excerpt          | text                | NO   |     | NULL                |                |
//| post_status           | varchar(20)         | NO   |     | publish             |                |
//| comment_status        | varchar(20)         | NO   |     | open                |                |
//| ping_status           | varchar(20)         | NO   |     | open                |                |
//| post_password         | varchar(20)         | NO   |     |                     |                |
//| post_name             | varchar(200)        | NO   | MUL |                     |                |
//| to_ping               | text                | NO   |     | NULL                |                |
//| pinged                | text                | NO   |     | NULL                |                |
//| post_modified         | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_modified_gmt     | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| post_content_filtered | longtext            | NO   |     | NULL                |                |
//| post_parent           | bigint(20) unsigned | NO   | MUL | 0                   |                |
//| guid                  | varchar(255)        | NO   |     |                     |                |
//| menu_order            | int(11)             | NO   |     | 0                   |                |
//| post_type             | varchar(20)         | NO   | MUL | post                |                |
//| post_mime_type        | varchar(100)        | NO   |     |                     |                |
//| comment_count         | bigint(20)          | NO   |     | 0                   |                |
function Post(post) {
	this.post_autho = post.post_autho;
	this.post_dat = post.post_dat;
	this.post_date_gm = post.post_date_gm;
	this.post_conten = post.post_conten;
	this.post_titl = post.post_titl;
	this.post_excerp = post.post_excerp;
	this.post_statu = post.post_statu;
	this.comment_statu = post.comment_statu;
	this.ping_statu = post.ping_statu;
	this.post_passwor = post.post_passwor;
	this.post_nam = post.post_nam;
	this.to_pin = post.to_pin;
	this.pinge = post.pinge;
	this.post_modifie = post.post_modifie;
	this.post_modified_gm = post.post_modified_gm;
	this.post_content_filtere = post.post_content_filtere;
	this.post_paren = post.post_paren;
	this.gui = post.gui;
	this.menu_orde = post.menu_orde;
	this.post_typ = post.post_typ;
	this.post_mime_typ = post.post_mime_typ;
	this.comment_coun = post.comment_coun;
};
module.exports = Post;

var sqlhelp = require("../utils/sqlHelper");
Post.save = function save(post, callback) {
	var sql = "insert into wp_posts set ?";
	var savepost = new post(post);
	sqlhelp.query(sql, savepost, function (err, post) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, post);
		}
	});
};
Post.get = function get(post_login, callback) {
	var sql = 'select * from wp_posts where post_login=' + sqlhelp.escape(post_login) ;
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			var post;
			if (row&&row.length > 0) {
				post = row[0];
			}
			callback(null, post);

		}
	});
};
Post.getAll = function get(callback) {
	var sql = "select * from wp_posts";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};
Post.delete = function (post_login, callback) {
	var sql = "delete * from wp_posts where post_login='" + sqlhelp.escape(post_login) + "'";
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);

		}
	});
};

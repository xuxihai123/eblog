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
	//this.ID = post.ID; //auto_increment
	this.post_author = post.post_author;
	this.post_date = post.post_date;
	this.post_date_gmt = post.post_date_gmt;
	this.post_content = post.post_content;
	this.post_title = post.post_title;
	this.post_excerpt = post.post_excerpt||"NULL";
	this.post_status = post.post_status||"publish";
	this.comment_status = post.comment_status||"open";
	this.ping_status = post.ping_status||"open";
	this.post_password = post.post_password||"";
	this.post_name = post.post_name||"";
	this.to_ping = post.to_ping||"NULL";
	this.pinged = post.pinged||"NULL";
	this.post_modified = post.post_modified||"0000-00-00 00:00:00";
	this.post_modified_gmt = post.post_modified_gmt||"0000-00-00 00:00:00";
	this.post_content_filtered = post.post_content_filtered||"NULL";
	this.post_parent = post.post_parent||0;
	this.guid = post.guid||"";
	this.menu_order = post.menu_order||0;
	this.post_type = post.post_type||"post";
	this.post_mime_type = post.post_mime_type||"";
	this.comment_count = post.comment_count||0;
};
module.exports = Post;

var sqlhelp = require("../utils/sqlHelper");
Post.save = function save(post, callback) {
	var sql = "insert into wp_posts set ?";
	sqlhelp.query(sql, post, function (err, okPacket) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, okPacket);
		}
	});
};
Post.get = function get(ID, callback) {
	var sql = 'select * from wp_posts where ID=?';
	sqlhelp.query(sql, [ID], function (err, row) {
		if (err) {
			callback(err, null);
		} else {
			var post;
			if(row.length>0){
				post = row[0];
			}
			callback(null, post);

		}
	});
};
Post.findByCategory = function (category, callback) {
	console.log(category);
	var sql = 'select * from wp_terms as T1,wp_term_relationships as T2,wp_posts as T3 where T1.slug=? and T1.term_id=T2.term_taxonomy_id and T2.object_id=T3.ID';
	sqlhelp.query(sql, [category], function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
		}
	});

};
Post.findByYearMonth = function (obj, callback) {
	var sql = 'select *  from wp_posts where year(post_date)=? and month(post_date)=? and post_status=\'publish\'';
	sqlhelp.query(sql, [obj.year, obj.month], function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
		}
	});
};
Post.findNewestList = function (callback) {
	var sql = 'select ID, post_title,post_status,post_date,year(post_date),month(post_date),day(post_date) from wp_posts  where post_status=\'publish\' order by post_date desc limit 6';
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
		}
	});
};
Post.findArticleArchive = function (callback) {
	var sql = 'select year(post_date),month(post_date),count(ID) from wp_posts group by year(post_date),month(post_date) order by year(post_date) desc,month(post_date)desc';
	sqlhelp.query(sql, function (err, row, fields) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, row);
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

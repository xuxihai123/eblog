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
	this.post_excerpt = post.post_excerpt || "NULL";
	this.post_status = post.post_status || "publish";
	this.comment_status = post.comment_status || "open";
	this.ping_status = post.ping_status || "open";
	this.post_password = post.post_password || "";
	this.post_name = post.post_name || "";
	this.to_ping = post.to_ping || "NULL";
	this.pinged = post.pinged || "NULL";
	this.post_modified = post.post_modified || "0000-00-00 00:00:00";
	this.post_modified_gmt = post.post_modified_gmt || "0000-00-00 00:00:00";
	this.post_content_filtered = post.post_content_filtered || "NULL";
	this.post_parent = post.post_parent || 0;
	this.guid = post.guid || "";
	this.menu_order = post.menu_order || 0;
	this.post_type = post.post_type || "post";
	this.post_mime_type = post.post_mime_type || "";
	this.comment_count = post.comment_count || 0;
};
module.exports = Post;

var sqlhelp = require("../utils/sqlHelper");
var pagehelp = require("./pageHelper");
var postSqls = require("./sqlTemplate").postSql;
/**
 *
 * @param post
 * @return promise
 * 添加文章
 */
Post.save = function save(post) {
	return sqlhelp.query(postSqls.save, post);
};
/**
 *@return promise
 * @param post_id
 * 删除文章或页面
 */
Post.delete = function (post_id) {
	return sqlhelp.query(postSqls.delete, post_id);
};
/**
 * @return promise
 * @param post
 * 更新文章
 */
Post.update = function (post) {
	return sqlhelp.query(postSqls.update, [post.post_title, post.post_content, post.ID]);
};
/**
 * @return promise
 * @param ID
 * 获取文章
 */
Post.get = function get(ID) {
	return sqlhelp.query(postSqls.getPost, [ID]);
};
/**
 * @return promise
 * @param ID
 * 获取前一篇文章
 */
Post.getPrev = function (ID) {
	return sqlhelp.query(postSqls.getPrev, [ID]);
};
/**
 * @return promise
 * @param ID
 * 下一篇文章
 */
Post.getNext = function (ID) {
	return sqlhelp.query(postSqls.getNext, [ID]);
};

/**
 * 通过分类查找文章带分页
 * @param category
 * @param offset
 * @param limit
 * @returns {*}
 */
Post.findByCategoryPageModel = function (category, offset, limit) {
	var sql = sqlhelp.format(postSqls.findByCategoryPageModel, [category]);
	return pagehelp.getPageModel(offset, limit, sql);
};

/**通过年月查找文章支持分页
 * @return promise
 * @param obj
 * @param offset
 * @param limit
 * @returns {*}
 */
Post.findByYearMonthPageModel = function (obj, offset, limit) {
	var sql = sqlhelp.format(postSqls.findByYearMonthPageModel, [obj.year, obj.month]);
	return pagehelp.getPageModel(offset, limit, sql);
};
/**
 * @return promise
 * 获取最新的6则文章(左侧最新文章显示)
 */
Post.findNewestList = function () {
	return sqlhelp.query(postSqls.findNewestList);
};
/**
 * @return promise
 * 获取最新的6则页面(左侧关于...)
 */
Post.findNewestPage = function () {
	return sqlhelp.query(postSqls.findNewestPage);
};
/**
 * 获取最新的文章，带分页,降序，状态为已经发布
 * @return promise
 * @param offset
 * @param limit
 */
Post.findNewestListPageModel = function (offset, limit) {
	return pagehelp.getPageModel(offset, limit, postSqls.findNewestListPageModel);
};
/**
 * @return promise
 * 获取所有文章的归档，即年月集合
 */
Post.findArticleArchive = function () {
	return sqlhelp.query(postSqls.findArticleArchive);
};

/**
 * @return promise
 * @param word
 * @param start
 * @param limit
 * 文章搜索,带分页
 */
Post.findPostByWordPageModel = function (word, offset, limit) {
	word = "%" + word + "%";
	var sql = postSqls.findPostByWordPageModel;
	sql = sqlhelp.format(sql, [word]);
	return pagehelp.getPageModel(offset, limit, sql);
};

/**
 * @param pageNum
 * @param pageSize
 * @returns promise(pageModel)
 * 获取所有文章，用于后台管理
 */
Post.getPostPageModel = function (offset, limit) {
	return pagehelp.getPageModel(offset, limit, postSqls.getPostPageModel);
};

/**
 * @return promise
 * @param offset
 * @param limit
 * @returns {*}
 * 获取所有页面，用于后台管理
 */
Post.getPagePageModel = function (offset, limit) {
	return pagehelp.getPageModel(offset, limit, postSqls.getPagePageModel);
};


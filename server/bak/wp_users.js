//MySQL [wp_blog]> describe wp_users;
//+---------------------+---------------------+------+-----+---------------------+----------------+
//| Field               | Type                | Null | Key | Default             | Extra          |
//+---------------------+---------------------+------+-----+---------------------+----------------+
//| ID                  | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| user_login          | varchar(60)         | NO   | MUL |                     |                |
//| user_pass           | varchar(255)        | NO   |     |                     |                |
//| user_nicename       | varchar(50)         | NO   | MUL |                     |                |
//| user_email          | varchar(100)        | NO   | MUL |                     |                |
//| user_url            | varchar(100)        | NO   |     |                     |                |
//| user_registered     | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| user_activation_key | varchar(255)        | NO   |     |                     |                |
//| user_status         | int(11)             | NO   |     | 0                   |                |
//| display_name        | varchar(250)        | NO   |     |                     |                |
//ID：自增唯一ID
//user_login：登录名
//user_pass：密码
//user_nicename：昵称
//user_email：Email
//user_url：网址
//user_registered：注册时间
//user_activation_key：激活码
//user_status：用户状态
//display_name：显示名称
function User(user) {
	this.user_login = user.user_login;
	this.display_name = user.display_name;
	this.user_pass = user.user_pass;
	this.user_nicename = user.user_nicename;
	this.user_email = user.user_email;
	this.user_url = user.user_url;
	this.user_registered = user.user_registered;
	this.user_activation_key = user.user_activation_key;
	this.user_status = user.user_status;
};
module.exports = User;

var sqlhelp = require("../utils/sqlHelper");
var pagehelp = require("./pageHelper");
User.save = function save(user, callback) {
	var sql = "insert into wp_users set ?";
	return sqlhelp.query(sql, user);
};
User.update = function save(user, callback) {
	var sql = "update wp_users set user_pass=? where user_login=?";
	return sqlhelp.query(sql, [user.user_pass,user.user_login]);
};
User.get = function get(user_login, callback) {
	var sql = 'select * from wp_users where user_login=?';
	return sqlhelp.query(sql, [user_login]);
};
User.getAll = function get(callback) {
	var sql = "select * from wp_users";
	return sqlhelp.query(sql);
};
/**
 * @return promise
 * @param offset
 * @param limit
 */
User.getPage = function (offset, limit) {
	var sql = "select * from wp_users";
	return pagehelp.getPageModel(offset, limit, sql);
};
/**
 * @return promise
 * @param user_login
 * @param callback
 */
User.delete = function (user_login, callback) {
	var sql = "delete  from wp_users where user_login=?";
	return sqlhelp.query(sql, [user_login]);
};




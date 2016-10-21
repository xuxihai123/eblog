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
User.save = function save(user, callback) {
	var db = process.mongodb;

	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		collection.ensureIndex('name', {unique: true}, function (err, user2) {
		});
		collection.insert(user, {safe: true}, function (err, user) {
			callback(err, user);
		});
	});
};
User.get = function get(user_login, callback) {
	var db = process.mongodb;
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		collection.findOne({user_login: user_login}, function (err, doc) {
			if (doc) {
				var user = new User(doc);
				callback(err, user);
			} else {
				callback(err, null);
			}
		});
	});
};
User.getAll = function get(callback) {
	var db = process.mongodb;
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		collection.find(function (err, doc) {
			if (doc) {
				doc.toArray(function (err, list) {
					callback(err, list);
				});
			} else {
				callback(err, null);
			}
		});
	});
};
User.delete = function (user_login, callback) {
	var db = process.mongodb;
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		//ns, ops, options, callback
		collection.remove({user_login: {"$gt": user_login}}, function (err, doc) {
			if (doc) {
				callback(err, doc);
			} else {
				callback(err, null);
			}
		});
	});
};






function User(user) {
	this.name = user.name;
	this.password = user.password;
};
module.exports = User;
User.save = function save(user, callback) {
	var db = process.mongodb;
	var user2 = {
		name: user.name,
		password: user.password
	};
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		collection.ensureIndex('name', {unique: true}, function (err, user2) {
		});
		collection.insert(user2, {safe: true}, function (err, user) {
			callback(err, user);
		});
	});
};
User.get = function get(username, callback) {
	var db = process.mongodb;
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		collection.findOne({name: username}, function (err, doc) {
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
User.delete = function (username, callback) {
	db.collection('wp_users', function (err, collection) {
		if (err) {
			return callback(err);
		}
		//ns, ops, options, callback
		collection.remove({name: {"$gt": username}}, function (err, doc) {
			if (doc) {
				callback(err, doc);
			} else {
				callback(err, null);
			}
		});
	});
};

User.test = function () {
	//testSaveUser();
	//testUpdateUser();
	//testFindUser();
	testFindAll();
};

function testSaveUser() {
	//insert users
	for (var i = 0; i < 10; i++) {
		var user = new User({
			name: "tom" + i,
			password: "password" + i
		});
		user.save(function (err, user) {
			if (!err) {
				console.log('save success:userinfo:');
				console.log(JSON.stringify(user));
			} else {
				console.log(err);
			}
		});
	}

}

function testRemoveUser() {
	User.delete("tom0", function (err, doc) {
		if (err) {
			throw err;
		}
		console.log("success");
	});
}

function testUpdateUser() {

}

function testFindUser() {
	User.get("tom0", function (err, user) {
		if (!err) {
			console.log(user);
		} else {
			console.log(err);
		}
	});
}

function testFindAll() {
	User.getAll(function (err, list) {
		if (!err) {
			console.log(list);
		} else {
			console.log(err);
		}
	});
}




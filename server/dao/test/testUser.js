var userDao = require('../userDao');
function testCreate() {
	var user1 = {
		user_login: "zhangsan",
		user_pass: "zhangsan123",
		display_name: "zhangsands",
		user_nicename: "zhangsanun",
		user_email: "zhangsanemail",
		user_url: "zhangsan.url",
		user_registered: new Date(),
		user_activation_key: "1231313"
	};
	userDao.create(user1).then(function(result) {
	},function(error){
		console.log(error);
	});
}

function testRemove(){
	userDao.remove({
		ID:1
	}).then(function(result){

	},function(error){
		console.log(error);
	})
}

function testUpdate() {
	var user1 = {
		ID:2,
		user_login: "lisifdsf",
		user_pass: "zhangsan123",
		display_name: "zhangsands",
		user_nicename: "zhangsanun",
		user_email: "zhangsanemail",
		user_url: "zhangsan.url",
		user_registered: new Date(),
		user_activation_key: "000"
	};
	userDao.update(user1);
}

function testFindAll() {
	userDao.findAll().then(function (list) {
		console.log(list);
	});
}

function testGetById() {
	userDao.getById(2).then(function (user) {
		console.log(user);
	});
}
testGetById();
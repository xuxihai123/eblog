var transaction = require('../index').transaction;
var postDao = require('../postDao');
function testCreate() {
	var post;
	for(var i=1;i<100;i++){
		var temp = Math.random() * 80;
		var temp2 = i;
		post = {
			post_author: "author_" + temp2,
			post_title: "title_" + temp2,
			post_content: "post_content....." + temp2,
			post_date: new Date(),
			post_date_gmt: new Date(),
			post_status:"publish",
			post_type:"post",
			termRelations: [{
				term_id: parseInt(temp),
				term_order: parseInt(temp+ 1)
			}],
			user_id:4
		};
		transaction().then(function(trans){
			postDao.create2(post, trans).then(function (result) {
				trans.commit().then(function () {
					console.log('okok....');
				});
			}, function (error) {
				console.log(error);
				trans.rollback(function () {
					console.log(error);
				});
			});
		});

	}
}

function testGetById() {
	postDao.getById(5).then(function (post) {
		console.log(post.toJSON());
	}, function (error) {
		console.log(error);
	});
}

function updatePost() {
	var post = {
		ID: 5,
		post_title: "xxxx5"
	};
	postDao.update(post).then(function (post) {
	}, function (error) {
		console.log(error);
	});
}

function getPostPage() {

	postDao.getPageModel1(5,5).then(function (pageModel) {
		console.log(JSON.stringify(pageModel,null,4));
	}, function (error) {
		console.log(error);
	});
}

function testArchive() {
	postDao.getArchive().then(function (result) {
		console.log(JSON.stringify(result,null,4));
	},function(error){
		console.log(error);
	});
}

//testCreate();
//testGetById();
//updatePost();
testArchive();
//testCreate();
//testArchive();
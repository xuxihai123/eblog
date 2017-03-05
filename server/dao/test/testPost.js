var transaction = require('../index').transaction;
var postDao = require('../postDao');
function testCreate() {
	var post;
	for(var i=150;i<200;i++){
		var temp = Math.random() * 80;
		var temp2 = i;
		post = {
			post_author: "author_" + temp2,
			post_title: "title_page" + temp2,
			post_content: "page_content....." + temp2,
			post_date: new Date(),
			post_date_gmt: new Date(),
			post_status:"publish",
			post_type:"page",
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

	postDao.getPostPage(5,5).then(function (pageModel) {
		console.log(JSON.stringify(pageModel,null,4));
	}, function (error) {
		console.log(error);
	});
}

//testCreate();
//testGetById();
//updatePost();
//getPostPage();
testCreate();
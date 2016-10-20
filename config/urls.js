var IndexController = require("../server/controller/IndexController");
var UserController = require("../server/controller/UserController");

exports.config = function (app) {
	var urlMap = {
		"/": proxy(IndexController.index, "get"),
		"/index": proxy(IndexController.index, "get"),
		"/users/register": proxy(UserController.register, "get"),
		"/users/register": proxy(UserController.register, "post"),
		"/users/login": proxy(UserController.login, "get"),
		"/users/login": proxy(UserController.login, "post"),
	};
	for (var key in urlMap) {
		app.use(key, urlMap[key]);
		console.log(key);
	}
	console.log('config route');
};

function proxy(fn, method) {
	var express = require("express");
	var router = express.Router();
	router[method]("/", fn);
	return router;
}

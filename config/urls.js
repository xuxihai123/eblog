var fs = require("fs");
var path = require("path");
var viewUtils = require("../server/utils/viewUtils");
var errorProxy = require("../server/utils/errorProxy");
exports.configRoute = function (app) {
	var setting = app.myset;
	var ctrls_path = setting.contrlllers_path, ctrl_path, controller;

	var files = fs.readdirSync(ctrls_path);
	for (var i = 0; i < files.length; i++) {
		ctrl_path = path.join(ctrls_path, files[i]);
		controller = require(ctrl_path);
		for (var key in controller) {
			if (key == "doGet") { //注册多个get
				var routes = controller[key]();
				for (var key2 in routes) {
					if (routes.hasOwnProperty(key2)) {
						app.get(key2, routes[key2]);
						console.log("doGet register router:" + key2 + ",method:get");
					}
				}
			} else if (key == "doPost" || key == "doAjax") {//注册多个post
				var routes = controller[key]();
				console.log(key + " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> start");
				for (var key2 in routes) {
					if (routes.hasOwnProperty(key2)) {
						app.post(key2, routes[key2]);
						console.log("do Post register router:" + key2 + ",method:get");
					}
				}
				console.log(key + " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> end");
			} else {
				var small_router = controller[key]();
				var url;
				if (typeof small_router == "function") {
					url = "/" + key;
					app.get(url, small_router);
				} else {
					url = small_router.url || key;
					if (typeof url == "string" && url.substr(0, 1) !== "/") {
						url = "/" + url;
					}
					var method = small_router.method || "get";
					app[method](url, small_router.controller);
				}
				console.log("register router:" + url + ",method:" + method);
			}
		}
	}
	console.log('config route finish!');
};
//重写render方法，给所有的render view添加request,response,session
function rewriteRender(app) {
	var render = app.response.render;
	app.response.errorProxy = function (exceptType, error) {
		errorProxy.apply(this, [exceptType, error]);
	};
	app.response.render = function (view, options, callback) {
		var res, req, session, done;
		res = this;
		req = res.req;
		session = req.session;

		if (typeof options == "function") {
			done = options;
			options = {
				request: req,
				response: res,
				session: session,
			};
		} else {
			options = options || {};
			options.request = req;
			options.response = res;
			options.session = session;
			done = callback;
		}
		options.utils = viewUtils;
		render.apply(res, [view, options, done]);
	};
}

exports.autoproxyView = function (app) {
	rewriteRender(app);

	app.use(function (req, res, next) {
		var url = req.url || "/index.c";
		url = url.replace(/\?.*/, "");
		if (req.method == "GET" && url.substr(-2) === ".c") {//auto handle view
			var viewdirectory = url.replace(/\/(.*)\.c/, "$1");
			console.log("autoproxy view ===> /" + viewdirectory + ".ejs");
			res.render(viewdirectory);
		} else {//skip not view
			next();
		}

	});
};

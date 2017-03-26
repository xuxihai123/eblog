var fs = require("fs");
var path = require("path");
module.exports = function (app, settings) {
	var serverPath = settings.serverPath;
	var viewUtils = require(path.resolve(serverPath, "utils/viewUtils.js"));
	var errorProxy = require(path.resolve(serverPath, "utils/errorProxy.js"));

	configRoute();
	rewriteRender();
	autoproxyView();

	function configRoute() {
		var ctrls_path = settings.controllerPath, ctrl_path, controller;
		var files = fs.readdirSync(ctrls_path);
		for (var i = 0; i < files.length; i++) {
			ctrl_path = path.join(ctrls_path, files[i]);
			controller = require(ctrl_path);
			for (var key in controller) {
				if (key == "doGet") { //注册多个get
					var routes1 = controller[key]();
					for (var key1 in routes1) {
						if (routes1.hasOwnProperty(key1)) {
							configProxy(key1, routes1[key1]);
						}
					}
				} else if (key == "doPost" || key == "doAjax") {//注册多个post
					var routes2 = controller[key]();
					for (var key2 in routes2) {
						if (routes2.hasOwnProperty(key2)) {
							configProxy(key2, routes2[key2],"post");
						}
					}
				} else {
					var small_router = controller[key]();
					var url;
					if (typeof small_router == "function") {
						url = "/" + key;
						configProxy(url, small_router);
					} else {
						url = small_router.url || key;
						if (typeof url == "string" && url.substr(0, 1) !== "/") {
							url = "/" + url;
						}
						configProxy(url, small_router.controller,small_router.method);
					}
				}
			}
		}


		function configProxy(url,ctrl,method) {
			console.log('config---->url:' + url + ' with method:' + method || 'get');
			app[method || 'get'](url, ctrl);
		}
	}

	function autoproxyView() {
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
	}

	//重写render方法，给所有的render view添加request,response,session
	function rewriteRender() {
		var render = app.response.render;
		app.response.errorProxy = function (error) {
			console.log(error);
			errorProxy.apply(this, [error]);
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
					session: session
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
};
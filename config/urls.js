var fs = require("fs");
var path = require("path");

exports.config = function (app) {
	var setting = app.myset;
	var ctrls_path = setting.contrlllers_path, ctrl_path, controller;

	var files = fs.readdirSync(ctrls_path);
	for (var i = 0; i < files.length; i++) {
		ctrl_path = path.join(ctrls_path, files[i]);
		controller = require(ctrl_path);
		for (var key in controller) {
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
	console.log('config route finish!');
};

function rewriteRender(app) {
	var render=app.request.render;
	app.request.render=function() {
		var response=this,request,session;
		var response = this;
		var context={
			request:response.request,
			response:response,
			session:response.request.session,
		}
	};
}

exports.autoproxy = function (app) {
	app.use(function (req, res, next) {
		var url = req.url || "/index.c";
		url = url.replace(/\?.*/, "");
		if (req.method == "GET" && url.substr(-2) === ".c") {//auto handle view
			var viewdirectory = url.replace(/\/(.*)\.c/, "$1");
			console.log("autoproxy view ===> /" + viewdirectory + ".ejs");
			res.render(viewdirectory, {
				request: req,
				response: res,
				session: req.session,
			});
		} else {//skip not view
			next();
		}

	});
};

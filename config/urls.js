var fs = require("fs");
var path = require("path");

exports.config = function (app) {
	var setting = app.myset;
	var ctrls_path = setting.contrlllers_path, ctrl_path, controller;

	files = fs.readdirSync(ctrls_path);
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

exports.autoproxy=function(app) {
	app.get('/view/:name', function(req, res) {
		var name = req.params.name;
		res.render(name);
	});
};



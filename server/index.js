var fs = require("fs");
var path = require("path");

var db = require('./utils/db');
var logger = require('./utils/logger');
module.exports = function (app) {
	app.reset_key = "227754";
	extendContext(app);
	configFilter(app);
	configRoute(app);
	autoproxyView(app);

	return db.bootstrap();
};
module.exports.logger = logger;

function extendContext(app) {
	logger.info('starting extend context...');
	var viewUtils = require('./utils/viewUtils.js');
	var seoUtils = require('./utils/seoUtils.js');
	var errorProxy = require('./utils/errorProxy.js');
	//重写render方法，给所有的render view添加request,response,session
	var render = app.response.render;
	app.response.errorProxy = function (err) {
    console.log(err);
		errorProxy.apply(this, arguments);
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
		options.doSEO = seoUtils;
		render.apply(res, [view, options, done]);
	};
	logger.info('end extend context...');
}
function configFilter(app) {
	logger.info('starting config filter...');
	app.use(require('./interceptor/authIntercept')());
	logger.info('end config filter...');
}
function configRoute(app) {
	logger.info('starting config route...');
	var ctrls_path = path.resolve(__dirname, 'controller'), ctrl_path, controller;
	var files = fs.readdirSync(ctrls_path);
	files.forEach(function (file) {
		ctrl_path = path.join(ctrls_path, file);
		controller = require(ctrl_path);
		Object.keys(controller).forEach(function (key) {
			if (key == "doGet" || key == 'doPost') { //注册多个get,多个post
				var routes = controller[key]();
				Object.keys(routes).forEach(function (temp) {
					configProxy(temp, routes[temp], key == "doGet" ? 'get' : 'post');
				});
			} else {
				var small_router = controller[key](), url;
				if (typeof small_router == "function") {
					configProxy("/" + key, small_router, 'get');
				} else {
					url = small_router.url || key;
					if (typeof url == "string" && url.substr(0, 1) !== "/") {
						url = "/" + url;
					}
					configProxy(url, small_router.controller, small_router.method || 'get');
				}
			}
		})
	});
	logger.info('end config route...');
	function configProxy(url, ctrl, method) {
		logger.info('config---->url:' + url + ' with method:' + method);
		app[method](url, ctrl);
	}
}
function autoproxyView(app) {
	app.use(function (req, res, next) {
		var url = req.url || "/index.c";
		url = url.replace(/\?.*/, "");
		if (req.method == "GET" && url.substr(-2) === ".c") {//auto handle view
			var viewdirectory = url.replace(/\/(.*)\.c/, "$1");
			logger.info("autoproxy view ===> /" + viewdirectory + ".ejs");
			res.render(viewdirectory);
		} else {//skip not view
			next();
		}
	});
}
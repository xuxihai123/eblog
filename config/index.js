var path = require('path');
var urls = require('./urls');
var settings = require('./settings');
var interceptPath = settings.interceptPath;

var setup_interceptor = require(path.resolve(interceptPath, 'setupFilter.js'));
var auth_interceptor = require(path.resolve(interceptPath, 'authIntercept.js'));
module.exports = function (app) {
	// app.use(setup_interceptor());
	app.use(auth_interceptor());
	//all controllers
	urls(app, settings);
};
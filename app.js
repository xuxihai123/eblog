var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var settings = require("./config/settings");
var urls = require("./config/urls");

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs'); //设置视图引擎。


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(session({
	secret: 'blog.xxh123',
	name:"blog.xxh",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false, maxAge: 1000 * 60*30}
}));
//auth user
var auth_intercepter = require('./server/interceptor/authIntercept');
app.use(auth_intercepter());
//config of app
settings.config(app);
//all controllers
urls.config(app);
//auto resolve view
urls.autoproxy(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		console.error(err.stack);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	console.error(err.stack);
	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = app;



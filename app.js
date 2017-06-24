var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('config-lite');

var app = express();
var server = require('./server');
// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs'); //设置视图引擎。

// uncomment after placing your favicon in /public
app.use(require('morgan')('dev', {"stream": server.logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.use(session({
	secret: config.session.secret,
	name: config.session.name,
	resave: false,
	saveUninitialized: true,
	cookie: config.session.cookie
}));

app.readyPromise = server(app);
app.logger = server.logger;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	res.errorProxy(err, 404);
	//next(err);
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.errorProxy(err, 500);
});

module.exports = app;

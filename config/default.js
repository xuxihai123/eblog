'use strict';

module.exports = {
	port: 3000,
	type: 'mysql',
	url: 'mysql://blog_dev:blog_dev@127.0.0.1/blog_dev?e&charset=utf8',
	loggerLevel: 'debug',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	}
};
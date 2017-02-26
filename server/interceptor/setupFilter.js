'use strict';
module.exports = function () {
	var firstSetup=true,SETUP_REG=/\/setup\/install\.(c|do)$/;
	return function (req, res, next) {
		firstSetup = req.app.set('setupFlag');
		if (firstSetup===true) {
			setupApplication(req, res, next);
		} else if(firstSetup===false){
			setupPrevent(req, res, next);
		}else{
			next();
		}
	};

	function setupApplication(req, res, next) {
		if (SETUP_REG.test(req.url)) {
			next();
		} else {
			res.redirect('/setup/install.c');
		}
	}

	function setupPrevent(req, res, next) {
		if (SETUP_REG.test(req.url)) {
			res.redirect('/');
		} else {
			next();
		}
	}
};
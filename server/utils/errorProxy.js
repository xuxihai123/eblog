var logger = require('./logger');

var exceptMap = {
	DefaultExcept: "123456",
	SqlException: "591000",
	ExistException: "592000",
	NotFoundException: "404000",
	SystemException: "5150000",
	SessionTimeoutException: "999999"
};


function Proxy(errorObj, errorCode) { //foreground 前台标志
	logger.debug('response error proxy ...');
	var response = this;
	var req = response.req;
	var url = req.url;
	if (errorCode === 404) {
		return response.status(404).render("404");
	}
	logger.error('[errorProxy]: from request url :' + req.url + ' =>' + errorObj.stack);

	if (errorCode == 500) {
		return response.render(errorCode + "");
	} else {
		if (errorObj == "sqlInject") {
			return response.render("404");
		}
		var req = response.req;
		if (req.xhr) {
			errorObj = errorObj || {};
			if (errorObj.code === "ER_DUP_ENTRY") {
				errorObj.errorCode = exceptMap["SqlException"];
				errorObj.errorMessage = "已存在该条记录！";
			} else {
				errorObj.errorCode = exceptMap["DefaultExcept"];
				errorObj.errorMessage = "系统异常";
			}
			response.json(errorObj);
		} else {
			return response.render("500");
		}
	}

}
module.exports = Proxy;

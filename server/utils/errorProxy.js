var exceptMap = {
	DefaultExcept: "123456",
	SqlException: "591000",
	NotFoundException: "404000",
	SystemException: "55000",
	SessionTimeoutException: "999999"
};


function Proxy(type, errorObj) { //foreground 前台标志
	var response = this;
	if(/^\d+$/.test(type)){ //前台响应错误页面
		response.render(type,errorObj);
	}else{
		errorObj = errorObj || {};
		errorObj.errorType = type;
		errorObj.errorCode = exceptMap[type || "DefaultExcept"];
		response.json(errorObj);
	}
}
module.exports = Proxy;

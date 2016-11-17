var exceptMap = {
	DefaultExcept: "123456",
	SqlException: "591000",
	NotFoundException: "404000",
	SystemException: "55000",
	SessionTimeoutException: "999999"
};


function Proxy(type, errorObj) {
	var response = this;
	errorObj = errorObj || {};
	errorObj.errorType = type;
	errorObj.errorCode = exceptMap[type || "DefaultExcept"];
	response.json(errorObj);
}

module.exports = Proxy;
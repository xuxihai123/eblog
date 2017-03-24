var path = require('path');
var serverPath = path.resolve(__dirname, '../server');
var controllerPath = path.resolve(serverPath, 'controller');
var interceptPath = path.resolve(serverPath, 'interceptor');
module.exports = {
	reset_key:"227754",
	serverPath: serverPath,
	controllerPath: controllerPath,
	interceptPath: interceptPath
};
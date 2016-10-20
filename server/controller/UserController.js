/**
 * add user
 * @returns {Function}
 */
exports.register = function (req,res,next) {
	var req_pargs=req.body;
	res.send('respond with a register');
};
exports.login = function (req,res,next) {
	var req_pargs=req.body;
	res.send('respond with a login');
};
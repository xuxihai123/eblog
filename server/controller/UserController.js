/**
 * add user
 * @returns {Function}
 */
exports.register = function () {
    return {
        controller: function (req, res, next) {
            var req_pargs = req.body;
            res.send('respond with a register');
        }
    };
};
exports.login = function() {
    return function (req, res, next) {
        var req_pargs = req.body;
        res.send('respond with a login');
    };
};
var User = require("../models/wp_users");
/**
 * add user
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url:"/",
		controller: function (req, res, next) {
			res.render("index", {"title": "Express"});
		}
	}
};
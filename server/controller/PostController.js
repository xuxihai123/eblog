var User = require("../models/wp_users");
/**
 * add user
 * @returns {Function}
 */
exports.index = function () {
	return {
		//url:/^\/(index|)\/?$/,
		url: "/",
		controller: function (req, res, next) {
			res.render("index", {"title": "Express"});
		}
	}
};
//管理接口
exports.manager = function () {
	return {
		url: "/admin/post",
		controller: function (req, res, next) {
			var operate = req.query.post_type || "list";
			if (operate == "list") {

			} else if (operate == "addUI") {

			} else if (operate == "category") {
				res.render("admin/post", {
					post_type: "tag",
					request: req,
					response: res,
					session: req.session,
				});
			} else if (operate == "tag") {
				res.render("admin/post", {
					post_type: "tag",
					request: req,
					response: res,
					session: req.session,
				});
			}

			res.render("index", {"title": "Express"});
		}
	}
};
var optionsService = require('../service').OptionService;
/**
 * user setting...
 * @returns {Function}
 */
//ajax接口
exports.doPost = function () {
	return {
		"/admin/addOption.do": function (req, res, next) {
			var req_pargs = req.body;
			var option_name = req_pargs.option_name;
			var option_value = req_pargs.option_value;
			optionsService.createOption({
				option_name:option_name,
				option_value:option_value
			}).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/deleteOption.do": function (req, res, next) {
			var req_pargs = req.body;
			var option_id = req_pargs.option_id;
			optionsService.removeOption(option_id).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/optionList.do": function (req, res, next) {
			var req_pargs = req.body;
			var offset = req_pargs.offset || 0;
			var limit = req_pargs.limit || 10;
			optionsService.getOptionPage(offset,limit).then(function (pageModel) {
				res.json(pageModel);
			}).caught(function (error) {
				res.errorProxy(error);
			});
		},
		"/admin/updateOption.do": function (req, res, next) {
			var req_pargs = req.body;
			var option_id = req_pargs.option_id;
			var option_name = req_pargs.option_name;
			var option_value = req_pargs.option_value;
			optionsService.updateOption({
				option_id:option_id,
				option_name:option_name,
				option_value:option_value
			}).then(function (result) {
				res.json({
					success: "ok"
				});
			}).caught(function (error) {
				res.errorProxy(error);
			});
		}
	};
};
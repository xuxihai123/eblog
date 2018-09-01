$(function () {
	var menuNode = $("#menu-list");

	menuNode.on("click", function (event) {
		var target, target_link, last_active, target_ul;
		target = event.target;
		target_link = $(target).parents("a.level1");
		if ($(target_link).hasClass("menu-ctrl")) {
			$(this).find(".menu-nav2").hide();

			$(document.body).toggleClass("folded");
			$(target_link).find("i").toggleClass("icon-circle-arrow-left");
			$(target_link).find("i").toggleClass("icon-circle-arrow-right");

		} else {
			//if ($(document.body).hasClass("folded")) {
			//
			//} else {
			//	if ($(target_link).hasClass("level1")) {
			//		target_ul = $(target_link).next();
			//		if (target_ul.is(":visible")) {
			//			$(target_link).removeClass('active');
			//			target_ul.slideUp();
			//		} else {
			//			$(menuNode).find("a.level1").removeClass('active');
			//			$(menuNode).find("ul.menu-nav2").slideUp();
			//			$(target_link).addClass('active');
			//			target_ul.slideDown();
			//		}
			//	} else {
			//		var menu_nav2 = $(target).parent().parent();
			//		if (menu_nav2.hasClass("menu-nav2")) {
			//			$(menu_nav2).find("a.active").removeClass('active');
			//			$(target).addClass('active');
			//		}
			//
			//	}
			//}
		}

	});
});

function deleteTerm(termid,count) {
	if(count==0){
		$("#modalDialog").modal();
	}
	var action = WPactions.deleteCategory(termid);
	window.location.href = action;
}

(function (window) {

	function stringReplace(template, params) {
		var result = template, args;
		for (var i = 0; i < params.length; i++) {
			args = encodeURI(params[i]);
			result = result.replace(/(\w+=)\?/, "$1" + args);
		}
		return result;
	}

	function formatAction(action, params) {
		if (action && params) {
			if (typeof params == "string") {
				return stringReplace(action, [params]);
			} else if (Array.isArray(params)) {
				return stringReplace(action, params);
			} else {
				return action;
			}
		} else {
			return action;
		}
	}


	window.WPactions = {
		deleteCategory: function (termId) {
			return formatAction("/admin/delete_category?termId=?", termId);
		},
		deleteTag: function (termId) {
			return formatAction("/admin/delete_category?termId=?", termId);
		}
	}
})(window);
(function (window, angular) {
	var app = angular.module("app");
	app.directive("uiDatePicker", ["$filter", function ($filter) {

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				console.log(attrs.vModel);
				console.log(attrs.ngModel);
			}
		};
	}]);
})(window, angular);

(function (window, angular) {
	var app = angular.module("app");
	app.directive("uiSlideToggle", function () {
		return {
			restrict: 'A',
			link: function (scope, element) {
				element.bind("click", function (event) {
					var target = event.target, target_link;
					target_link = $(target).parents("a.level1");
					if ($(target_link).hasClass("menu-ctrl")) {
						$(this).find(".menu-nav2").hide();
						$(document.body).toggleClass("folded");
						$(target_link).find("i").toggleClass("icon-circle-arrow-left");
						$(target_link).find("i").toggleClass("icon-circle-arrow-right");
					}else{
						if ($(target_link).hasClass("level1")) {
							var level2_ul = $(target_link).next();
							if (level2_ul.is(":visible")) {
								level2_ul.slideUp();
								$(target_link).removeClass("active");
							} else {
								$(target_link).parent().parent().find("li>a").removeClass("active");
								$(target_link).parent().parent().find("ul.menu-nav2").slideUp();
								$(target_link).parent().find("ul.menu-nav2").slideDown();
								$(target_link).addClass("active");
							}
						} else if ($(target).hasClass("level2")) {
							$(target).parent().parent().children().removeClass("active");
							$(target).parent().addClass("active");
						}
					}

				});
			}
		}
	});
})(window, angular);
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
					} else {
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

(function (window, angular, undefined) {
	'use strict';
	var directive = {};
	directive.uiPager = ['$log', '$compile', '$rootScope',
		function ($log, $compile, $rootScope) {
			// 设置默认值
			var defaults = {
				pageLimit: 10
				// 最多显示多少页
			};
			return {
				restrict: 'A',
				template: "<div class='pagination'></div>",
				replace: true,
				link: function ($scope, elem, attrs, ctrl) {
					var name = attrs.uiPager;
					var callback = attrs.callback;
					// 监听pager是否改变
					$scope.$watch(function () {
						return $scope[name];
					}, function (newValue, oldValue) {
						// 获取pager数据源
						if (newValue == undefined) {
							return;
						}
						createPager(newValue);
					});
					function createPager(pager) {
						$(elem).empty();
						// 总页数
						var pageCapacity = Math.ceil(pager.capacity / pager.limit);
						// 当前页码
						var curPage = pager.offset / pager.limit + 1;
						if (pageCapacity <= 1 && pager.offset == 0) {
							// 如果没有数据移除分页栏
							return;
						}
						// 显示多少页
						var pageLimit;
						if (pageCapacity > defaults.pageLimit) {
							pageLimit = defaults.pageLimit;
						} else {
							pageLimit = pageCapacity;
						}
						// 首页偏移量
						var pageOffset = curPage - (defaults.pageLimit / 2);
						if (pageOffset + defaults.pageLimit > pageCapacity) {
							pageOffset = pageCapacity - defaults.pageLimit;
						}
						if (pageOffset < 0) {
							pageOffset = 0;
						}
						var ul = $("<ul></ul>");
						var first;
						if (curPage == 1) {
							first = $("<li ><a class='disable' href='javascript:void(0);'>首页</a></li>");
						} else {
							first = $("<li><a href='javascript:void(0);' v-click='" + callback + "(" + 0 * pager.limit + ", " + pager.limit + ")'>首页</a></li>");
						}
						ul.append(first);
						var prev;
						if (curPage == 1) {
							prev = $("<li ><a class='disable' href='javascript:void(0);'>上一页</a></li>");
						} else {
							prev = $("<li><a href='javascript:void(0);' v-click='" + callback + "(" + (curPage - 2) * pager.limit + ", " + pager.limit + ")'>上一页</a></li>");
						}
						ul.append(prev);
						for (var i = 1; i <= pageLimit; i++) {
							var page;
							if (curPage == (i + pageOffset)) {
								page = "<li class='active'><a href='javascript:void(0);'>" + (i + pageOffset) + "</a></li>";
							} else {
								page = "<li><a href='javascript:void(0);' v-click='" + callback + "(" + (i + pageOffset - 1) * pager.limit + ", " + pager.limit + ")'>" + (i + pageOffset) + "</a></li>";
							}
							ul.append(page);
						}
						var next;
						if (curPage == pageOffset + pageLimit) {
							next = $("<li ><a class='disable' href='javascript:void(0);'>下一页</a></li>");
						} else {
							next = $("<li><a href='javascript:void(0);' v-click='" + callback + "(" + curPage * pager.limit + ", " + pager.limit + ")'>下一页</a></li>");
						}
						var last;
						if (curPage == pageCapacity) {
							last = $("<li ><a class='disable' href='javascript:void(0);'>尾页</a></li>");
						} else {
							last = $("<li><a href='javascript:void(0);' v-click='" + callback + "(" + (pageCapacity-1) * pager.limit + ", " + pager.limit + ")'>尾页</a></li>");
						}
						ul.append(next);
						ul.append(last);
						$(elem).append(ul);
						$compile(elem.contents())($scope);
					}

				}
			};
		}];
	angular.module('app').directive(directive);
})(window, window.angular);
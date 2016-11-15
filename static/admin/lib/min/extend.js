//remote service
(function (window, angular) {
	var ng = angular.module("ng");

	angular.extend(angular, {
		isUndefined:function (value) {
			return "undefined" == typeof value;
		},
		isEmpty:function(value) {
			return angular.isUndefined(value) || "" === value || null === value || value !== value;
		},

	});
	ng.config(["$provide", "$compileProvider",function ($provide, $compileProvider, $filterProvider) {

		$provide.provider({
			$remote: $remoteProvider
		});
		$compileProvider.directive({

		});
	}]);
	function $remoteProvider() {
		var service = {
			errorTag: "$error",
			config: {},
			queue: 0,
			clientMode: !1,
			trsContext: null,
			getFailDataFn: null,
			sendBeforeFn: null,
			sendAfterFn: null,
			setErrorCallback: function (fn) {
				this.getFailDataFn = fn;
			},
			setSendBeforeFn: function (fn) {
				this.sendBeforeFn = fn;
			},
			setSendAfterFn: function (fn) {
				this.sendAfterFn = fn;
			},
			setErrorTag: function (tag) {
				this.errorTag = tag;
			},
			setTrsContext: function (prefix) {
				window.TRSCONTEXT = this.trsContext = prefix;
			},
			setClientMode: function (mode) {
				window.CLIENTMODE = this.clientMode = mode;
			}
		}, $minErr = angular.$$minErr("$remoteErr");
		angular.extend(this, service);

		this.$get = ['$http', '$log', function ($http, $log) {

			var now = Date.now,
					errorTag = this.errorTag,
					getFailData = this.getFailDataFn;

			function preHandle(config) {
				var url = config.url;
				if (url.indexOf("/") != 0) {
					config.url = this.TRSCONTEXT + '/' + url;
				}
			}

			function proxy(method, url, data, okFn, errorFn, config) {
				config = angular.extend(config || {}, {
					method: method,
					url: url,
					data: data,
					//ajaxPort: ajaxPort,
					//$referer: refer
				});

				preHandle.apply(this, [config]);

				var start = now();

				$log.debug('remote ' + method + ': ' + url + ( data ? ', with data: ' + angular.toJson(data) : ''));
				$http(config).then(function (response) {
					if (response.data && response.status >= 200 && 300 > response.status) {
						success(response.data, response.status, response.headers, config);
					} else {
						fail(response.data, response.status, response.headers, config);

					}
				}, function (response) {
					fail(response.data, response.status, response.headers, config);
				});

				function success(data, status, headers, config) {
					//success: status[200, 300)
					var flag = false, error;
					if (typeof errorTag == "function") {
						flag = errorTag(data, status, headers, config) || false;
					} else {
						flag = data[errorTag] || false;
					}
					if (flag) {
						if (errorFn) {
							error = errorFn(data, status, headers, config);
						} else {
							error = getFailData && getFailData(data, status, headers, config);
						}
					}
					if (error) {
						$log.error('remote receive(' + (now() - start) + 'ms): ' + url + ', with error: ' + angular.toJson(error));
					} else {
						$log.debug('remote receive(' + (now() - start) + 'ms): ' + url + ( data ? ', with data: ' + angular.toJson(data) : ''));
						okFn && okFn(data);
					}
				}

				function fail(data, status, headers, config) {
					$log.error('remote receive(' + (now() - start) + 'ms): ' + url + ', with error: ' + angular.toJson(data));
					if (errorFn) {
						errorFn(data, status, headers, config);
					} else {
						getFailData && getFailData(data, status, headers, config);
					}

				}
			}

			return {
				post: function (url, params, okFn, errFn, config) {
					proxy("POST", url, params, okFn, errFn, config);
				},
				get: function (url, params, okFn, errFn, config) {
					proxy("GET", url, params, okFn, errFn, config);
				}
			};


		}];
	}

})(window, window.angular);
//v-page
(function (window, angular) {
	"use strict";
	function ngPagesController(scope, element, attr, $http, $templateCache) {
		this.pages = [];
		this.activePage = this.historyPage = 0;
	}

	ngPagesController.$inject = ["$scope", "$element", "$attrs", "$http"];
	var directive = {};
	directive.ngPages = ["$log", "$location", "$rootScope", function ($log, $location, $rootScope) {
		//handle when history button back or forward
		$rootScope.$on('$locationChangeSuccess', afterHandle);
		function afterHandle($locationEvent, newUrl, oldUrl) {
			//处理vpage,不处理route
			if (/\/vpage=(\d+)/.test(newUrl)) {
				if (!$rootScope.$flag) { //$flag在loadPage时为真
					var target = newUrl.replace(/.*=(\d+)/, "$1");
					$rootScope.$loadPage("#" + target, true); //只处理vpage的隐藏和显示
				}
			}
			$rootScope.$flag = false;
		}

		return {
			restrict: 'A',
			//terminal : true, // disable page inner compile for lazy-compile
			//require : ['vPage', '^vViewport'],
			controller: ngPagesController,
			link: function (scope, element, attr, ctrl) {

				ctrl.pages = element.children("div[v-page]");
				for (var i = 1; i < ctrl.pages.length; i++) {
					ctrl.pages[i].style.display = "none";
				}
				if (window.CLIENTMODE) {
					var page = $(ctrl.pages[0]);
					if (page.length > 0) {
						NativeCall.SetTitle(page.attr("title"));
					}
				}
				scope.$root.$loadPage = function (param, flag) {
					scope.$root.$flag = true;
					if (/^[#]/.test(param)) {
						ctrl.historyPage = ctrl.activePage;
						if (/^\d$/.test(param.substr(1))) {
							ctrl.activePage = parseInt(param.substr(1)) - 1;
							if (ctrl.activePage < 0) {
								ctrl.activePage = 0;
								ctrl.historyPage = 0;
							}
						} else { //expr="#+1"  or "#-1"
							var value = eval(ctrl.historyPage + param.substr(1));
							ctrl.activePage = value > 0 ? value : 0;
						}

						ctrl.pages.eq(ctrl.historyPage).hide();
						var act = ctrl.pages.eq(ctrl.activePage);
						if (window.CLIENTMODE) {
							NativeCall.SetTitle(act.attr("title"));
						}
						ctrl.pages.eq(ctrl.activePage).show();
						//handle url when $loadPage by js;
						if (!flag) {
							//非后退状态需要处理history state,后退状态不需要处理(只是隐藏和显示)
							var routeUrl = location.hash.substr(1);
							if (/\/vpage=(\d+)/.test(routeUrl)) {
								routeUrl = routeUrl.replace(/=\d+/, "=" + (ctrl.activePage + 1));
								$location.path(routeUrl);
							} else {
								$location.path(routeUrl + "/vpage=" + (ctrl.activePage + 1));
							}
						}
						//冒泡事件
						scope.$emit("$pageContentLoaded", param);
					}
				};
			}
		};
	}];
	directive.ngPage = ["$templateRequest", "$compile", function ($templateRequest, $compile) {
		return {
			restrict: 'A',
			//terminal : true, // disable page inner compile for lazy-compile
			//require : ['vPage', '^vViewport'],
			priority: 100,
			//controller : ngPagesController,
			link: function (scope, element, attr) {
				//element[0].style.display="none";
				if (attr.href) {
					$templateRequest(attr.href, true).then(function (response) {
						element.html(response);
						$compile(element.contents())(scope);
					}, function () {
						$log.error(attr.href + "装载失败！");
					});
				}
			}
		};
	}];
	angular.module("ngRoute").directive(directive).run(["$route","$location", function ($route,$location) {
		function filterNgPage($locationEvent, newUrl, oldUrl) {
			if(newUrl===oldUrl) { //刷新
				if (/\/vpage=(\d+)/.test(newUrl)) {
					var reto = location.hash.substr(1).replace(/\/vpage=\d+/, "");
					$location.path(reto);
					return true;
				}
			}else{ //非刷新
				if (/\/vpage=(\d+)/.test(newUrl)) {
					console.log("filter url for route");
					return true;
				}
			}
		}

		$route.$NoRouteFilters.push(filterNgPage);
	}]);
})(window, window.angular);
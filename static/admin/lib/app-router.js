(function (window) {
	window.Menu = [ //生成路由和菜单
		{
			"ActionName": "用户",
			"Level": "1",
			"root": "User",
			"MenuList": [
				{
					"ActionName": "UserAdd",
					"Level": "2",
					"ActionId": "UserAdd",
				},
				{
					"ActionName": "UserList",
					"Level": "2",
					"ActionId": "UserList",
				},
				{
					"ActionName": "UserInfo",
					"Level": "2",
					"ActionId": "UserInfo",
					"MenuList": []
				}
			]
		},

		{
			"ActionName": "文章",
			"Level": "1",
			"root": "Post",
			"MenuList": [
				{
					"ActionName": "PostAdd",
					"Level": "2",
					"ActionId": "PostAdd",
				},
				{
					"ActionName": "PostCategory",
					"Level": "2",
					"ActionId": "PostCategory",
					"MenuList": []
				},
				{
					"ActionName": "PostList",
					"Level": "2",
					"ActionId": "PostList",
					"MenuList": []
				},
				{
					"ActionName": "PostTag",
					"Level": "2",
					"ActionId": "PostTag",
					"MenuList": []
				}
			]
		}
	];
})(window);


(function (window, angular, undefined) {
	'use strict';
	app.config(config);
	config.$inject = ['$routeProvider', '$httpProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide"];
	function config($routeProvider, $httpProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
		app.register = {
			controller: $controllerProvider.register,
			directive: $compileProvider.directive,
			filter: $filterProvider.register,
			factory: $provide.factory,
			service: $provide.service
		};
		var whenroute = $routeProvider.when;
		$routeProvider.when = function (path, route) {
			console.debug("注册路由:" + path + " ===> " + route.templateUrl);
			return whenroute.apply($routeProvider, [path, route]);
		};
		$controllerProvider.allowGlobals();

		$routeProvider.otherwise({
			redirectTo: "/Welcome"
		});

		$routeProvider.when("/Welcome", {
			templateUrl: 'htmls/Welcome/Welcome.html',
		});
		for (var i = 0; i < Menu.length; i++) {
			if (Menu[i].ActionId) {
				$routeProvider.when("/" + Menu[i].ActionId, {
					templateUrl: "htmls/" + Menu[i].ActionId + "/" + Menu[i].ActionId + ".html"
				});
				continue;
			}
			var children = Menu[i].MenuList, node2, prefix1 = Menu[i].root, url;
			for (var j = 0; j < children.length; j++) {
				node2 = children[j];
				if (node2.ActionId) {
					if (prefix1) {
						url = "htmls/" + prefix1 + "/" + node2.ActionId + "/" + node2.ActionId + ".html";
					} else {
						url = "htmls/" + node2.ActionId + "/" + node2.ActionId + ".html";
					}
					$routeProvider.when("/" + node2.ActionId, {
						templateUrl: url
					});
				} else {
					var children3 = node2.MenuList, node3, prefix2 = node2.root;

					for (var k = 0; k < children3.length; k++) {
						node3 = children3[k];
						if (prefix1 && prefix2) {
							url = "htmls/" + prefix1 + "/" + prefix2 + "/" + node3.ActionId + "/" + node3.ActionId + ".html";
						} else if (prefix1 && !prefix2) {
							url = "htmls/" + prefix1 + "/" + node3.ActionId + "/" + node3.ActionId + ".html";
						} else if (!prefix1 && prefix2) {
							url = "htmls/" + prefix2 + "/" + node3.ActionId + "/" + node3.ActionId + ".html";
						}
						$routeProvider.when("/" + node3.ActionId, {
							templateUrl: url
						});
					}
				}

			}
		}
	};

})(window, angular);


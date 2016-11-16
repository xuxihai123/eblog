(function (window) {
	//生成路由和菜单
	window.Menu = [
		{
			"ActionName": "用户",
			"Level": "1",
			"NodeName": "User",
			"MenuList": [
				{
					"ActionName": "用户添加",
					"Level": "2",
					"NodeName": "UserAdd",
				},
				{
					"ActionName": "所有用户",
					"Level": "2",
					"NodeName": "UserList",
				},
				{
					"ActionName": "用户信息",
					"Level": "2",
					"NodeName": "UserInfo",
				}
			]
		},

		{
			"ActionName": "文章",
			"Level": "1",
			"NodeName": "Post",
			"MenuList": [
				{
					"ActionName": "写文章",
					"Level": "2",
					"NodeName": "PostAdd",
				}, {
					"ActionName": "编辑文章",
					"Level": "2",
					"NodeName": "PostEdit",
					"RouteUrl": "/PostEdit/:PostId"
				},
				{
					"ActionName": "文章分类",
					"Level": "2",
					"NodeName": "PostCategory",
				},
				{
					"ActionName": "所有文章",
					"Level": "2",
					"NodeName": "PostList",
				},
				{
					"ActionName": "文章标签",
					"Level": "2",
					"NodeName": "PostTag",
				}
			]
		},{
			"ActionName": "页面",
			"Level": "1",
			"NodeName": "Page",
			"MenuList": [
				{
					"ActionName": "所有页面",
					"Level": "2",
					"NodeName": "PageList",
				}, {
					"ActionName": "新建页面",
					"Level": "2",
					"NodeName": "PageAdd",
				}
			]
		},
		{
			"ActionName": "评论",
			"Level": "1",
			"NodeName": "Comment",
			"MenuList": [
				{
					"ActionName": "评论列表",
					"Level": "2",
					"NodeName": "CommentList",
				}, {
					"ActionName": "评论审核",
					"Level": "2",
					"NodeName": "CommentListx",
					"RouteUrl": "/CommentListx/:PostId"
				}
			]
		}
	];
	//菜单生成导航数组
	window.Breadcrumb = (function () {
		var arraylist = [];

		function getBreadcrumb(base, Menu) {
			if (!base) {
				base = [];
				base.push("Home");
			}
			for (var i = 0; i < Menu.length; i++) {
				var temp_node = Menu[i];
				if (temp_node.MenuList && temp_node.MenuList.length > 0) {
					var base2 = base.slice(0);
					base2.push(temp_node.ActionName);
					getBreadcrumb(base2, temp_node.MenuList);
				} else {
					var base2 = base.slice(0);
					base2.push(temp_node.ActionName);

					arraylist.push({
						bread: base2.splice(0),
						RouteUrl: temp_node.RouteUrl ? temp_node.RouteUrl : "/" + temp_node.NodeName
					});
				}
			}
		}

		getBreadcrumb(null, Menu);
		return arraylist;
	})();
	//通过路由定位导航
	window.getBread = function (routeUrl) {
		for (var i = 0; i < window.Breadcrumb.length; i++) {
			var temp = window.Breadcrumb[i];
			if (routeUrl == temp.RouteUrl) {
				return temp.bread;
			}
		}
	};
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
		//遍历菜单生成路由
		function registerRoute(base, Menu) {
			base = base || "htmls";
			for (var i = 0; i < Menu.length; i++) {
				var temp_node = Menu[i];
				if (temp_node.MenuList && temp_node.MenuList.length > 0) {
					registerRoute(base + "/" + temp_node.NodeName, temp_node.MenuList);
				} else {
					if (temp_node.RouteUrl) {
						$routeProvider.when(temp_node.RouteUrl, {
							templateUrl: base + "/" + temp_node.NodeName + "/" + temp_node.NodeName + ".html"
						});
					} else {
						$routeProvider.when("/" + temp_node.NodeName, {
							templateUrl: base + "/" + temp_node.NodeName + "/" + temp_node.NodeName + ".html"
						});
					}
				}
			}
		}

		registerRoute(null, Menu);
	};

})(window, angular);


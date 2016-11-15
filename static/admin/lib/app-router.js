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
		//var whenroute = $routeProvider.when;
		//$routeProvider.when = function (path, route) {
		//	console.debug("注册路由:" + path + " ===> " + route.templateUrl);
		//	return whenroute.apply($routeProvider, [path, route]);
		//};
		$controllerProvider.allowGlobals();

		$routeProvider.otherwise({
			redirectTo: "/Welcome"
		});

		$routeProvider.when("/Welcome", {
			templateUrl: 'htmls/Welcome/Welcome.html',
		});
	};

})(window, angular);
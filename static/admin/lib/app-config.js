var app = angular.module("app", ["ngRoute", "oc.lazyLoad"]);


app.run(["$rootScope", "$location", function ($rootScope, $location) {
	$rootScope.goto = function (url, isReload) {
		if (!url)
			return;
		if (/^[\/]/.test(url)) {
			var currentScope = vx.element("div[v-view]>*").scope() || vx.element("body").scope();
			if ($location.path() != url) {
				//NativeCall.pages.push($location.$$path);
				$location.path(url);
				if (isReload)
					currentScope.$apply();
			} else {
				currentScope.$apply();
			}
		} else if (/^[#]/.test(url)) {
			$rootScope.$loadPage(url);
		} else if (/\.html/.test(url)) {
			window.location = url;
		}
	};
}]);


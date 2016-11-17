var app = angular.module("app", [
	"ngRoute",
	"oc.lazyLoad",
	"ui.bootstrap",
]);
/**
 * 系统错误分类
 * 9开头为系统及服务器错误
 * 6开头业务逻辑错误
 *
 * @type {string[]}
 */
configLog.$inject = ["$logProvider"];
function configLog($logProvider) {
	$logProvider.debugEnabled(true);
}

configRemote.$inject = ["$remoteProvider"];
function configRemote($remoteProvider) {
	$remoteProvider.setErrorTag(function (data, status, headers, config) {
		if (data.errorCode) {
			return true;
		}
	});
	$remoteProvider.setSendBeforeFn(function(config) {
		console.log('setSendBeforeFn');
	});
	$remoteProvider.setSendAfterFn(function (config) {
		console.log('setSendAfterFn');
	});
	$remoteProvider.setErrorCallback(function (data, status, headers, config) {
		if (data.errorCode == "999999") { //会话超时或未登录
			window.location.href = "login.html";
		}else if(data.errorCode=="600404"){

		}
	});
}
app.config(configLog);
app.config(configRemote);

app.run(["$rootScope", "$location", "$remote", "$cookieService", function ($rootScope, $location, $remote, $cookieService) {

	$remote.post("admin/getInfo.do", {}, function (data) {
		if (data.errorCode == "999999") {
			window.location.href = "login.html";
		} else {
			$rootScope.$userinfo = data;
		}
	});
}]);

app.run(["$rootScope", "$location", "$remote", "$modal", "$route", function ($rootScope, $location, $remote, $modal, $route) {

	$rootScope.$on('$routeChangeStart', function (event, preparedRoute, lastRoute) {
		$rootScope.$nextRouteWrapper = preparedRoute;
		$rootScope.$lastRouteWrapper = lastRoute;
		$rootScope.$currentRoute = preparedRoute && preparedRoute.$$route;
		if($rootScope.$currentRoute&&$rootScope.$currentRoute.originalPath){
			$rootScope.$Bread = getBread($rootScope.$currentRoute.originalPath);
		}
	});

	$rootScope.$confirm = function (message) {
		if (!$rootScope.$confirm.isOpen) {
			$rootScope.$confirm.isOpen = true;
			var modalInstance = $modal.open({
				templateUrl: 'htmls/Dialog/Confirm.html',
				controller: ['$scope', '$modalInstance',
					function ($scope, $modalInstance) {
						$scope.message = message;
						$scope.ok = function () {
							$modalInstance.close();
							$rootScope.$confirm.isOpen = false;
							if (message.ok && typeof message.ok == "function") {
								message.ok.apply($scope);
							}
						};
						$scope.cancel = function () {
							$modalInstance.dismiss('cancel');
							$rootScope.$confirm.isOpen = false;
							if (message.cancel && typeof message.cancel == "function") {
								message.cancel.apply($scope);
							}
						};
					}]
			});
		}
	};
	$rootScope.$alert = function (message) {
		if (!$rootScope.$alert.isOpen) {
			$rootScope.$alert.isOpen = true;
			var modalInstance = $modal.open({
				templateUrl: 'htmls/Dialog/Alert.html',
				controller: ['$scope', '$modalInstance',
					function ($scope, $modalInstance) {
						$scope.message = message;
						$scope.ok = function () {
							$modalInstance.close();
							$rootScope.$alert.isOpen = false;
							if (message.ok && typeof message.ok == "function") {
								message.ok.apply($scope);
							}
						};
					}]

			});

		}
	};

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
			}
		} else if (/^[#]/.test(url)) {
			$rootScope.$loadPage(url);
		} else if (/\.html/.test(url)) {
			window.location = url;
		}
	};
	$rootScope.routeRefresh = function () {
		$route.reload();
	};
	$rootScope.logout = function () {
		$remote.post("user/signout", {}, function (data) {
			if (data && data.success == "ok") {
				window.location.href = "login.html";
			}
		});
	};
}]);



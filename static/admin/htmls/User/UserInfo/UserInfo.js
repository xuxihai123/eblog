UserInfoCtrl.$inject = ["$scope", "$remote"];
function UserInfoCtrl($scope, $remote) {
	$scope.startup = function () {
		var pargs = {};
		$remote.post("admin/userinfo.do", pargs, function (data) {
			$scope.userinfo = data;
		});
	};

}
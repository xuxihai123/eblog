CommentListCtrl.$inject = ["$scope", "$remote"];
function CommentListCtrl($scope, $remote) {
	$scope.startup = function () {
		$scope.doQuery(0, 10);
	};

	$scope.doQuery = function (offset, limit) {
		$remote.post("admin/commentlist.do", {
			offset: offset,
			limit: limit
		}, function (data) {
			$scope.pageModel = {
				offset: data.offset,
				limit: data.limit,
				capacity: data.recordCount,
				List: data.recordList
			};
		})
	};

	$scope.deleteUser = function (row) {
		$scope.$confirm({
			title: "警告!",
			content: "文章删除不可恢复!",
			ok: function () {
				var pargs = {
					user_login: row.user_login
				};
				$remote.post("admin/delete_user.do", pargs, function (data) {
					if (data.success == "ok") {
						$scope.routeRefresh();
					}
				});
			}
		});
	};
}
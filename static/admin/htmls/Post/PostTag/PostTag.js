PostTagCtrl.$inject = ["$scope", "$remote", "$location"];
function PostTagCtrl($scope, $remote, $location) {
	$scope.startup = function () {
		$scope.doQuery(0, 10);
	};

	$scope.doQuery = function (offset, limit) {
		$remote.post("admin/postTagList.do", {
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

	$scope.postTag = function () {
		var pargs = {
			name: $scope.name,
			slug: $scope.slug,
			description: $scope.description,
		};
		$remote.post("admin/post_tag.do", pargs, function (data) {
			if (data.success == "ok") {
				$scope.$alert({
					title: "success",
					content: "success",
					ok: function () {
						$scope.routeRefresh();
					}
				});
			}
		});
	};

	$scope.deleteTag = function (row) {
		if (row.count != 0) {
			$scope.$confirm({
				title: "错误操作!",
				content: "分类下文章数不为0"
			});
		} else {
			var pargs = {
				term_id: row.term_id
			};
			$remote.post("admin/delete_tag.do", pargs, function (data) {
				if (data.success == "ok") {
					$scope.routeRefresh();
				}
			});
		}
	};
}
PostAddCtrl.$inject = ["$scope", "$remote","$location"];
function PostAddCtrl($scope, $remote,$location) {
	$scope.startup = function () {
		$remote.post("admin/postAllCategory.do", {}, function (data) {
			$scope.allCategory = data;
		});
		$remote.post("admin/postAllTag.do", {}, function (data) {
			$scope.allTag = data;
		});
		var testEditor = editormd("editormd", {
			width: "auto",
			height: 640,
			syncScrolling: "single",
			path: "lib/plugins/editor/",
			theme: "default",
			previewTheme: "default",
			editorTheme: "default",
			codeFold: true,
			//syncScrolling : false,
			saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
			searchReplace: true,
			watch: false,                // 关闭实时预览
			htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
			//toolbar  : false,             //关闭工具栏
			//previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
			taskList: true,
			//dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
			//dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
			//dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
			//dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
			//dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
			imageUpload: true,
			imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
			imageUploadURL: "./php/upload.php",
			onload: function () {
				console.log('onload', this);
				//this.fullscreen();
				//this.unwatch();
				//this.watch().fullscreen();

				//this.setMarkdown("#PHP");
				//this.width("100%");
				//this.height(480);
				//this.resize("100%", 640);
			}
		});
	};

	$scope.postAdd = function () {
		var post_content = $("#post_content").val();
		if (!post_content) {
			$scope.$alert({
				title: "错误！",
				content: "请填写文章内容！"
			});
		}
		var pargs = {
			post_title: $scope.post_title,
			term_id1: $scope.term_id1,
			term_id2: $scope.term_id2,
			post_content: post_content,
		};
		$remote.post("admin/post_new.do", pargs, function (data) {
			if(data.success=="ok") {
				$scope.$alert({
					title: "添加成功！",
					content: "添加文章成功！",
					ok: function () {
						$scope.routeRefresh();
					}
				});
			}
		});
	};
}
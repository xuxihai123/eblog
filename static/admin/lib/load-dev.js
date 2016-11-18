(function () {
	var cssFiles = [
		"css/admin.css",
		"css/admin-menu.css",
		"css/editormd.min.css",
		"css/editormd.preview.min.css",
		"css/extra.css"
	];
	var jsFiles = [
		"lib/min/angular-route.js",
		"lib/min/oclazyload.js",
		"lib/min/extend.js",
		"lib/plugins/editor/editormd.min.js",
		"lib/plugins/ui-bootstrap-0.13.0.js",
		"lib/app-config.js",
		"lib/app-router.js",
		"lib/directive.js",
		"lib/service.js",
		"lib/filter.js"
	];

	if (typeof (exports) != "undefined") {
		exports.jsFiles = jsFiles;
		exports.cssFiles = cssFiles;
	} else {
		for (var i = 0; i < cssFiles.length; i++) {
			loadCss(cssFiles[i]);
		}
		for (var i = 0; i < jsFiles.length; i++) {
			loadJs(jsFiles[i]);
		}
	}
	function loadJs(path) {
		var scriptTag = document.createElement("script");
		scriptTag.type = "text/javascript";
		scriptTag.src = path;
		document.write(outerHTML(scriptTag));
	}

	function outerHTML(node) {
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (function (n) {
				var div = document.createElement('div'), h;
				div.appendChild(n);
				h = div.innerHTML;
				div = null;
				return h;
			})(node);
	}

	function loadCss(path) {
		var cssLink = document.createElement("link");
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		cssLink.href = path;
		document.getElementsByTagName("head")[0].appendChild(cssLink);
	}
})();
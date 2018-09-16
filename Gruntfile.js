'use strict';
/************************************************配置************************************************/
// 源码、备份、预生产和生产环境路径
var root = "./core/client/";

// 读取要压缩的js和css文件列表
var jsFiles = require(root+'/lib/load-dev.js').jsFiles;
var cssFiles = require(root+'/lib/load-dev.js').cssFiles;

//合并和压缩后的js文件
var jstarget = {
	uncompress: root + '/lib/min/all.source.js',
	compress: root + '/lib/min/all.min.js'
};
//合并和压缩后的css文件
var csstarget = {
	uncompress: root + '/css/core.css',
	compress: root + '/css/core.min.css'
};
/************************************************结束************************************************/
// 组装压缩用到的js和css的源码路径
function wrap(files) {
	var gruntFiles = [];
	files.forEach(function (file) {
		gruntFiles.push(root + "/" + file);
	});
	return gruntFiles;
}

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			// 合并js
			vx2js: {
				options: {
					separator: ";"
				},
				dest: jstarget.uncompress,
				src: wrap(jsFiles)
			},
			// 合并css
			vx2css: {
				dest: csstarget.uncompress,
				src: wrap(cssFiles)
			}
		},
		// 压缩js
		uglify: {
			vx2ui: {
				src: jstarget.uncompress,
				dest: jstarget.compress
			}
		},
		//压缩css
		cssmin: {
			minify: {
				options: {},
				nonull: true,
				src: csstarget.uncompress,
				dest: csstarget.compress
			}
		},
		// 清除老的开发文件时生产文件
		clean: {
			css: [jstarget.uncompress, jstarget.compress], // 清除old css
			js: [csstarget.uncompress, csstarget.compress] // 清除old js
		},
		// jshint检测
		jshint: {
			// grunt-contrib-jshint的详细参数介绍，请参考：https://github.com/gruntjs/grunt-contrib-jshint
			// 配置jshint的校验规则，参数详细参考DOC目录下面的《jshint参数详解.pdf》
			options : {
				'-W064' : true, // 忽略错误代码为 W064 的错误
				"strict" : true,
				// "curly": true,
				"eqnull" : true,
				// "eqeqeq": true,
				"undef" : true,
				"globals" : {
					"$" : true,
					"angular" : true,
					"vx" : true,
					"jQuery" : true
				},
				browser: true
				//"force" : true,// 强制执行，即使出现错误也会执行下面的任务
				// reporterOutput : 'jshint/report.txt'//将jshint校验的结果输出到文件
			},
			beforeconcat: wrap(jsFiles), // // 合并之前检测
			afterconcat: jstarget.uncompress //  合并之后检测
		}

	});
	// 加载grunt任务依赖模块
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

	// jshint校验
	grunt.registerTask('check', ['jshint']);

	// 只构建js
	grunt.registerTask('js', ['concat:vx2js', 'uglify']);
	grunt.registerTask('css', ['concat:vx2css', 'cssmin']);
};


exports.config=function(app) {
	console.log('setting');
	app.myset = {
		dburl: "mongodb://localhost:27017/wp_blog",
		contrlllers_path:"../server/controller/",
	};
};
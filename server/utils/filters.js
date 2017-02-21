
exports.filterPostCategory=function(posts){
	var result = [];
	for(var i=0;i<posts.length;i++){
		if(posts[i].taxonomy==="category"){
			result.push(posts[i]);
		}
	}
	return result;
};


exports.filterPostTags=function(posts){
	var result = [];
	for(var i=0;i<posts.length;i++){
		if(posts[i].taxonomy==="post_tag"){
			result.push(posts[i]);
		}
	}
	return result;
};
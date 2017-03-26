function hereDoc(f) {
	return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '');
}
var string = hereDoc(function () {/*
 --->无善无恶心之体,有善有恶意之动.
     知善知恶是良知,为善去恶是格物.
     This is x373241884y's front-end technology blog, github:x373241884y
 */
});
console.log(string);
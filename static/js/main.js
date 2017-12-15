NProgress.inc();
$(window).load(function () {
	NProgress.done();
	$("#target-editor-with-custom-language").markdown({language: 'fr'});
	var ap = new APlayer({
		element: document.getElementById('player1'),                       // Optional, player element
		narrow: false,                                                     // Optional, narrow style
		autoplay: false,                                                    // Optional, autoplay song(s), not supported by mobile browsers
		showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
		mutex: true,                                                       // Optional, pause other players when this player playing
		theme: '#ad7a86',                                                  // Optional, theme color, default: #b7daff
		mode: 'random',                                                    // Optional, play mode, can be `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
		preload: 'metadata',                                               // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
		listmaxheight: '513px',                                             // Optional, max height of play list
		music: [
			{                                                           // Required, music info, see: ###With playlist
				title: '冰心诀',                                          // Required, music title
				author: 'ＯＫいòvの',                          // Required, music author
				url: 'http://data.5sing.kgimg.com/G033/M05/1B/03/wYYBAFXywZCASLJiAC-dY3eSIJU542.mp3',  // Required, music url
				pic: 'http://wsing.bssdl.kugou.com/2acd3c6821a1629f6ac93e784406f367.jpg_188x188.jpg',  // Optional, music picture
			},{                                                           // Required, music info, see: ###With playlist
				title: '寒江雪',                                          // Required, music title
				author: 'ＯＫいòvの',                          // Required, music author
				url: 'http://data.5sing.kgimg.com/G031/M07/0E/13/Xw0DAFXtIOCAccizAD60P42jabI737.mp3',  // Required, music url
				pic: 'http://wsing.bssdl.kugou.com/2acd3c6821a1629f6ac93e784406f367.jpg_188x188.jpg',  // Optional, music picture
			},{
				title: '一滴泪',
				author: 'ＯＫいòvの',
				url: 'http://data.5sing.kgimg.com/G043/M02/0B/19/C5QEAFXu1LWAVNqyADymiKJhEeQ006.mp3',
				pic: 'http://wsing.bssdl.kugou.com/2acd3c6821a1629f6ac93e784406f367.jpg_188x188.jpg'
			},{
				title: '世有长歌',
				author: '千是',
				url: 'http://data.5sing.kgimg.com/G122/M03/1C/17/ug0DAFoNAj-AcCDcAKQcoRypOgE091.mp3',
				pic: 'http://wsing.bssdl.kugou.com/ee74142efd60e2405afedcebe7586f40.jpg_188x188.jpg'
			}
		]
	});

	$("pre").addClass("prettyprint linenums");//如果其他地方也要用到pre，我们可以再加一个父标签的选择器来区分
	prettyPrint();//代替body上的onload事件加载该方法
//		$(document).snowfall({image: "/images/flake.png", maxSize: 15});
});

jQuery(document.body).jstars({
	image_path: '/images', // folder with magic image
	style: 'rand',       // optional, color, default: white
	frequency: 3         // optional, from 1 to 19
});

(function () { //injectGoogleAnalytics
	(function (i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
		a = s.createElement(o),
			m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-96574719-1', 'auto');
	ga('send', 'pageview');
})();
tinyMCEPreInit = {
	baseURL: "http://localhost:8889/wordpress/wp-includes/js/tinymce",
	suffix: ".min",
	dragDropUpload: true,
	mceInit: {
		'content': {
			theme: "modern",
			skin: "lightgray",
			language: "zh",
			formats: {
				alignleft: [{
					selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
					styles: {textAlign: "left"}
				}, {selector: "img,table,dl.wp-caption", classes: "alignleft"}],
				aligncenter: [{
					selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
					styles: {textAlign: "center"}
				}, {selector: "img,table,dl.wp-caption", classes: "aligncenter"}],
				alignright: [{
					selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
					styles: {textAlign: "right"}
				}, {selector: "img,table,dl.wp-caption", classes: "alignright"}],
				strikethrough: {inline: "del"}
			},
			relative_urls: false,
			remove_script_host: false,
			convert_urls: false,
			browser_spellcheck: true,
			fix_list_elements: true,
			entities: "38,amp,60,lt,62,gt",
			entity_encoding: "raw",
			keep_styles: false,
			cache_suffix: "wp-mce-4310-20160418",
			preview_styles: "font-family font-size font-weight font-style text-decoration text-transform",
			end_container_on_empty_block: true,
			wpeditimage_disable_captions: false,
			wpeditimage_html5_captions: false,
			plugins: "charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview,wpembed",
			wp_lang_attr: "zh-CN",
			external_plugins: {"crayon_tinymce": "http:\/\/localhost:8889\/wordpress\/wp-content\/plugins\/crayon-syntax-highlighter\/util\/tag-editor\/crayon_tinymce.js"},
			content_css: "http://localhost:8889/wordpress/wp-includes/css/dashicons.min.css?ver=4.5.4,http://localhost:8889/wordpress/wp-includes/js/tinymce/skins/wordpress/wp-content.css?ver=4.5.4,http://localhost:8889/wordpress/wp-content/themes/flat/assets/css/editor-style.css",
			selector: "#content",
			resize: false,
			menubar: false,
			wpautop: true,
			indent: false,
			toolbar1: "bold,italic,strikethrough,bullist,numlist,blockquote,hr,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,dfw,wp_adv,separator,crayon_tinymce",
			toolbar2: "formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
			toolbar3: "",
			toolbar4: "",
			tabfocus_elements: "content-html,save-post",
			body_class: "content post-type-post post-status-auto-draft post-format-standard locale-zh-cn",
			wp_autoresize_on: true,
			add_unload_trigger: false,
			extended_valid_elements: ",pre[*],code[*],iframe[*]"
		}
	},
	qtInit: {
		'content': {id: "content", buttons: "strong,em,link,block,del,ins,img,ul,ol,li,code,more,close,dfw"},
		'replycontent': {id: "replycontent", buttons: "strong,em,link,block,del,ins,img,ul,ol,li,code,close"}
	},
	ref: {
		plugins: "charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview,wpembed",
		theme: "modern",
		language: "zh"
	},
	load_ext: function (url, lang) {
		var sl = tinymce.ScriptLoader;
		sl.markDone(url + '/langs/' + lang + '.js');
		sl.markDone(url + '/langs/' + lang + '_dlg.js');
	}
};
tinyMCEPreInit.load_ext("http://localhost:8889/wordpress/wp-content/plugins/crayon-syntax-highlighter/util/tag-editor", "zh");
tinymce.PluginManager.load("crayon_tinymce", "http://localhost:8889/wordpress/wp-content/plugins/crayon-syntax-highlighter/util/tag-editor/crayon_tinymce.js");


( function() {
	var init, id, $wrap;

	if ( typeof tinymce !== 'undefined' ) {
		for ( id in tinyMCEPreInit.mceInit ) {
			init = tinyMCEPreInit.mceInit[id];
			$wrap = tinymce.$( '#wp-' + id + '-wrap' );

			if ( ( $wrap.hasClass( 'tmce-active' ) || ! tinyMCEPreInit.qtInit.hasOwnProperty( id ) ) && ! init.wp_skip_init ) {
				tinymce.init( init );

				if ( ! window.wpActiveEditor ) {
					window.wpActiveEditor = id;
				}
			}
		}
	}

	if ( typeof quicktags !== 'undefined' ) {
		for ( id in tinyMCEPreInit.qtInit ) {
			quicktags( tinyMCEPreInit.qtInit[id] );

			if ( ! window.wpActiveEditor ) {
				window.wpActiveEditor = id;
			}
		}
	}
}());
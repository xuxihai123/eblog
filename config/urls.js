var fs = require("fs");
var path = require("path");
var express = require("express");

exports.config = function (app) {
    var setting = app.myset;
    var ctrls_path = setting.contrlllers_path, ctrl_path, controller, router;

    files = fs.readdirSync(ctrls_path);
    for (var i = 0; i < files.length; i++) {
        ctrl_path = path.join(ctrls_path, files[i]);
        controller = require(ctrl_path);
        router = express.Router();
        for (var key in controller) {
            var small_router = controller[key]();
            var url;
            if (typeof small_router == "function") {
                url = "/" + key;
                router.get(url, small_router);
            } else {
                url = small_router.url || key;
                if (url.substr(0) !== "/") {
                    url = "/" + url;
                }
                var method = small_router.method || "get";
                router[method](url, small_router.controller);
            }
            console.log("register router:" + url);
        }
    }
    ;
    console.log('config route finish!');
};


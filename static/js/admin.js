$(function () {
    var menuNode = $("#menu-list");

    menuNode.on("click", function (event) {
        var target, target_link, last_active, target_ul;
        target = event.target;
        target_link = $(target).parents("a.level1");
        if ($(target_link).hasClass("menu-ctrl")) {
            $(this).find(".menu-nav2").hide();
            $(document.body).toggleClass("folded");
        } else {
            if($(document.body).hasClass("folded")) {

            }else{
                if ($(target_link).hasClass("level1")) {
                    target_ul = $(target_link).next();
                    if (target_ul.is(":visible")) {
                        $(target_link).removeClass('active');
                        target_ul.slideUp();
                    } else {
                        $(menuNode).find("a.level1").removeClass('active');
                        $(menuNode).find("ul.menu-nav2").slideUp();
                        $(target_link).addClass('active');
                        target_ul.slideDown();
                    }
                } else {
                    var menu_nav2 = $(target).parent().parent();
                    if (menu_nav2.hasClass("menu-nav2")) {
                        $(menu_nav2).find("a.active").removeClass('active');
                        $(target).addClass('active');
                    }

                }
            }
        }

    });
});
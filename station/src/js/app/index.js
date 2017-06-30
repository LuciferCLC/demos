/*
    首页功能
*/

define(["jquery", "com/Carousel", "com/GoTop", "com/Exposure"], function($, Carousel, GoTop, Exposure) {
    Carousel.set($('header>.scroll'));
    new GoTop();
    Exposure.set($('.images ul.ct'));
    bind();

    function bind() {
        var $btns = $('.navbar>li');
        var $secs = $('body>section');
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 240) {
                $('nav').css({
                    'top': '0px',
                    'background': 'rgba(34, 34, 34, 1)'
                })
            } else {
                $('nav').css({
                    'top': '10px',
                    'background': 'rgba(34, 34, 34, 0)'
                })
            }

            for (var i = 0; i < $secs.length; i++) {
                if (isShow($($secs.eq(i)))) {
                    $btns.eq(i).find('a').addClass('act');
                } else {
                    $btns.eq(i).find('a').removeClass('act');
                }
            }

        });

        $btns.on('click', function() {
            var offsetTop = $secs.eq($(this).index()).offset().top;
            $('body').animate({
                scrollTop: offsetTop
            });
        });
    }


    function isShow($node) {
        var winHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var offsetTop = $node.offset().top;
        var nodeTop = offsetTop + $node.outerHeight();
        if (scrollTop + 20 > offsetTop && scrollTop < nodeTop) {
            return true;
        } else {
            return false;
        }
    }

});
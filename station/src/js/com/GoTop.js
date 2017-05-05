define(['jquery'], function($) {
    function GoTop() {
        this.create();
        this.bind();
        this.isShow();
    }

    GoTop.prototype = {
        bind: function() {
            $('.go-top').on('click', function() {
                $('body').animate({
                    scrollTop: 0
                }, 'swing');
                $(this).hide();
            });
        },

        create: function() {
            var $tpl = $('<div class="go-top">Top</div>');
            $('body').append($tpl);
        },

        isShow: function() {
            if ($(window).scrollTop() < 230) $('.go-top').hide();
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 230) {
                    $('.go-top').show();
                } else {
                    $('.go-top').hide();
                }
            });

        }
    }

    return GoTop;
});
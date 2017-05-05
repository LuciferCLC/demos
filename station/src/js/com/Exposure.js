define(['jquery'], function($) {
      function waterFull() {
        this.page = 1;
        this.pageCount = 6;
        this.sumHeight = [];
        this.nodeWidth = $('.item').outerWidth(true);
        this.colNum = parseInt($('.ct').width() / this.nodeWidth);
        for(var i = 0; i < this.colNum; i++) {
          this.sumHeight[i] = 0;
        }
        this.flag = true;

        this.start();
        this.bind();
      }
    
    waterFull.prototype = {
      start:function() {
        this.getNews();
        this.flag = false;
      },

      bind: function() {
        var _this = this;
        $('.tag').click(function() {
          // if(!_this.flag) return;
          _this.start();
        });       
      },

      callback: function(list) {
        var _this = this;
        this.flag = true;
        $.each(list, function(i, news) {
          var $node = _this.getNode(news);
          $node.find('img')[0].onload = function() {
            $('.ct').append($node);
            _this.waterFall($node);
          }
        });
      },

      getNews: function() {
        var _this = this;
        $.ajax({
          url: 'https://platform.sina.com.cn/slide/album_tech',
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          data: {
            app_key: '1271687855',
            num: _this.pageCount,
            page: _this.page
          }
        }).done(function(ret) {
          if(ret && ret.status && ret.status.code === '0') {
            _this.callback(ret.data);
            _this.page++;
          } else {
            console.log('error data!');
          }
        });
      },

      getNode: function(item) {
        var node = '<li class="item"><a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a><h4 class="header">'+ item.short_name +'</h4><p class="desp">'+item.short_intro+'</p></li>';
        return $(node);
      },

      waterFall: function($node) {
        var idx = 0;
        var minHeight = this.sumHeight[0];
        for(var i = 0; i < this.sumHeight.length; i++) {
          if(this.sumHeight[i] < minHeight) {
            idx = i;
            minHeight = this.sumHeight[i];
          }
        }

        $node.css({
          left: this.nodeWidth * idx,
          top: minHeight,
          opacity: 1
        });
        this.sumHeight[idx] = $node.outerHeight(true) + this.sumHeight[idx];
        $('.ct').height(Math.max.apply(null, this.sumHeight));
      }
    }

    return {
        set: function($nodes) {
            $nodes.each(function(i, node) {
              new waterFull($(node));
            })
        }
    }
});
    
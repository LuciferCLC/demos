define(['jquery'], function($) {
  function Carousel ($ct) {
    var _this = this;
    this.$ct = $ct;
    this.init();
    this.bind();
    this.timer = setInterval(function(){
      _this.toNext();
    }, 5000);
  }

  Carousel.prototype = {
    init: function() {
      var _this = this;
      var $imgCt = this.$imgCt = this.$ct.find('.img-ct');
      var $firstImg = $imgCt.find('li').first(),
          $lastImg = $imgCt.find('li').last();


      this.$preBtn = this.$ct.find('.btn-pre');
      this.$nextBtn = this.$ct.find('.btn-next');
      this.$bullet = this.$ct.find('.bullet');
      this.index = 0;
      this.count = $imgCt.children().length;
      this.imgWidth = $firstImg.width();
      this.flag = false;

      $imgCt.prepend($lastImg.clone());
      $imgCt.append($firstImg.clone());
      $imgCt.width(_this.imgWidth * $imgCt.children().length);
      $imgCt.css({
        'left': -_this.imgWidth
      });
    },

    bind: function() {
      var _this = this;

      this.$preBtn.on('click', function() {
        clearInterval(_this.timer);
        _this.toPre(1);
        _this.timer = setInterval(function(){
          _this.toNext(1);
        }, 5000);
      });
      this.$nextBtn.on('click', function() {
        clearInterval(_this.timer);
        _this.toNext(1);
        _this.timer = setInterval(function(){
          _this.toNext(1);
        }, 5000);
      });
      this.$bullet.find('li').on('click', function() {
        clearInterval(_this.timer);
        var i = $(this).index();
        if (i > _this.index) {
          _this.toNext(i - _this.index);
        } else if (i < _this.index) {
          _this.toPre(_this.index - i);
        }
        _this.timer = setInterval(function(){
          _this.toNext(1);
        }, 5000);
      });
    },

    toPre: function(num) {
      var _this = this;
      var num = num || 1;

      if (this.flag) return;
      this.flag = true;
      this.$imgCt.animate({
        'left': '+=' + num * _this.imgWidth
      }, function() {
        _this.index -= num;
        if (_this.index < 0) {
          _this.index = _this.count - 1;
          _this.$imgCt.css({
            'left': -(_this.imgWidth * _this.count)
          });
        }
        _this.setBullet();
        _this.flag = false;  
      });
    },

    toNext: function(num) {
      var _this = this;
      var num = num || 1;

      if (this.flag) return;
      this.flag = true;
      this.$imgCt.animate({
        'left': '-=' + num * _this.imgWidth
      }, function() {
        _this.index += num;
        if (_this.index == _this.count) {
          _this.index = 0;
          _this.$imgCt.css({
            'left': -_this.imgWidth
          });
        }
        _this.setBullet();
        _this.flag = false;
      }); 
    },

    setBullet: function() {
      var _this = this;

      this.$bullet.children().removeClass('active').eq(_this.index).addClass('active');
    }
  }

  return {
    set: function($ct) {
      $ct.each(function(index, node) {
        new Carousel($(node));
      })
    }
  }
});
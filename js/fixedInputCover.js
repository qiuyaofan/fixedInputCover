
 //兼容表单输入时，出现键盘遮挡的问题
 /**
 <div class="g-fixedForm--main">
    <input>
    <input>
    <input>
    <textarea>
 </div>
 **/
(function() {
    var $body=$('body');
    //预留，方便扩展
    var defaults={
    };
    function FixedForm(){ 
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if(!$('.g-fixedForm--main').length){
            return false;
        }

        this.wh=window.innerHeight;
        this.setHeight($('.g-fixedForm--main'));
        this.setHeight($('.g-fixedForm--height'));
        this.event();
    }
    //设置百分比的高度，避免键盘使高度减小引起的百分比高度的变小造成的高度差异，视自己情况加g-fixedForm--height类
    FixedForm.prototype.setHeight = function(el){
        var $height=el;
        //设定高度值
        $height.each(function(index,el){
            $(el).height($(el).height());
        })
    };

    FixedForm.prototype.event = function(){
        var _this=this;
        //聚焦
        $('.g-fixedForm--main').on('focus','input,textarea',function(){
            _this.input=this;
            _this.main=$(this).parents('.g-fixedForm--main');
            _this.mainH=_this.main.height();
        })
         //输入法关闭表单恢复
        $(window).on('resize', function (event) {
            var  wh2 = window.innerHeight;
            if(wh2 >= _this.wh){
                //恢复
                _this.main.css({
                    transform:'translateY(0px)',
                    '-webkit-transform':'translateY(0px)'
                });
            }else{
                //修复
                _this.keyboardHeight?false:_this.keyboardHeight=_this.wh-wh2;
                showKeyboard.call(_this);
            }
        });
    };
    //显示键盘
    function showKeyboard(){
        var $input=$(this.input);
        var p=this.input.getBoundingClientRect();
        var distance=p.bottom-(this.mainH-this.keyboardHeight);
        // //所聚焦的表单位置在键盘下面则修复
        if(distance>0){
            //main本身样式不能含transform，不然会覆盖
            distance+=50;
            this.main.css({
                transform:'translateY(-'+distance+'px)',
                '-webkit-transform':'translateY(-'+distance+'px)'
            });
        }
    }

    $.extend({
        fixedForm: function(config) {
          return new FixedForm($.extend({}, defaults, config));
        }
    });
}());

$.fixedForm();
;(function($) {
    // multiple plugins can go here
    (function(pluginName) {
        var defaults = {
            height : 240,
            width  : "auto",
            testFor : function(div) {
                return true;
            }
        };
        $.fn[pluginName] = function(options) {
            options = $.extend(true, {}, defaults, options);

            /**
            * image loaded function from TangBin
            * @version 2011.05.27
            * @author  TangBin
            * @see     http://www.planeart.cn/?p=1121
            * @param   {String}    image path
            * @param   {Function}  size ready
            * @param   {Function}  loaded (optional)
            * @param   {Function}  error (optional)
            * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
                    alert('size ready: width=' + this.width + '; height=' + this.height);
                });
            */
            var _imgReady = (function () {
                var list = [], intervalId = null,

                // 用来执行队列
                tick = function () {
                    var i = 0;
                    for (; i < list.length; i++) {
                        list[i].end ? list.splice(i--, 1) : list[i]();
                    };
                    !list.length && stop();
                },

                // 停止所有定时器队列
                stop = function () {
                    clearInterval(intervalId);
                    intervalId = null;
                };

                return function (url, ready, load, error) {
                    var onready, width, height, newWidth, newHeight,
                        img = new Image();

                    img.src = url;

                    // If cached, return data directly
                    if (img.complete) {
                        ready.call(img);
                        load && load.call(img);
                        return;
                    };

                    width = img.width;
                    height = img.height;

                    // loaded error
                    img.onerror = function () {
                        error && error.call(img);
                        onready.end = true;
                        img = img.onload = img.onerror = null;
                    };

                    // image size ready
                    onready = function () {
                        newWidth = img.width;
                        newHeight = img.height;
                        if (newWidth !== width || newHeight !== height ||
                            // if image loaded at other place with available size
                            newWidth * newHeight > 1024
                        ) {
                            ready.call(img);
                            onready.end = true;
                        };
                    };
                    onready();

                    // loaded completely
                    img.onload = function () {
                        // onload在定时器时间差范围内可能比onready快
                        // 这里进行检查并保证onready优先执行
                        !onready.end && onready();

                        load && load.call(img);

                        // IE gif动画会循环执行onload，置空onload即可
                        img = img.onload = img.onerror = null;
                    };

                    // 加入队列中定期执行
                    if (!onready.end) {
                        list.push(onready);
                        // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                        if (intervalId === null) intervalId = setInterval(tick, 40);
                    };
                };
            })();

            var _resize = function() {
                var $this           = $(this),
                _src           = $this.attr("src"),
                _width         = 0,
                _height        = 0,
                width          = 0,
                height         = 0;

                _imgReady(_src, function(){
                    var WH = _calculateWH(this.width, this.height);
                    $this.attr({
                        width:WH.width,
                        height:WH.height
                    });
                    _setPosition.call($this, $elem);
                });

            };

            var _calculateWH = function(_width, _height) {
                if(options.height != "auto") {
                    if(options.width != "auto") {
                        _width = options.width;
                    } else {
                        _width = options.height/_height * _width;
                    }
                    _height = options.height;
                } else {
                    if(options.width != "auto") {
                        _height = options.width/_width * _height;
                        _width  = options.width;
                    }
                }
                return {width:_width, height:_height};
            }

            var _setPosition = function(container) {
                var $this = this;
                var _containerPaddingLeftCss = container.css("padding-left"),
                _containerPaddingTopCss = container.css("padding-top"),
                _containerPaddingLeft = parseInt(_containerPaddingLeftCss ? _containerPaddingLeftCss.substring(0, _containerPaddingLeftCss.length-2) : 0);
                _containerPaddingTop = parseInt(_containerPaddingTopCss ? _containerPaddingTopCss.substr(0, _containerPaddingTopCss.length-2) : 0);

                if(container.children().length > 0) {
                    var _lastChild        = container.children().last(),
                    _lastChildX           = _lastChild.position().left,
                    _lastChildY           = _lastChild.position().top,
                    _newChildX            = 0,
                    _newChildY            = 0;
                    if(_lastChildX + _lastChild.outerWidth(true) < container.width() + _containerPaddingLeft) {
                        _newChildX = _lastChildX + _lastChild.outerWidth(true);
                        _newChildY = _lastChildY;
                    } else {
                        _newChildX = _containerPaddingLeft;
                        _newChildY = _lastChildY + _lastChild.outerHeight(true);
                    }
                } else {
                    _newChildX = _containerPaddingLeft;
                    _newChildY = _containerPaddingTop;
                }
                $this.css({
                    position : "absolute",
                    top : _newChildY + "px",
                    left : _newChildX + "px"
                })
                container.append($this);
            };

            var $elem = this;
            var imgs = this.find("img");
            $elem.empty();
            imgs.each(function() {
                _resize.call(this);
            });

        };

        $.fn[pluginName].defaults = defaults;
    })('imagewall');
})(jQuery);

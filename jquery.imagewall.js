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

            var _resize = function() {
                $this           = $(this),
                _src           = $this.attr("src"),
                _width         = 0,
                _height        = 0,
                width          = 0,
                height         = 0,
                _imgObject     = new Image();
                _imgObject.src = _src;

                if(_imgObject.complete) {
                    _width  = _imgObject.width;
                    _height = _imgObject.height;
                    var WH = _calculateWH(_width, _height);
                    $this.attr({
                        width:WH.width,
                        height:WH.height
                    });
                    _setPosition.call($this, $elem);
                } else {
                    _imgObject.onload = function() {
                        _width  = _imgObject.width;
                        _height = _imgObject.height;
                        var WH = _calculateWH(_width, _height);
                        $this.attr({
                            width:WH.width,
                            height:WH.height
                        });
                        _setPosition.call($this, $elem);
                    }
                }
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
                _containerPaddingLeft = _containerPaddingLeftCss ? _containerPaddingLeftCss.substring(0, _containerPaddingLeftCss.length-2) : 0;
                _containerPaddingTop = _containerPaddingTopCss ? _containerPaddingTopCss.substr(0, _containerPaddingTopCss.length-2) : 0;

                if(container.children().length) {
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

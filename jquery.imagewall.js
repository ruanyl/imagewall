;(function($) {
    // multiple plugins can go here
    (function(pluginName) {
        var defaults = {
            color: 'black',
            testFor: function(div) {
                return true;
            }
        };
        $.fn[pluginName] = function(options) {
            options = $.extend(true, {}, defaults, options);

            return this.each(function() {
                var elem = this,
                    $elem = $(elem);

                // heres the guts of the plugin
                if (options.testFor(elem)) {
                    $elem.css({
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: options.color
                    });
                }
            });
        };
        $.fn[pluginName].defaults = defaults;
    })('borderize');
})(jQuery);

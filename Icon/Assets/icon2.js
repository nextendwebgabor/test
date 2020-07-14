N2D('ItemIcon2', ['Item'], function ($, undefined) {
    "use strict";

    /**
     * @memberOf N2Classes
     *
     * @constructor
     * @augments N2Classes.Item
     */
    function ItemIcon2() {
        this.type = 'icon2';
        N2Classes.Item.prototype.constructor.apply(this, arguments);
    }

    ItemIcon2.prototype = Object.create(N2Classes.Item.prototype);
    ItemIcon2.prototype.constructor = ItemIcon2;

    ItemIcon2.prototype.getLabel = function () {

        return n2_('Icon');
    };

    ItemIcon2.prototype.added = function () {
        this.addedStyle('box', 'style');
    };

    ItemIcon2.prototype.parseAll = function (data) {

        data.uid = $.fn.uid();

        var iconData = N2Classes.Icons.render(data.icon);
        if (iconData) {
            data.ligature = iconData.ligature;
            data.iconclass = iconData.class;
        } else {
            data.ligature = n2_('Icon not found');
            data.iconclass = '';
        }

        N2Classes.Item.prototype.parseAll.apply(this, arguments);
    };

    ItemIcon2.prototype._render = function (data) {
        var $node = $('<span class="n2i ' + data.styleclass + ' ' + data.uid + ' ' + data.iconclass + '">' + data.ligature + '</span>')
            .css('fontSize', (data.size / 16 * 100) + '%');

        var style = window.nextend.pre + ' .' + data.uid + '{color:' + N2Color.hex2rgbaCSS(data.color) + ';}';
        if (N2Color.hex2alpha(data.colorhover) > 0) {
            style += window.nextend.pre + ' .' + data.uid + ':HOVER{color:' + N2Color.hex2rgbaCSS(data.colorhover) + ';}';
        }

        $node.append('<style>' + style + '</style>');

        this.$item.append($node);
    };

    return ItemIcon2;
});
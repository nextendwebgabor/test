N2D('ItemVideo', ['Item'], function ($, undefined) {
    "use strict";

    /**
     * @memberOf N2Classes
     *
     * @constructor
     * @augments N2Classes.Item
     */
    function ItemVideo() {
        this.type = 'video';
        N2Classes.Item.prototype.constructor.apply(this, arguments);
    }

    ItemVideo.prototype = Object.create(N2Classes.Item.prototype);
    ItemVideo.prototype.constructor = ItemVideo;

    ItemVideo.needWidth = true;

    ItemVideo.prototype.getLabel = function () {

        return n2_('Video');
    };

    ItemVideo.prototype.hasTextScale = function () {

        return false;
    };

    ItemVideo.prototype.added = function () {
        this.needFill = ['video_mp4'];

        this.generator.registerField('#item_videovideo_mp4');
    };

    ItemVideo.prototype.fitLayer = function () {
        return true;
    };

    function getVideoDimensionsOf(url) {
        var deferred = $.Deferred(),
            video = document.createElement('video');

        video.addEventListener("loadedmetadata", function () {
            var height = this.videoHeight;
            var width = this.videoWidth;

            deferred.resolve({
                height: height,
                width: width
            });
        }, false);

        video.src = url;

        return deferred;
    }

    ItemVideo.prototype.parseAll = function (data) {

        var videoChanged = this.values.video_mp4 !== data.video_mp4;

        if (videoChanged) {
            getVideoDimensionsOf(nextend.imageHelper.fixed(data.video_mp4))
                .done((function (size) {
                    var $select = $('#item_videoaspect-ratio_select'),
                        ratio = size.width / size.height;
                    if (ratio === 16 / 9) {
                        setTimeout(function () {
                            $select.val('16:9').trigger('change');
                        }, 100);
                    } else if (ratio === 16 / 10) {
                        setTimeout(function () {
                            $select.val('16:10').trigger('change');
                        }, 100);
                    } else if (ratio === 4 / 3) {
                        setTimeout(function () {
                            $select.val('4:3').trigger('change');
                        }, 100);
                    } else {
                        setTimeout(function () {
                            $select.val('custom').trigger('change');
                            $('#item_videoaspect-ratio-width').val(size.width).trigger('change');
                            $('#item_videoaspect-ratio-height').val(size.height).trigger('change');
                        }, 100);
                    }
                }).bind(this));
        }
    }

    ItemVideo.prototype._render = function (data) {
        var style = "";
        if (data['aspect-ratio'] === 'custom') {
            style = 'padding-top:' + (data['aspect-ratio-height'] / data['aspect-ratio-width'] * 100) + '%';
        }

        var $node = $('<div class="n2_ss_video_player n2-ss-item-content n2-ss-item-video-container n2-ow-all"><div class="n2_ss_video_player__placeholder" style="' + style + '"></div></div>')
            .attr('data-aspect-ratio', data['aspect-ratio'])
            .css({
                background: 'url(' + nextend.imageHelper.fixed('$ss3-frontend$/images/placeholder/video.png') + ') no-repeat 50% 50%',
                backgroundSize: 'cover'
            });

        this.$item.append($node);
    };

    return ItemVideo;
});
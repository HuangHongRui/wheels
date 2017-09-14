/*
* dependence: jquery
* Exposure.init($targets, callback);
* author：yunyu950908
* */
const Exposure = (function () {
    function Exposure($target, callback) {
        this.$target = $target;
        this.callback = callback;
        this.bind();
    }

    Exposure.prototype = {
        // bind scroll event
        bind: function () {
            $(window).on("scroll", () => {
                if (this.$target.hasClass("load")) {
                    return;
                } else {
                    this.check();
                }
            })

        },

        // check load status
        check: function () {
            if (this.isShow()) {
                // console.log(this.isShow())
                this.callback(this.$target);
                this.$target.addClass("load")
            }
        },

        // target show status *
        isShow: function () {
            let windowHeight = $(window).height(),
                scrollHeight = $(window).scrollTop(),
                offsetTop = this.$target.offset().top,
                targetHeight = this.$target.height();
            // check top and bottom border
            if (windowHeight + scrollHeight > offsetTop && offsetTop + targetHeight > scrollHeight) {
                return true;
            } else {
                return false;
            }
        },
    }

    // return api
    return {
        init: function ($targets, callback) {
            $targets.each((idx, target) => {
                new Exposure($(target), callback)
            })
        }
    }
})();

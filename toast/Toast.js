/*
* dependence: jquery
* Toast.init(msg,time);
* author：yunyu950908
* */

const Toast = (function () {
    function Toast(msg, time) {
        this.msg = msg;
        this.dismissTime = time || 1000;
        this.createToast();
        this.showToast();
    }

    Toast.prototype = {
        createToast: function () {
            const tpl = '<div class="toast">' + this.msg + '</div>';
            this.$toast = $(tpl);
            $('body').append(this.$toast);
        },

        showToast: function () {
            this.$toast.fadeIn(300, () => {
                setTimeout(() => {
                    this.$toast.fadeOut(300, () => {
                        this.$toast.remove();
                    });
                }, this.dismissTime);
            });

        }
    };

    return {
        init: function (msg, time) {
            return new Toast(msg, time)
        }
    }
})();
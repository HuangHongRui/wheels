/*
* dependence: jquery
* Carousel.init(container, main, pre, next, footer);
* arguments ==> DOM selector (not jQ selector)
* author：yunyu950908
* */

const Carousel = (function () {

    function Carousel(e, main, pre, next, footer) {
        this.$ct = $(e);
        this.$main = this.$ct.children(main);
        this.$pre = this.$ct.children(pre);
        this.$next = this.$ct.children(next);
        this.$footer = this.$ct.children(footer);
        this.init();
    }


    Carousel.prototype = {
        init: function () {
            this.$allImg = this.$main.children("li");
            this.$bullets = this.$footer.children("li");
            this.imgLen = this.$allImg.length;
            this.imgIndex = 0;
            this.isAnimate = false;
            //绑定执行
            this.bind();
        },

        bind: function () {
            this.clone();
            this.$pre.on("click", () => {
                this.playPre(1)
            })
            this.$next.on("click", () => {
                this.playNext(1)
            })
            this.playBullet()
        },

        clone: function () {
            let firstImg = this.$allImg[0],
                lastImg = this.$allImg[this.$allImg.length - 1];
            let cFirstImg = firstImg.cloneNode(true),
                cLastImg = lastImg.cloneNode(true);
            this.$main.append(cFirstImg);
            this.$main.prepend(cLastImg);
        },

        playPre: function (num) {
            if (this.isAnimate == true) return;
            this.isAnimate = true;
            this.$main.animate({
                left: "+=" + this.$main.width() * num
            }, () => {
                this.imgIndex -= num;
                if (this.imgIndex == -1) {
                    this.$main[0].style.left = -this.imgLen * this.$main.width() + "px";
                    this.imgIndex = this.imgLen - 1;
                }
                this.setBullet();
                this.isAnimate = false;
            })
        },

        playNext: function (num) {
            if (this.isAnimate == true) return;
            this.isAnimate = true;
            this.$main.animate({
                left: "-=" + this.$main.width() * num
            }, () => {
                this.imgIndex += num;
                if (this.imgIndex == 4) {
                    this.$main[0].style.left = -this.$main.width() + "px";
                    this.imgIndex = 0;
                }
                this.setBullet();
                this.isAnimate = false;
            })
        },

        setBullet: function () {
            this.$bullets.each(function (i, bullet) {
                bullet.classList.remove("active");
            })
            this.$bullets[this.imgIndex].classList.add("active");
        },

        playBullet: function () {
            this.$bullets.each((i, j) => {
                j.addEventListener("click", () => {
                    if (i > this.imgIndex) {
                        this.playNext(i - this.imgIndex);
                    } else {
                        this.playPre(this.imgIndex - i);
                    }
                    this.setBullet();
                })
            })
        }
    }

    return {
        init: function (container, main, pre, next, footer) {
            $(container).each((i, e) => {
                new Carousel(e, main, pre, next, footer)
            })
        }
    }
})()
class Carousel {
    constructor(options = {}, src = []) {
        if (!options.el) return;
        this.src = src; // 图片资源
        this.$el = options.el; // 传入的外层容器
        this.$wrap = this.$el.firstElementChild; // 内层容器
        this.intervalID = undefined; // 自动轮播的计时器 ID
        this.outID = undefined; // 临时定时器 ID
        this.duration = (options.duration || "0.5") + "s";
        this.$wrap.style.transitionDuration = this.duration;// 传入的动画时间
        this.moveIndex = 0; // 移动系数
        this.index = 0; // 初始化图片索引
        this.$bullets = options.bullets;
        this.$prev = options.prev;
        this.$next = options.next
        this.bullets = Array.from(this.$bullets.children);
        this.status = false; // 状态锁
        this.render(); // 资源渲染成 HTML
        // this.setSize();
        this.originLen = this.$wrap.children.length; // 初始轮播图数量
        this.elWidth = this.$el.offsetWidth; // 外层容器宽度
        this.init();
    }

    render() {
        const html = this.src.map(e => `
            <li><a href="${e.hrefUrl}"><img src="${e.imgUrl}" alt=""></a></li>
        `).join("")
        this.$wrap.insertAdjacentHTML("afterbegin", html)
    }

    setSize() {
        const $img = this.$wrap.querySelectorAll("img")[0]
        const elW = $img.offsetWidth;
        const elH = $img.offsetHeight;
        this.$el.style.width = elW + "px";
        this.$el.style.height = elH + "px";
        this.$wrap.style.width = this.originLen * elW + "px";
        this.$wrap.style.height = this.originLen * elH + "px";
    }

    init() {
        this.clone();
        this.autoPlay(true);
        this.checkLast();
        this.playBullet();

        this.$prev.addEventListener("click", () => this.playPrev(1));
        this.$next.addEventListener("click", () => this.playNext(1));

        // window.onfocus = () => this.autoPlay(true); // 得到焦点才轮播
        // window.onblur = () => this.autoPlay(false);

        const btns = [this.$prev, this.$next, this.$bullets]
        btns.forEach(e => {
            e.addEventListener("mouseover", () => this.autoPlay(false));
            e.addEventListener("mouseout", () => this.autoPlay(true));
        })

    }

    clone() {
        const firstClone = this.$wrap.firstElementChild.cloneNode(true);
        const lastClone = this.$wrap.lastElementChild.cloneNode(true);
        this.$wrap.insertBefore(lastClone, this.$wrap.firstElementChild);
        this.$wrap.appendChild(firstClone);
    }

    // 自动轮播
    autoPlay(boolean) {
        if (boolean) {
            this.intervalID = setInterval(() => {
                this.playNext(1);
            }, 4000)
        } else {
            clearInterval(this.intervalID)
        }
    }

    // 检查轮播边界
    checkLast() {
        const check = () => {
            const resetDuration = (moveLen) => {
                this.$wrap.style.transitionDuration = "0s";
                this.$wrap.style.transform = `translate(-${moveLen}px)`;
                this.outID = setTimeout(() => {
                    this.$wrap.style.transitionDuration = this.duration;
                    clearTimeout(this.outID)
                    this.status = false;
                }, 300)
            }
            if (this.moveIndex === this.originLen) {
                resetDuration(0)
                this.moveIndex = 0;
            } else if (this.moveIndex === -1) {
                resetDuration(this.elWidth * (this.originLen - 1))
                this.moveIndex = this.originLen - 1;
            } else {
                this.status = false;
            }
        }
        this.$wrap.addEventListener("transitionend", check)
        this.$wrap.addEventListener("webkitTransitionEnd", check)
    }

    // 播放下 N 张
    playNext(num) {
        if (this.status === true) return;
        this.status = true;
        this.moveIndex += num;
        this.$wrap.style.transform = `translate(-${this.elWidth * this.moveIndex}px)`;
        this.setBullet();
    }

    // 播放上 N 张
    playPrev(num) {
        if (this.status === true) return;
        this.status = true;
        this.moveIndex -= num;
        this.$wrap.style.transform = `translate(${this.elWidth * -this.moveIndex}px)`;
        this.setBullet();
    }

    // 改变定位点 class
    setBullet() {
        this.index = (this.originLen + this.moveIndex) % this.originLen; // 当前图片的索引
        this.bullets.forEach(e => {
            e.classList.remove("active");
            this.$bullets.children[this.index].classList.add("active");
        })
    }

    // 快速定位
    playBullet() {
        this.bullets.forEach((e, i) => {
            e.addEventListener("click", () => {
                if (i > this.index) {
                    this.playNext(i - this.index)
                } else if (i < this.index) {
                    this.playPrev(this.index - i)
                }
            })
        })
    }
}

// 使用方法：
// const el = document.querySelector(".container")
// const bullets = el.querySelector(".bullets")
// const prev = el.querySelector(".prev")
// const next = el.querySelector(".next")
//
// const options = {
//     el: el,
//     bullets: bullets,
//     prev: prev,
//     next: next,
//     // duration: "2"
// }
//
// fetch("/src.json")
//     .then(res => res.json())
//     .then(json => new Carousel(options, json));



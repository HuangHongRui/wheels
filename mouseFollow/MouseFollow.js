const MouseFollow = (function () {
    function MouseFollow($box, $img, $mark, $detail) {
        this.$box = $box;
        this.$img = $img;
        this.$mark = $mark;
        this.$detail = $detail;
    }

    MouseFollow.prototype = {
        computedMarkPos: e => {
            e = e || window.event;
            var curL = e.clientX - this.box.offsetLeft - this.mark.offsetWidth / 2;
            var curT = e.clientY - this.box.offsetTop - this.mark.offsetHeight / 2;

            //->到达边界判断
            var minL = 0, minT = 0, maxL = this.box.offsetWidth - this.mark.offsetWidth,
                maxT = this.box.offsetHeight - this.mark.offsetHeight;
            curL = curL <= minL ? minL : (curL >= maxL ? maxL : curL);
            curT = curT <= minT ? minT : (curT >= maxT ? maxT : curT);

            Utils.css(mark, {
                left: curL,
                top: curT
            });
        }
    }
})()

//->计算MARK的位置信息
function computedMarkPos(e) {
    e = e || window.event;
    var curL = e.clientX - this.box.offsetLeft - this.mark.offsetWidth / 2;
    var curT = e.clientY - this.box.offsetTop - this.mark.offsetHeight / 2;

    //->到达边界判断
    var minL = 0, minT = 0, maxL = this.box.offsetWidth - this.mark.offsetWidth,
        maxT = this.box.offsetHeight - this.mark.offsetHeight;
    curL = curL <= minL ? minL : (curL >= maxL ? maxL : curL);
    curT = curT <= minT ? minT : (curT >= maxT ? maxT : curT);

    Utils.css(this.mark, {
        left: curL,
        top: curT
    });

    //->控制右侧的大图展示:左侧BOX和MARK的比例是横向/纵向(3:1),这样的话,左侧的MARK移动10,右侧的IMG就要移动-30
    Utils.css(this.img, {
        marginTop: -curT * 3,
        marginLeft: -curL * 3
    });
}

//->实现具体的行为操作
this.box.onmouseenter = function (e) {
    Utils.css(mark, "display", "block");
    Utils.css(this.detail, "display", "block");
    computedMarkPos(e);
};
this.box.onmousemove = computedMarkPos;
this.box.onmouseleave = function (e) {
    Utils.css(mark, "display", "none");
    Utils.css(this.detail, "display", "none");
};
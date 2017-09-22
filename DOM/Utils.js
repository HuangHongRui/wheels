/**
 * Created by yunyu on 2017/9/5.
 * 需要配合 babel 食用
 */
// IE 9+ DOM 相关操作 ( 部分兼容 IE 8 )

const Utils = (function () {
    // 选择元素
    const $ = selector => {
        return document.querySelector(selector)
    }
    const $$ = selector => {
        return document.querySelectorAll(selector)
    }
    // 类数组转化数组
    const toArray = likeArr => {
        return Array.prototype.slice.call(likeArr)
    }
    // 获取目标元素的子元素
    const getChildren = (parEle, tagName) => {
        let arr = [];
        let nodeList = parEle.childNodes;
        nodeList = toArray(nodeList);
        nodeList.map(childEle => {
            if (childEle.nodeType === 1 && childEle.nodeName.toLowerCase() === tagName.toLowerCase()) {
                arr.push(childEle)
            }
        })
        return arr;
    }
    // JSON clone
    const JSONclone = obj => {
        return JSON.parse(JSON.stringify(obj))
    }
    //->offset:获取页面中任意元素距离BODY的偏移
    const getOffset = curEle => {
        let disLeft = curEle.offsetLeft;
        let disTop = curEle.offsetTop;
        let par = curEle.offsetParent;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8") === -1) {
                disLeft += par.clientLeft;
                disTop += par.clientTop;
            }
            disLeft += par.offsetLeft;
            disTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: disLeft, top: disTop};
    }
    //->getPrevEle:获取上一个哥哥元素节点
    const getPrevEle = curEle => {
        // IE9+ 有 getComputedStyle
        if ("getComputedStyle" in window) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    //->getNextEle:获取下一个弟弟元素节点
    const getNextEle = curEle => {
        if ("getComputedStyle" in window) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    }

    //->getPrevAll:获取所有的哥哥元素节点
    const getPrevAll = curEle => {
        var arr = [];
        var pre = getPrevEle(curEle);
        while (pre) {
            arr.unshift(pre);
            pre = getPrevEle(pre);
        }
        return arr;
    }

    //->getNextAll:获取所有的弟弟元素节点
    const getNextAll = curEle => {
        var arr = [];
        var nex = getNextEle(curEle);
        while (nex) {
            arr.push(nex);
            nex = getNextEle(nex);
        }
        return arr;
    }

    //->getSibling:获取相邻的两个元素节点
    const getSibling = curEle => {
        var pre = getPrevEle(curEle);
        var nex = getNextEle(curEle);
        var arr = [];
        pre ? arr.push(pre) : null;
        nex ? arr.push(nex) : null;
        return arr;
    }
    //->getSiblingsAll:获取所有的兄弟元素节点
    const getSiblingsAll = curEle => {
        return getPrevAll(curEle).concat(getNextAll(curEle));
    }

    //->getIndex:获取当前元素的索引
    const getIndex = curEle => {
        return getPrevAll(curEle).length;
    }

    //->getFirstChild:获取第一个元素子节点
    const getFirstChild = curEle => {
        var chs = getChildren(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

    //->getLastChild:获取最后一个元素子节点
    const getLastChild = curEle => {
        var chs = getChildren(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    //->appendEle:向指定容器的末尾追加元素
    const appendEle = (newEle, container) => {
        container.appendChild(newEle);
    }

    //->prepend:向指定容器的开头追加元素
    const prependEle = (newEle, container) => {
        var fir = getFirstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    //->insertBefore:把新元素(newEle)追加到指定元素(oldEle)的前面
    const insertBefore = (newEle, oldEle) => {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    //->insertAfter:把新元素(newEle)追加到指定元素(oldEle)的后面
    const insertAfter = (newEle, oldEle) => {
        var nex = getNextEle(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle);
    }

    //->hasClass:验证当前元素中是否包含className这个样式类名
    const hasClass = (curEle, className) => {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //->addClass:给元素增加样式类名
    const addClass = (curEle, className) => {
        var arr = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = arr.length; i < len; i++) {
            var curName = arr[i];
            if (!hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    //->removeClass:给元素移除样式类名
    const removeClass = (curEle, className) => {
        var arr = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = arr.length; i < len; i++) {
            var curName = arr[i];
            if (hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    //->getCss:获取元素的样式值
    const getCss = (curEle, attr) => {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->setCss:给当前元素的某一个样式属性设置值(增加在行内样式上的)
    const setCss = (curEle, attr, value) => {
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        curEle["style"][attr] = value;
    }

    //->setGroupCss:给当前元素批量的设置样式属性值
    function setGroupCss(curEle, options) {
        options = options || 0;
        if (options.toString() !== "[object Object]") {
            return;
        }
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss(curEle, key, options[key]);
            }
        }
    }

    //->css:此方法实现了获取、设置元素的样式值
    function css(curEle) {
        var argTwo = arguments[1];
        if (typeof argTwo === "string") {
            var argThree = arguments[2];
            if (!argThree) {
                return getCss.apply(curEle, arguments);
            }
            setCss.apply(curEle, arguments);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(this, arguments);
        }
    }


    return {
        $: $,
        $$: $,
        toArray: toArray,
        getChildren: getChildren,
        JSONclone: JSONclone,
        getOffset: getOffset,
        getPrevEle: getPrevEle,
        getNextEle: getNextEle,
        getPrevAll: getPrevAll,
        getNextAll: getNextAll,
        getSibling: getSibling,
        getSiblingsAll: getSiblingsAll,
        getIndex: getIndex,
        getFirstChild: getFirstChild,
        getLastChild: getLastChild,
        appendEle: appendEle,
        prependEle: prependEle,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getCss: getCss,
        setCss: setCss,
        css: css
    }
})()
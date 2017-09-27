//tab
function Tab(tabContainer, tabs, contents, underline) {
    this.tabContainer = tabContainer
    this.tabs = tabs
    this.contents = contents
    this.underline = underline || ''
    this.init()
}

Tab.prototype.getStyle = function (dom, attr) {
    return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr]
}
Tab.prototype.bind = function () {
    let _this = this
    _this.tabContainer.addEventListener('click', function (event) {
        let tabIndex
        if (event.target.tagName.toLocaleLowerCase() !== 'li') {
            return
        }
        tabIndex = Array.prototype.indexOf.call(_this.tabs, event.target)
        _this.tabs.forEach(function (node) {
            node.classList.remove('active')
        })
        if (_this.underline) {
            underline.style.left = tabIndex * parseInt(_this.getStyle(event.target, 'width')) + 'px'
        }
        event.target.classList.add('active')
        _this.contents.forEach(function (node) {
            node.classList.remove('active')
        })
        _this.contents[tabIndex].classList.add('active')
    })
}
Tab.prototype.init = function () {
    if (this.underline) {
        underline.style.width = parseInt(this.getStyle(this.tabs[0], 'width')) + 'px'
    }
    this.bind()
}

let tabContainer = document.querySelector('.tab1>.tab1-tabs')
let tabs = document.querySelectorAll('.tab1>.tab1-tabs>li')
let contents = document.querySelectorAll('.tab1>.tab1-content>li')
let underline = document.querySelector('.tab1>.tab1-tabs .underline')

let tabContainer2 = document.querySelector('.tab2>.tab2-tabs')
let tabs2 = document.querySelectorAll('.tab2>.tab2-tabs>li')
let contents2 = document.querySelectorAll('.tab2>.tab2-content>li')

let tabContainer3 = document.querySelector('.tab3>.tab3-tabs')
let tabs3 = document.querySelectorAll('.tab3>.tab3-tabs>li')
let contents3 = document.querySelectorAll('.tab3>.tab3-content>li')

new Tab(tabContainer, tabs, contents, underline)
new Tab(tabContainer2, tabs2, contents2)
new Tab(tabContainer3, tabs3, contents3)


//ripple
!function () {
    function animationEnd(element, handler) {
        element.addEventListener('animationend', handler, false);
        element.addEventListener('webkitAnimationEnd', handler, false);
        element.addEventListener('mozAnimationEnd', handler, false);
        element.addEventListener('OAnimationEnd', handler, false);
    }

    function ripple(event, _this) {
        let x = event.pageX              //按钮距离文档顶部距离
        let y = event.pageY              //按钮距离文档左边距离
        let wx = _this.offsetWidth        //按钮的宽度
        let rippleEle = document.createElement('span')
        rippleEle.classList.add('ripple')
        x = x - _this.offsetLeft - wx / 2   //波纹元素相对按钮的偏移量
        y = y - _this.offsetTop - wx / 2
        console.log(x, y)
        _this.appendChild(rippleEle)
        rippleEle.style.cssText = 'width: ' + wx + 'px;height: ' + wx + 'px;top: ' + y + 'px;left: ' + x + 'px'
        rippleEle.classList.add('rippleEffect')
        animationEnd(rippleEle,
            function () {
                this.parentNode.removeChild(rippleEle);        //动画结束删掉元素
            });
    }

    let button = document.querySelector('.rippleCt>.ripplebtn')
    button.addEventListener('click', function (e) {
        ripple(e, this)
    })
}()
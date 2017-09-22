function sec() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://api.jirengu.com/weather.php', true)
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            //成功了
            console.log(xhr.responseText)
        } else {
            console.log('服务器异常')
        }
    }
    xhr.onerror = function () {
        console.log('服务器异常')
    }
    xhr.send()
}
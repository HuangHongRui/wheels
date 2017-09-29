/**
const request = {
    url,
    reqType,
    resType,
    onsuccess,
    onerror,
    reqData
}
 * 
 * 约定以上数据格式，url 必须，其余可选
 *  
/ */

function ajax(reqObj){
    let url = reqObj.url,
        reqType = reqObj.reqType || "GET",
        resType = reqObj.resType || "json",
        onsuccess = reqObj.onsuccess || function(){},
        onerror = reqObj.onerror || function(){},        
        reqData = reqObj.reqData || {};

    let reqStr = [];

    for(let key in reqData){
        if(reqData.hasOwnProperty(key)){
            reqStr.push(key+"="+reqData[key])
        }
    }

    reqStr = reqStr.join("&")


    if(reqType === "GET"){
        url += reqStr;
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open(reqType,url,true);
    
    if(reqType === "POST"){
        xhr.send(reqStr)
    }else{
        xhr.send()
    }

    xhr.onload = function(){
        if(xhr.status === 200 || xhr.status === 304){
            if(resType === "json"){
                onsuccess(JSON.parse(xhr.responseText))
            }else{
                onsuccess(xhr.responseText)
            }
        }else{
            xhr.onerror = onerror;
            onerror()
        }
    }
}
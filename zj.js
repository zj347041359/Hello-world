 //判断类型
 function type(target){
    var ret = typeof(target);
    var template = {
        '[object Array]' : 'array',
        '[object Object]' : 'object',
        '[object Number]' : 'number - object',
        '[object Boolean]' : 'boolean - object',
        '[object String]' : 'string - object'
    }
    if(target == null){
        return null;
    }
    if(ret !== 'object'){
        return ret;
    }else{
        var str = Object.prototype.toString.call(target);
        return template[str];
    }
}

 //数组去重
 function unrepeat(array){
    for(var i = 0; i < array.length - 1; i++){
        for(var j = 1; j < array.length; j++){
            if(array[j] === array[i]){
               array.splice(j,1);
            }
        }
    }
    return array;
}

//数组去重
Array.prototype.unique = function () {
    var obj = {},
        arr = [],
        len = this.length
    for(var i = 0; i < len; i++){
        if(!obj[this[i]]){
            obj[this[i]] = 'abc';
            arr.push(this[i]);
        }
    }
    return arr;
}

//返回滚动条位置，兼容性方法
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            x : window.pageXOffset,
            y : window.pageYOffset
        }
    }else{
        return {
            x : document.body.scrollLeft + document.documentElement.scrollLeft,
            y : document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//返回窗口尺寸，兼容性方法
function getViewportOffset(){
    if(window.innerHeight){
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }else{
        if(document.compatMode === 'BackCompat'){
            return {
                w : document.body.clientWidth,
                h : document.body.clientHeight
            }
        }else{
            return {
                w : document.documentElement.clientWidth,
                h : document.documentElement.clientHeight
            }
        }
    }
}
//js加载完成之后执行，兼容性写法
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    document.head.appendChild(script);
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState == 'complete' || script.readyState == 'loaded'){
                callback();
            }
        }
    }else{
        script.onload = function(){//非IE
            callback();
        }
    }
    script.src = 'url';
    document.head.appendChild(script);
}
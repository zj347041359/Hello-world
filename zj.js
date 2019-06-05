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
        if(!obj[this.[i]]){
            obj[this[i]] = 'abc';
            arr.push(this[i]);
        }
    }
    return arr;
}
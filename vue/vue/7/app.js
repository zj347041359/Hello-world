new Vue({
    el: '#vue-app',
    data: {
        name:'',
        age:''
    },
    methods: {
        logName:function(){
            console.log('正在输入姓名');
            
        },
        logAge:function(){
            console.log('正在输入年龄');
        }
    }
});
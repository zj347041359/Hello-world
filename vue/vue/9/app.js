new Vue({
    el: '#vue-app',
    data: {
        name:'',
        age:''
    },
    methods: {
        logName:function(){
            //console.log('正在输入姓名');
            this.name = this.$refs.name.value;
        },
        logAge:function(){
            //console.log('正在输入年龄');
            this.age = this.$refs.age.value;
        }
    }
});
new Vue({
    el: '#vue-app',
    data: {
        red:false,
        green:false,
    },
    methods: {
        
    },
    computed:{
        comClass:function(){
            return {
                green:this.green,
                red:this.red
                
            }
        }
    }
});
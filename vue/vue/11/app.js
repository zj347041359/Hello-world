var one = new Vue({
    el: '#vue-app-one',
    data: {
        title:'this one',
    },
    methods: {
        
    },
    computed:{
        greet: function(){
            return 'Hello App One';
        }
    }
});
var two = new Vue({
    el: '#vue-app-two',
    data: {
        title:'this two',
    },
    methods: {
        change:function(){
            one.title = '改了';
        }
    },
    computed:{
        greet: function(){
            return 'Hello App two';
        }
    }
});
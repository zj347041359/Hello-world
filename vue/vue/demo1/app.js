new Vue({
    el: '#vue-app',
    data: {
        health:100,
        ended:false,
    },
    methods: {
        add:function(){
            this.health -= 10;
            if(this.health <= 0){
                this.ended = true;
            }
        },
        again:function(){
            this.health = 100;
        }
    },
    computed:{
        
    }
});
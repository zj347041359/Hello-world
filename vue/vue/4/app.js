new Vue({
    el: '#vue-app',
    data: {
        age:30,
        X:0,
        Y:0
    },
    methods: {
        add: function(num){
            this.age += num;
        },
        sub: function(num){
            this.age -= num;
        },
        updateXY:function(event){
            this.X = event.offsetX;
            this.Y = event.offsetY;
        },
        alt:function(){
            alert('Hello');
        }
    }
});
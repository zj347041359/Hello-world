// v-on:click="changeName()"
Vue.component('greeting',{
    template:"<div><p>{{name}}:是兄弟就来砍我</p><button v-on:click='changeName'>换人</button></div>",
    data:function(){
        return{
            name:'张家辉'
        }
    },methods:{
        changeName:function(){
            this.name = '古天乐';
        }
    }
})
new Vue({
    el: '#vue-app-one',
    data: {
        
    },
    methods: {
        
    },
    computed:{
       
    }
});
new Vue({
    el: '#vue-app-two',
    data: {
        
    },
    methods: {
       
    },
    computed:{
        
    }
});
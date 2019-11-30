import Vue from 'vue'
Vue.filter('img',(value,args)=>{
    return args+value
})
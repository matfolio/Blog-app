import Vue from 'vue'
import App from './App.vue'
import router  from "./router"

Vue.config.productionTip = false

new Vue({
  router,
  data : {
    posts: []
  },
  render: h => h(App),
}).$mount('#app')

/*    mount(){
    fetch("localhost:8080/posts")
    .then(response => response.json())
    .then( (data) =>  {
      this.posts = data;
    })
  }, */

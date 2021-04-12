import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/SearchOutlet'
import SearchOutlet from "../components/SearchOutlet";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchOutlet',
      component: SearchOutlet
    },
  ]
})


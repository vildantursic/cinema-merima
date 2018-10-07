import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { store } from '../store/index'

import Home from '@/components/Home'
import Movies from '@/components/Movies'
import Movie from '@/components/Movie'
import Food from '@/components/Food'
import Bill from '@/components/Bill'
import Login from '@/components/Login'

const routes = [
  { path: '/', component: Home, meta: { conditionalRoute: true } },
  { path: '/movies', component: Movies, meta: { conditionalRoute: true } },
  { path: '/movie/:id', component: Movie, meta: { conditionalRoute: true } },
  { path: '/food', component: Food, meta: { conditionalRoute: true } },
  { path: '/bill', component: Bill, meta: { conditionalRoute: true } },
  { path: '/login', component: Login, meta: { conditionalRoute: false } }
]

export const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => { 
    if (to.matched.some(record => record.meta.conditionalRoute)) { 
        if (store.state.user !== 'token') { 
            next({ path: '/login' }) 
        } else { 
            next() 
        } 
    } else { 
        next()
    } 
}) 
import Vue from 'vue'
import VueRouter from 'vue-router';

import Login from '../pages/login/login.vue';
import Main from '../pages/main/main.vue'
import home from '../pages/main/children/home/home.vue'



Vue.use(VueRouter)

const Router = new VueRouter({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path:'home',
                    component:home
                },
                {
                    path: '',
                    redirect: 'home'
                }
            ]
        },
        {
            path: '/',
            redirect: '/main'
        }
    ]
})

export default Router
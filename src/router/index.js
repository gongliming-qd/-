import Vue from 'vue'
import VueRouter from 'vue-router';

import Login from '../pages/login/login.vue';
import Main from '../pages/main/main.vue'
import home from '../pages/main/children/home/home.vue'
import to_register from '../pages/main/children/to_register/to_register.vue'
import to_update_psw from '../pages/main/children/to_update_psw/to_update_psw.vue'
import admin_set from '../pages/main/children/user_power/admin_set.vue'



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
                    path:'to_register',
                    component:to_register
                },
                {
                    path:'to_update_psw',
                    component:to_update_psw
                },
                {
                    path:'admin_set',
                    component:admin_set
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
import Vue from 'vue'
import VueRouter from 'vue-router';

// Login ------------------ 
import Login from '../pages/login/login.vue';
// Login ------------------ 

// Main ------------------ 
import Main from '../pages/main/main.vue'
// Main ------------------ 

// home ------------------ 
import Home from '../pages/home/home.vue'
// home ------------------ 

// person_set ------------------ 
import person_set from '../pages/main/children/person_set/person_set.vue'
import to_register from '../pages/main/children/person_set/children/to_register/to_register.vue'
import to_update_psw from '../pages/main/children/person_set/children/to_update_psw/to_update_psw.vue'
import admin_set from '../pages/main/children/person_set/children/user_power/admin_set.vue'
import pt_set from '../pages/main/children/person_set/children/pt_set/pt_set.vue'
// person_set ------------------ 

Vue.use(VueRouter)

const Router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: 'person_set',
                    component: person_set,
                    children: [{
                            path: 'to_register',
                            component: to_register
                        },
                        {
                            path: 'to_update_psw',
                            component: to_update_psw
                        },
                        {
                            path: 'admin_set',
                            component: admin_set
                        },
                        {
                            path: 'pt_set',
                            component: pt_set
                        },
                        {
                            path: '',
                            redirect: 'to_register'
                        }
                    ]
                },
                {
                    path: 'home',
                    component: person_set,
                    children: [{
                            path: 'to_register',
                            component: to_register
                        },
                        {
                            path: 'to_update_psw',
                            component: to_update_psw
                        },
                        {
                            path: 'admin_set',
                            component: admin_set
                        },
                        {
                            path: 'pt_set',
                            component: pt_set
                        },
                        {
                            path: '',
                            redirect: 'to_register'
                        }
                    ]
                },
                {
                    path: 'data_quality',
                    component: person_set,
                    children: [{
                            path: 'to_register',
                            component: to_register
                        },
                        {
                            path: 'to_update_psw',
                            component: to_update_psw
                        },
                        {
                            path: 'admin_set',
                            component: admin_set
                        },
                        {
                            path: 'pt_set',
                            component: pt_set
                        },
                        {
                            path: '',
                            redirect: 'to_register'
                        }
                    ]
                },
                {
                    path: '',
                    redirect: 'person_set'
                }
            ]
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/',
            redirect: '/main'
        }
    ]
})

export default Router
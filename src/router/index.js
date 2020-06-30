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
import to_update_person from '../pages/main/children/person_set/children/to_update_person.vue'

import admin_set from '../pages/main/children/person_set/children/admin_set.vue'
import my_note from '../pages/main/children/person_set/children/my_note.vue'
// person_set ------------------ 
// no_found ------------------ 
import no_found from '../pages/no_found/no_found.vue'
// no_found ------------------ 
// no_found ------------------ 
import no_permission from '../pages/no_found/no_permission.vue'

Vue.use(VueRouter)

const Router = new VueRouter({
    routes: [{
            path: '/login',
            component: Login,
            meta: {

            }
        },
        {
            path: '/main',
            component: Main,
            children: [{
                    path: 'person_set',
                    component: person_set,
                    children: [{
                            path: 'to_update_person',
                            component: to_update_person,
                            meta: {
                            }
                        },
                        {
                            path: 'admin_set',
                            component: admin_set,
                            meta: {
                                limit: ['1']
                            }
                        },
                        {
                            path: 'my_note',
                            component: my_note,
                            meta: {
                            }
                        },
                        {
                            path: 'note_list',
                            component: () => import('@/pages/main/children/person_set/children/note_list.vue'),
                            meta: {
                            }
                        },
                        {
                            path: '',
                            redirect: 'to_update_person'
                        }
                    ]
                },
                {
                    path: 'home',
                    component: person_set,
                    children: [{
                            path: 'to_update_person',
                            component: to_update_person,
                            meta: {
                            }
                        },
                        {
                            path: 'admin_set',
                            component: admin_set,
                            meta: {
                                limit: ['1']
                            }
                        },
                        {
                            path: '',
                            redirect: 'to_update_person'
                        }
                    ]
                },
                {
                    path: 'data_quality',
                    component: person_set,
                    children: [{
                            path: 'to_update_person',
                            component: to_update_person,
                            meta: {
                            }
                        },
                        {
                            path: 'admin_set',
                            component: admin_set,
                            meta: {
                                limit: ['1']
                            }
                        },
                        {
                            path: '',
                            redirect: 'to_update_person'
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
            component: Home,
            meta: {}
        },
        {
            path: '/',
            redirect: '/main',
            meta: {}
        },
        {
            // 无权限
            path: '/no_permission',
            component: no_permission,
            meta: {}
        },
        {   // 404
            path: '*',
            component: no_found,
            meta: {}
        }

    ]
})

// 导入vuex
// import vuex from '../store/index'
Router.beforeEach((to, from, next) => {
    console.log(to);
    // 1. 处理用户刷新时, 重新获取用户数据产生的延迟问题
    /**
        原因 : 默认刷新, 会在 App.vue 中重新获取用户信息,然后存储在vuex中, 那么此时刷新不能立即获取到vuex中的数据, 那么需要等到数据获取成功后
        再进行判断该用户是否有权限查看该页面
    **/
   next()
})
export default Router
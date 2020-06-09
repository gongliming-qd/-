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
import vuex from '../store/index'
Router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(to.meta.limit);
    // 1. 处理用户刷新时, 重新获取用户数据产生的延迟问题
    /**
        原因 : 默认刷新, 会在 App.vue 中重新获取用户信息,然后存储在vuex中, 那么此时刷新不能立即获取到vuex中的数据, 那么需要等到数据获取成功后
        再进行判断该用户是否有权限查看该页面
    **/
    if (vuex.state.user.weight == '') {
        setTimeout(() => {
            // 1.1 重新获取数据后仍为空
            if (vuex.state.user.weight == '') {
                Router.push('/login')
                return
            } else {
                // 1.2 判断是否存在limit
                if (to.meta.limit) {
                    if (to.meta.limit.includes(vuex.state.user.weight)) {
                        next()
                        return
                    } else {
                        Router.push('/no_permission')
                        return
                    }
                }
                // 1.3 不存在limit的话, 直接到对应页面
                else{
                    next()
                }
            }
        }, 1000)
    }
    // 2. 当用户数据有内容的时候 
    else {
        if (to.meta.limit) {
            if (to.meta.limit.includes(vuex.state.user.weight)) {
                next()
                return
            } else {
                console.log(to.meta.limit);
                console.log(vuex.state.user.weight);
                Router.push('/no_permission')
                return
            }
        } else {
            next()
        }
    }
})
export default Router
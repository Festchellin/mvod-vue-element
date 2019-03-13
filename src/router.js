import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: "/login",
            name: "login",
            component: () => import('./views/MvodSignIn.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./views/MvodUserCenter.vue'),
            children: [{
                path:'modify',
                name:'modify',
                component: () => import('./views/MvodUserModify.vue'),
                children:[{
                    path:'password',
                    name:'user-modify-password',
                    component:() => import('./views/MvodUserModifyPassword.vue')
                },{
                    path:"user",
                    name:"user-modify-userInfo",
                    component:()=> import('./views/MvodUserModifyUserInfo.vue')
                }]
            },{
                path:'video',
                name:"user-video",
                component:()=> import("./views/MvodUserModifyVideo.vue")
            }]
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/MvodAdmin.vue'),
            children: [
                {
                    path: "user-admin",
                    name: 'admin-user',
                    component: () => import('./views/MvodAdminUserManagement.vue')
                },
                {path: "category", name: 'admin-category', component: () => import('./views/About.vue')},
                {path: "table", name: 'admin-table', component: () => import('./views/MvodAdminTableManage.vue')},
                {path: "userInfo", name: 'admin-userInfo', component: () => import('./views/MvodAdminUserInfoManagement.vue')},
                {
                    path: "userLog",
                    name: 'admin-userLog',
                    component: () => import('./views/MvodAdminUserLogManagement.vue')
                },
                {path: "vote", name: 'admin-vote', component: () => import('./views/About.vue')},
                {path: "video", name: 'admin-video', component: () => import('./views/About.vue')},
            ]
        }

    ]
})

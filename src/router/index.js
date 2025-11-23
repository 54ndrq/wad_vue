import {createRouter, createWebHashHistory} from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignupPage from "@/views/SignupPage.vue";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage
    },
    {
        path: '/signup',
        name: 'signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: SignupPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

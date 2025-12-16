import {createRouter, createWebHashHistory} from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import Contacts from "@/views/Contacts.vue";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupPage
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})


export default router

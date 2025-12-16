import {createRouter, createWebHashHistory} from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import Contacts from "@/views/Contacts.vue";
import APost from "@/views/APost.vue";
import AddPost from "@/views/AddPost.vue";

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
    },
    {
        path: '/post/:id',
        name: 'apost',
        component: APost,
        meta: {requiresAuth: true}
    },
    {
        path: '/addpost',
        name: 'addpost',
        component: AddPost
    },
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

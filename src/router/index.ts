import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: () => import('@/views/Home.vue'),
    //     meta: { title: 'Home' }
    // },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue'),
        meta: { requiresGuest: true, title: 'Register' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresGuest: true, title: 'Login' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: { title: '404' }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

export default router;
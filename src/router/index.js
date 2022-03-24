import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/work',
        name: 'Work',
        meta: {
            requiresAuth: true
        },
        component: () => import('../views/Work.vue')
    },
    {
        path: '/work/:id',
        name: 'WorkTable',
        meta: {
            requiresAuth: true
        },
        component: () => import('../views/WorkTable.vue')
    },
    {
        path: '/task/:id',
        name: 'Task',
        meta: {
            requiresAuth: true
        },
        component: () => import('../views/Task.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
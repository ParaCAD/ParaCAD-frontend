import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import TemplatePage from "@/components/pages/TemplatePage.vue";
import MainPage from "@/components/pages/MainPage.vue";

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: MainPage,
    },
    {
        path: '/template/:templateUUID',
        name: 'templatePage',
        component: TemplatePage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

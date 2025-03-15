import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import TemplatePage from "@/components/pages/TemplatePage.vue";
import MainPage from "@/components/pages/MainPage.vue";
import SearchPage from "@/components/pages/SearchPage.vue";

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: MainPage,
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage,
    },
    {
        path: '/template/:templateUUID',
        name: 'templatePage',
        component: TemplatePage,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

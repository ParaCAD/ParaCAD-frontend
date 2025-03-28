import {createRouter, createWebHistory} from 'vue-router';
import TemplatePage from "@/components/pages/TemplatePage.vue";
import MainPage from "@/components/pages/MainPage.vue";
import SearchPage from "@/components/pages/SearchPage.vue";
import {i18n} from '@/i18n.js'

const {t} = i18n.global

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: MainPage,
        meta: {title: t('title.main') + ' - ParaCAD'}
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage,
        meta: {title: t('title.search') + ' - ParaCAD'}
    },
    {
        path: '/template/:templateUUID',
        name: 'templatePage',
        component: TemplatePage,
        meta: {title: t('title.template') + ' - ParaCAD'}
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
export default router

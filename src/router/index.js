import {createRouter, createWebHistory} from 'vue-router';
import TemplatePage from "@/components/pages/TemplatePage.vue";
import UserPage from "@/components/pages/UserPage.vue";
import MainPage from "@/components/pages/MainPage.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import RegisterPage from "@/components/pages/RegisterPage.vue";
import SearchPage from "@/components/pages/SearchPage.vue";
import {i18n} from '@/i18n.js'
import CreateTemplatePage from "@/components/pages/CreateTemplatePage.vue";

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
    {
        path: '/user/:userUUID',
        name: 'userPage',
        component: UserPage,
        meta: {title: t('title.user') + ' - ParaCAD'}
    },
    {
        path: '/createTemplate',
        name: 'createTemplatePage',
        component: CreateTemplatePage,
        meta: {title: t('title.create_template') + ' - ParaCAD',  requiresLoggedIn: true}
    },
    {
        path: '/login',
        name: 'loginPage',
        component: LoginPage,
        meta: {title: t('title.login') + ' - ParaCAD', requiresLoggedOut: true}
    },
    {
        path: '/register',
        name: 'registerPage',
        component: RegisterPage,
        meta: {title: t('title.register') + ' - ParaCAD', requiresLoggedOut: true}
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;

    if (to.matched.some(record => record.meta.requiresLoggedIn) && !localStorage.getItem('token')) {
        next({
            path: '/login',
        });
    } else if (to.matched.some(record => record.meta.requiresLoggedOut) && localStorage.getItem('token')) {
        next({
            path: '/',
        });
    } else {
        next();
    }
});
export default router

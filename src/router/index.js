import Vue from "vue";
import VueRouter from "vue-router";
import WelcomePage from "@/pages/WelcomePage.vue";
import PersonalCab from "@/pages/PersonalCab/PersonalCabinet.vue";
import Page404 from "@/pages/NotFound.vue";
// import BookingTable from "@/pages/PersonalCab/ChildPages/BookingTable.vue"
import App from "@/App.vue"


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: App,
    },
    {
        path: "/welcomepage",
        name: "welcomepage",
        component: WelcomePage,
    },
    {
        path: "/personalpage",
        name: "personalpage",
        component: PersonalCab,
        children:[
            {
                path: "/personalpage/bookingtable",
                name: "BookingTable",
                component: () => import( /*webpackChunkName: "BookingTable" */ '@/pages/PersonalCab/ChildPages/BookingTable.vue')
            },
            {
                path: "/personalpage/preferences",
                name: "SettingsPage",
                component: () => import( /*webpackChunkName: "Preferences" */ '@/pages/PersonalCab/ChildPages/SettingsPage.vue')
            },
            {
                path: "/personalpage/services",
                name: "ServicePage",
                component: () => import( /*webpackChunkName: "Preferences" */ '@/pages/PersonalCab/ChildPages/ServicePage.vue')
            },
            {
                path: "/personalpage/clients",
                name: "ClientsList",
                component: () => import( /*webpackChunkName: "Preferences" */ '@/pages/PersonalCab/ChildPages/ClientsList.vue')
            },
            {
                path: "/personalpage/contacts",
                name: "Contacts",
                component: () => import( /*webpackChunkName: "Contacts" */ '@/pages/PersonalCab/ChildPages/Contacts.vue')
            },
            {
                path: "/personalpage/finance",
                name: "Finance",
                component: () => import( /*webpackChunkName: "Finance" */ '@/pages/PersonalCab/ChildPages/Finance.vue')
            },
        ]
    },
    {
        path: "/404",
        name: "NotFound",
        component: Page404,
    },
    {
        path: '/*',
        redirect: { name: 'NotFound' }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});


router.beforeEach((to, from, next)=>{
    const token = localStorage.getItem('x_xsrf_token');

    //не авторизован: нет токена
    if(!token) {
        //если пользователь хочет пойти на страницы
        if(to.name === 'welcomepage' || to.name === 'registration'){
            return next();
        } else  {
            //пользователь хочет пойти на другие страницы
            return next({
                name: 'welcomepage'
            })
        }
    }
    //  авторизован: есть токен
    if(token && to.name === 'welcomepage' || to.name === 'registration' ){
        return next({
            name: 'BookingTable'
        })
    }
    next();
})



export default router;

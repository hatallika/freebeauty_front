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
                name: "Preferences",
                component: () => import( /*webpackChunkName: "Preferences" */ '@/pages/PersonalCab/ChildPages/Preferences.vue')
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
            name: 'personalpage'
        })
    }
    next();
})



export default router;

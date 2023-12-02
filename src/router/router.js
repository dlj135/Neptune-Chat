import { createRouter, createWebHistory } from "vue-router";
import Main from '../views/MainPage.vue'

// const routes  = [
//     { 
//         path: "/",
//         name: 'Main', 
//         component: Main,
//         meta:{
//             requiresAuth: true
//         }
//     },
//     {
//         path: "/login",
//         name: 'Login', 
//         component: () => import("../views/Login.vue"),
//     },
//     {
//         path: "/register",
//         name: 'Register', 
//         component: import("../views/Register.vue"),
//     },
        
// ]

// const router = createRouter({
//     history: createWebHistory(process.env.BASE_URL),
//     routes
// })

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/MainPage.vue") },
        { path: "/register", component: () => import("../views/Register.vue") },
        { path: "/login", component: () => import("../views/Login.vue") },

    ]
});

export default router;
   

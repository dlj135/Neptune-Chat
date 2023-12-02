import { createRouter, createWebHistory } from "vue-router";

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
        { path: "/", component: () => import("../views/Login.vue") },
        { path: "/register", component: () => import("../views/Register.vue") },
        { path: "/giveusanA", component: () => import("../views/MainPage.vue") },

    ]
});

export default router;
   

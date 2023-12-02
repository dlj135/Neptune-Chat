import { getAuth, onAuthStateChanged } from "@/firebase";
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
        { 
            path: "/giveusanA", 
            component: () => import("../views/MainPage.vue"),
            meta: {
                requiresAuth: true
            },
        },
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            alert("You Must Sign In To View This Page")
            next("/")
        }
    }
    else{
        next();
    }
});

export default router;
   

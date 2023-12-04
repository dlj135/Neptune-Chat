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
        // public landing page route
        { path: "/", component: () => import("../views/LandingPage.vue") },
        
        // Login route (not protected)
        { path: "/login", component: () => import("../views/Login.vue") },
        
        // Registration route (not protected)
        { path: "/register", component: () => import("../views/Register.vue") },
        
        { path: "/enter-username", component: () => import("../views/Alias.vue") },

        // Protected MainPage route
        { 
            path: "/mainpage", // This path is now protected and only for logged-in users
            component: () => import("../views/MainPage.vue"),
            meta: {
                requiresAuth: true
            },
        },
        // ... other routes ...
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async(to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            alert("You must sign in to view this page.");
            next("/login"); // Redirect to the login page if not authenticated
        }
    }
    else {
        next();
    }
});

export default router;


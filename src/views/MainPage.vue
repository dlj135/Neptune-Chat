<template>
    <h1>Main</h1>
    <button type="button" @click="handleSignOut" v-if="isLoggedIn">Log Out</button>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut } from "@/firebase";
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const isLoggedIn = ref(false);

    let auth;
    onMounted(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                isLoggedIn.value = true;
            }
            else{
                isLoggedIn.value = false;
            }
        });

    });
    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push('/')
        });
    };
</script>
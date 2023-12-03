<template>
    <div class="regGen">
        
        <div>
            <form class="register">
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email address"
                v-model="email" />
            <input 
                type="password" 
                placeholder="Password" 
                v-model="password" />
            <div v-if="errMsg" class="error">{{ errMsg }}</div>
            <div class="space"></div>
            <div>
                <button type="button" @click="register">Submit</button>
                <button type="button" @click="signInWithGoogle">Sign In With Google</button>
                <button type="button" @click="registrationPage">Not Registered?</button>
            </div>
            
            
            </form>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@/firebase"
import { useRouter } from 'vue-router';
const email = ref("");
const password = ref("");
const errMsg = ref("")
const router = useRouter()

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        alert("Successfully Login!")
        console.log("Successfully Login! " + data )
        router.push('/mainpage')
    })
    .catch((error) => {
        console.log(error.code)
        switch (error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/invalid-credential":
                errMsg.value = "Incorrect password";
                break;
            case "auth/missing-password":
                errMsg.value = "Where's your password lil guy";
                break;
            default:
                errMsg.value = "Email or password was incorrect";
                break;
        }
    })
}
const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
           console.log(result.user);
           router.push("/mainpage")
        }).catch((error) => {
            alert("Something went wrong :/\n" + error.code)
        }); 
}

const registrationPage = () => {
    router.push('/register')
}

</script>

<style>
.regGen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-image: url('/img/login_register_background.jpg');
    background-size: cover;
    background-position: center;
    color: white;
}

.register {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 400px; /* Adjust width as needed */
    background-color: black;
    padding: 20px;
    border-radius: 10px;
}

.register h2 {
    margin-bottom: 20px;
    text-align: center;
    margin-bottom: 10%;
}

.register input {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    margin-left: 25%;
    margin-bottom: 10px;
    border-radius: 10px;
}

.register button {
    display: block;
    padding: 10px 6px;
    width: 50%;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 25%;
    border-radius: 25px;
}
.space{
    margin-bottom: 20%;
}
.error{
    color: red;
    text-align: center;
}

</style>

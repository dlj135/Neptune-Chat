<template>
		<div class="regGen">
            
            <div>
                <form class="register">
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="password" />
                <div class="space">
                </div>
                <div>
                    <button type="button" @click="register">Submit</button>
                    <button type="button" @click="signInWithGoogle">Sign In With Google</button>
                    <button type="button" @click="loginPage">Back to Login</button>
                </div>
                
				
			    </form>
            </div>
			
        </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "@/firebase"
    import { useRouter } from 'vue-router';
    const email = ref("");
    const password = ref("");
    const router = useRouter()

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            alert("Successfully registered!")
            console.log("Successfully registered! " + data )
            router.push('/')
        })
        .catch((error) => {
            alert(error.message)
            console.log(error.code)
            
        })
    }
    const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
           console.log(result.user);
           router.push("/")
        }).catch((error) => {
            alert("Something went wrong :/\n" + error.code)
        }); 
	}

    const loginPage = () => {
    router.push('/')
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
    
</style>
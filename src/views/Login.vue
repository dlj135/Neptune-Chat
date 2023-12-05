<template>
    <div class="login-container">
      <div>
        <form class="login-form">
          <h2>Login</h2>
          <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password" />
          </div>
          <div v-if="errMsg" class="error">{{ errMsg }}</div>
          <div class="space"></div>
          <div class="buttons">
            <button type="button" @click="login">Login</button>
            <button type="button" @click="signInWithGoogle">Sign In With Google</button>
          </div>
        <div class="register-link">
          Don't Have an Account? <button type="button" @click="registrationPage">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@/firebase";
  import { useRouter } from 'vue-router';
  
  const email = ref("");
  const password = ref("");
  const errMsg = ref("");
  const router = useRouter();
  
  const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        alert("Successfully logged in!");
        console.log("Successfully logged in! " + data);
        router.push('/mainpage');
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
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
      });
  };
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push("/mainpage");
      })
      .catch((error) => {
        alert("Something went wrong :/\n" + error.code);
      });
  };
  
  const registrationPage = () => {
    router.push('/register');
  };
  
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: cover;
    background-position: center;
    color: white;
    background-image: url('/img/login_register_background.jpg');
  }
  
  .login-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    background-image: url('/img/login_register_background.jpg');

  }
  
  h2 {
    color: rgb(249, 247, 248);
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 8px;
    display: block;
    color: #f8f5f5;
  }
  
  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px;
    width: 48%;
    background-color: #515356;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #3b3c3d;
  }
  
  .space {
    margin-bottom: 20%;
  }
  
  .error {
    color: red;
    text-align: center;
  }

  .register-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #f5f2f2;
  }
  
  .register-link button {
    background: none;
    border: none;
    padding: 0;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  
  .register-link button:hover {
    text-decoration: underline;
  }
  
  </style>
  
<template>
    <div class="register-container">
      <div class="register-form">
        <h2>Registration</h2>
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirm your password" required />
        </div>
        <div v-if="errMsg" class="error">{{ errMsg }}</div>
        <div class="buttons">
          <button type="button" @click="register">Register</button>
          <button type="button" @click="signInWithGoogle">Sign Up With Google</button>
        </div>
        <div class="login-link">
          Already Registered? <button type="button" @click="loginPage">Login</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "@/firebase";
  import { useRouter } from 'vue-router';
  
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const errMsg = ref("");
  const router = useRouter();
  
  const register = () => {
    if (password.value !== confirmPassword.value) {
      errMsg.value = "Passwords must match.";
      return;
    }
  
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        alert("Successfully registered!");
        console.log("Successfully registered! " + data);
        router.push('/enter-username');
      })
      .catch((error) => {
        console.error(error);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email format.";
            break;
          case "auth/weak-password":
            errMsg.value = "Weak password. Choose a stronger one with at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            errMsg.value = "Email address is already in use.";
            break;
          default:
            errMsg.value = "Registration failed. Please try again.";
            break;
        }
      });
  };
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push('/enter-username');
      })
      .catch((error) => {
        alert("Something went wrong: " + error.code);
      });
  };
  
  const loginPage = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('/img/login_register_background.jpg');
    background-size: cover;
    background-position: center;
    color: #fff;
  }
  
  .register-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
    background-image: url('/img/login_register_background.jpg');

  }
  
  h2 {
    color: #fff;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    margin-bottom: 8px;
    display: block;
    color: #fff;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px;
    width: 48%;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
  
  .login-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #333;
  }
  
  .login-link button {
    background: none;
    border: none;
    padding: 0;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  
  .login-link button:hover {
    text-decoration: underline;
  }
  </style>
  
<template>
  <div class="username-form">
    <h1>Choose Your Alias:</h1>
    <form @submit.prevent="submitUsername">
      <div class="form-group">
        <input v-model="username" type="text" id="username" required>
      </div>
      <div class="form-group">
        <button type="submit">Submit</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { collection, addDoc, db, getDocs, query, where, getAuth } from '@/firebase';
import { useRouter } from 'vue-router';

const username = ref("");
const error = ref("");
const router = useRouter();
let auth;

const submitUsername = async () => {
  auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return;
  }

  // Trim and lowercase the entered username for case-insensitive comparison
  const trimmedUsername = username.value.trim().toLowerCase();

  // Check if the username already exists
  const usernameExists = await checkUsernameExists(trimmedUsername);
  if (usernameExists) {
    error.value = "Alias already exists. Please choose another one.";
    return;
  }

  try {
    await addDoc(collection(db, "Usernames"), {
      alias: trimmedUsername,
      uid: user.uid
    });
    router.push("/mainpage");
  } catch (error) {
    console.error("Error submitting username:", error.message);
  }
};

const checkUsernameExists = async (alias) => {
  const q = query(collection(db, "Usernames"), where("alias", "==", alias));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

</script>


<style scoped>
.username-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('/img/login_register_background.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
}

h1 {
  color: #fff;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
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

button {
  padding: 10px;
  background-color: #67696b;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #44494b;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>

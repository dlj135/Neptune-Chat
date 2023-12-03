<template>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>
    <div class="background">
        <header class="main-header">
            <img src="/img/default_pfp.jpg" alt="Profile Picture" class="profile-picture">

            <div class="icons">
                <span class="material-icons">home</span>
                <span class="material-icons">import_contacts</span>
                <span class="material-icons">chat</span>
            </div>

            <input type="text" placeholder="Search" class="search-bar">

            <button type="button" @click="handleSignOut" v-if="isLoggedIn" class="logout-button">Logout</button>
        </header>

        <div class="sidebar">
            <h5>Direct Messages</h5>
            <hr>
            <a class="active">Dillon Jacques</a>
            <a>Joshua Hammond</a>
            <a>Tre Cobb</a>
            <a>Kalup Cook</a>
        </div>

        <div class="name">
            <h5>Dillon Jacques</h5>
            <hr>
            <div class="content">
            <div class="containerr">
                <p>Hello. How are you today?</p>
                <span class="time-right">11:00</span>
            </div>

            <div class="containerr darker">
                <p>Hey! I'm fine. Thanks for asking!</p>
                <span class="time-left">11:01</span>
            </div>

            <div class="containerr">
                <p>Sweet! So, what do you wanna do today?</p>
                <span class="time-right">11:02</span>
            </div>

            <div class="containerr darker">
                <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
                <span class="time-left">11:05</span>
            </div>
            </div>
            <div class="createMessage">
                <input ref="newmessage" type="text" placeholder="Jot something down!">
                <button v-on:click="getMessage"><i class="fas fa-send"></i></button>
            </div>
        </div>
    </div>
    
</template>



<!-- If you prefer a more concise and reactive syntax, <script setup> is the recommended choice -->
<!-- Bard -->
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

    // Sending a message
    // const messagesCollection =  await getDocs(collection(db, 'Messages'))
    // messagesCollection.forEach((task) => {
    //   console.log(task)
    // });
    // const user = firebase.auth.currentUser;
    // if (user !== null) {
    //   const uid = user.uid;
    //   console.log(uid);
    //   const docRef = await addDoc(collection(db, "Messages"), {
    //     text: 'testing',
    //     createdAt: serverTimestamp(),
    //     uid,
    //   });
      
    // }
    // else{
    //   console.log('User not found');
    // }

    // // receiving a doc/message
    // const q = query(collection(db, "Messages"), where("uid", "==", 'user.uid'), orderBy("createdAT"), limit(25));
    // onSnapshot(q, (querySnapshot) => {
    //   const fbMessage = [];
    //   querySnapshot.forEach((doc) => {
    //     const message = {
    //       senderID: doc.uid,
    //       content: doc.data().text,
    //       sentAt: doc.data().createdAT,
    //     }
    //     fbMessage.push(message)
    //   });
    //   messages.value = fbMessage
    // });
</script>

<style>
    .background{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        background-image: url('/img/login_register_background.jpg');
        background-size: cover;
        background-position: center;
        
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5%;
        width: 90%;
        margin: 10px;
        margin-left: 45px;
        background-color: rgb(130, 171, 247);
        border-radius: 25px !important;
        border: 3px solid rgb(130, 171, 247);
    }

    .profile-picture {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ccc;
        margin-left: 25px;
    }

    .icons {
        display: flex;
        margin-right: 20px;
        width: 75px;
        
    }
    .icons span{
        padding-right: 30px;
    }
    .logout-button {
        padding: 5px 10px;
        margin-right: 25px;
        border: 2px solid rgb(130, 171, 247);
        border-radius: 5px;
        background-color: black;
        color: #fff;
        cursor: pointer;
    }
    
</style>
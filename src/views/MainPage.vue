<template>
    <div class="background">
        <header class="main-header">
            <img src="/img/default_pfp.jpg" alt="Profile Picture" class="profile-picture">

            <div class="icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v600L720-240H280ZM80-280v-560q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240L80-280Zm520-240v-280H160v280h440Zm-440 0v-280 280Z"/></svg>
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
        height: 10%;
        width: 90%;
        margin: 10px;
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
        margin: 0 20px;
        width: 25px !important;
    }
    svg{
        transform: scale(3,3)
        
    }
    
</style>
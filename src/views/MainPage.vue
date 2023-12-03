<template>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    </head>
    <div class="background">
        <header class="main-header">
            <img id="profilePicture" src="/img/default_pfp.jpg" alt="Profile Picture" class="profile-picture">

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
                <input v-model="newmessage" type="text" placeholder="Jot something down!">
                <button v-on:click="addMessage"><span class="material-icons">send</span></button>
            </div>
        </div>
    </div>
    
</template>



<!-- If you prefer a more concise and reactive syntax, <script setup> is the recommended choice -->
<!-- Bard -->
<script setup>
    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut, getDocs, collection, db, addDoc, serverTimestamp } from "@/firebase";
    import { useRouter } from 'vue-router';
    // this routes the page back to login if the user signs out
    const router = useRouter()
    // this is the login flag
    const isLoggedIn = ref(false);
    // this takes user input from the text box
    const newmessage = ref('')

    //this handles the log out button and allows the user to stay signed
    // even with a refresh
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
    // this is the google signout function
    const handleSignOut = () => {
        signOut(auth).then(() => {
            router.push('/')
        });
    };

    // const messagesCollection =  await getDocs(collection(db, 'Messages'))
        // messagesCollection.forEach((task) => {
        // console.log(task)
        // });

    // Sending a message to the db
    const addMessage = async () => {
        const user = auth.currentUser;
        if (user !== null) {
            const uid = user.uid;
            console.log(uid);
            await addDoc(collection(db, "Messages"), {
                messageText: newmessage.value,
                senderId: uid,
                // SUNCuNADHrMJ8bbWYdKmkRtjcC13 is user: messager1@gmail.com 
                // still need to work on how the user can choose who to send to
                participants: [uid, 'SUNCuNADHrMJ8bbWYdKmkRtjcC13'],
                createdAt: serverTimestamp(),
            });
        }
        else{
            console.log('User not found');
        }
    };

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

<!-- Page styles -->
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
        margin-left: 85px;
        background-color: rgb(130, 171, 247);
        border-radius: 25px !important;
        border: 3px solid rgb(130, 171, 247);
    }

    .profile-picture {
        display: inline-block;
        width: 25px;
        height: 25px;
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


    /* sidebar */
    .sidebar {
        margin: 0;
        padding: 0;
        width: 15%;
        background-color: #343434;
        position: absolute;
        left: 10px;
        height: 85%;
        border-radius: 25px;
        border: 1px solid rgb(130, 171, 247);
    }

    .sidebar h5 {
        margin: 10%;
        font-weight: bold;
        color: white;
    }

    .sidebar hr {
        color: rgb(130, 171, 247);
    }

    .sidebar a {
        display: block;
        color: white !important;
        padding: 16px;
        text-decoration: none;
    }
        
    .sidebar a.active {
        background-color: rgb(130, 171, 247);
    }

    .sidebar a:hover:not(.active) {
        background-color: #a9569c;
        
    }
    

    /* Middle of the page */
div.name {
    margin: 0;
    padding: 0;
    width: 75%;
    height: 78%;
    position: absolute;
    right: 7%;
    color: white;
  }
  .name h5 {
    margin: 2%;
    text-align: left;
    font-weight: bold;
  }
  .name hr { 
    margin-left: 2%;
    
  }
  div.content {
    margin-left: 0%;
    padding: 1px 16px;
    height: 85%;
  }
  /* Chat containers */
  .containerr {
    border: 2px solid #dedede;
    border-radius: 25px;
    padding: 10px;
    margin: 10px 0;
    text-align: left;
    background-color: rgb(128, 128, 128, 0.2);
  }

  /* Darker chat container */
  .darker {
    border-color: rgb(130, 171, 247);
    text-align: right;
    background-color: rgb(130, 171, 247, 0.2);
    
  }

  /* Clear floats */
  .container::after {
    content: "";
    clear: both;
    display: table;
  }

  /* Style images */
  /* .container img {
    float: left;
    max-width: 60px;
    width: 100%;
    margin-right: 20px;
    border-radius: 50%;
  } */

  /* Style the right image */
  /* .container img.right {
    float: right;
    margin-left: 20px;
    margin-right:0;
  } */

  /* Style time text */
  .time-right {
    color: white;
  }

  /* Style time text */
  .time-left {
    color: white;
  }
  .createMessage {
    margin-left: 15%;
    padding: 10px;
    border: 3px solid #dedede;
    background-color: #343434;
    width: 75%;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
  }
  .createMessage input {
      padding: 1% 1%;
      width: 85%;
      border-color: black;
      background-color: gray;
  }
    .createMessage ::placeholder {
        color: white;
        opacity: 1; /* Firefox */
    }
  .createMessage button {
    width: 100px;
    background: none;
  }
</style>
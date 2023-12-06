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
            <div class="search-container">
                <input v-model="searchInput" type="text" placeholder="Search for a user...">
                <div class="search-results">
                    <ul v-if="searchResults.length">
                        <li v-for="result in searchResults" :key="result.uid" @click="addUserToSidebar(result)">
                            {{ result.alias }}
                        </li>
                    </ul>
                </div>
            </div>
            <button type="button" @click="handleSignOut" v-if="isLoggedIn" class="logout-button">Logout</button>
        </header>

        <div class="sidebar">
            <h5>Direct Messages</h5>
            <hr />
            <a v-for="user in sidebarUsers" :key="user.uid" @click="selectUserInSidebar(user)">
                {{ user.alias }}
            </a>
        </div>

        <div class="name">
            <h5>{{ selectedUserAlias }}</h5>
            <hr>
            <div class="content">
                <!-- <div v-for="(message) in [receive, history].sort((a, b) => a.createdAt.toDate().toLocaleTimeString() - b.createdAt.toDate().toLocaleTimeString())"  :class="{'containerr': message.senderId !== uid, 'containerr darker': message.senderId === uid}">
                    <p>{{ message.messageText }}</p>
                    <p>{{ message.createdAt.toDate().toLocaleTimeString() }}</p>
                </div>
                <div class="containerr" v-for="(message) in receive" :key="message.createdAt.toDate().toLocaleTimeString()">
                    <p>{{ message.messageText }}</p>
                    <span class="time-right">{{ message.createdAt.toDate().toLocaleTimeString() }}</span>
                </div>
                <div class="containerr darker" v-for="(message) in history"
                    :key="message.createdAt.toDate().toLocaleTimeString()">
                    <p>{{ message.messageText }}</p>
                    <span class="time-right">{{ message.createdAt.toDate().toLocaleTimeString() }}</span>
                </div> -->
                <div v-for="(message) in allMessages" :key="message.createdAt.toDate().toLocaleTimeString()">
                    <div class="containerr" v-if="message.senderId !== loggedinuser">
                        <p>{{ message.messageText }}</p>
                        <span class="time-right">{{ message.createdAt.toDate().toLocaleTimeString() }}</span>
                    </div>
                    <div class="containerr darker" v-if="message.senderId === loggedinuser">
                        <p>{{ message.messageText }}</p>
                        <span class="time-right">{{ message.createdAt.toDate().toLocaleTimeString() }}</span>
                    </div>
                </div>
            </div>
            <div class="createMessage">
                <input v-model="newmessage" @keyup.enter="addMessage" type="text" placeholder="Jot something down!">
                <button v-on:click="addMessage"><span class="material-icons">send</span></button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { onMounted, ref, watchEffect } from "vue";
import { getAuth, onAuthStateChanged, signOut, getDocs, collection, db, addDoc, serverTimestamp, query, where, orderBy, limit, onSnapshot } from "@/firebase";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const isLoggedIn = ref(false);
        const newmessage = ref('');
        const userAliases = ref([]);
        const selectedUserAlias = ref(null);
        const searchInput = ref('');
        const searchResults = ref([]);
        const sidebarUsers = ref([]);

        let auth;
        let user;
        let uid;
        let selectedUserUid = ref(null);
        let allMessages = ref([]); // Adding an array to house ALL messages together
        

        onMounted(async () => {
            auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    isLoggedIn.value = true;
                } else {
                    isLoggedIn.value = false;
                }
            });

            user = auth.currentUser;
            uid = user.uid;

            // Fetch user aliases from the Usernames collection
            await fetchUserAliases();

            // Set the initial selected user
            await selectUser(userAliases.value[0]);
        });

        const fetchUserAliases = async () => {
            const usernamesQuery = await getDocs(collection(db, "Usernames"));
            userAliases.value = usernamesQuery.docs.map(doc => doc.data().alias);
        };

        const selectUser = async (alias) => {
            selectedUserAlias.value = alias;

            // Fetch UID based on alias from the Usernames collection
            const usernamesQuery = await query(collection(db, "Usernames"), where("alias", "==", alias), limit(1));
            const usernamesSnapshot = await getDocs(usernamesQuery);

            if (!usernamesSnapshot.empty) {
                const userDocument = usernamesSnapshot.docs[0];
                selectedUserUid.value = userDocument.data().uid;
            }

            fetchMessages();
        };

        const fetchMessages = async () => {
            if (selectedUserUid.value) {
                const combinedIds = [uid, selectedUserUid.value].sort().join('_');
                const q = await query(collection(db, "Messages"), where("participantsIds", "==", combinedIds), orderBy("createdAt"));
                onSnapshot(q, (querySnapshot) => {
                    const allUserMessages = []; // Gather ALL messages here
                    querySnapshot.forEach((doc) => {
                        // Add all messages to the combined array
                        allUserMessages.push(doc.data());
                    });
                    allMessages.value = allUserMessages; // Set this for all message array
                });
            }
        };

        const handleSignOut = () => {
            signOut(auth).then(() => {
                router.push('/');
            });
        };

        const addMessage = async () => {
            if (newmessage.value === ""){
                return;
            }
            if (selectedUserUid.value) {
                const user = auth.currentUser;
                if (user !== null) {
                    const uid = user.uid;
                    await addDoc(collection(db, "Messages"), {
                        messageText: newmessage.value,
                        senderId: uid,
                        participantsIds: [uid, selectedUserUid.value].sort().join('_'),
                        createdAt: serverTimestamp(),
                    });
                    newmessage.value = '';
                }
            } else {
                console.log('No user selected');
            }
        };

        const addUserToSidebar = (userAlias) => {
            // Add the selected user alias to the sidebar
            if (!sidebarUsers.value.some(user => user.uid === userAlias.uid)) {
                sidebarUsers.value.push({ uid: userAlias.uid, alias: userAlias.alias });
                // Clear the search input
                searchInput.value = '';
                // Close the search results
                searchResults.value = [];
            }
        };

        const selectUserInSidebar = async (user) => {
            // Select the user in the sidebar and update the UID
            selectedUserUid.value = user.uid;
            selectedUserAlias.value = user.alias;

            // Fetch messages for the selected user
            fetchMessages();
        };

        // Watch for changes in the search input and update search results
        watchEffect(async () => {
            if (searchInput.value.trim() === '') {
                searchResults.value = [];
            } else {
                const usernamesQuery = await query(collection(db, "Usernames"), where("alias", ">=", searchInput.value.toLowerCase()), where("alias", "<=", searchInput.value.toLowerCase() + "\uf8ff"));
                const usernamesSnapshot = await getDocs(usernamesQuery);
                searchResults.value = usernamesSnapshot.docs.map(doc => ({ uid: doc.data().uid, alias: doc.data().alias }));
            }
        });

        auth = getAuth();
        user = auth.currentUser;
        const loggedinuser = user.uid;

        return {
            isLoggedIn,
            newmessage,
            userAliases,
            selectedUserAlias,
            searchInput,
            searchResults,
            allMessages,
            loggedinuser,
            handleSignOut,
            addMessage,
            addUserToSidebar,
            sidebarUsers,
            selectUserInSidebar,
        };
    },
};
</script>







<style>
.background {
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

header {
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

.icons span {
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
    display: flex;
    flex-direction: column;
    height: 85vh;
    color: white;
    margin-left: 18%;
}

.name h5 {
    margin-top: 2%;
    margin-left: 2%;
    margin-bottom: 1%;
    line-height: 20px;
    text-align: left;
    font-weight: bold;
    font-size: 2rem;
}

.name hr {
    margin-left: 2%;
    width: 85%;
}

div.content {
    flex: 1;
    margin-bottom: 1%;
    margin-left: 0%;
    padding: 1px 16px;
    max-height: 85%; /* Set a maximum height for scrolling */
    width: 85%;
    overflow-y: auto;
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
    margin-left: 5%;
    padding: 10px;
    border: 3px solid #dedede;
    background-color: #343434;
    width: 75%;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    margin-top: auto;
}

.createMessage input {
    padding: 1% 1%;
    width: 85%;
    border-color: black;
    background-color: gray;
}

.createMessage ::placeholder {
    color: white;
    opacity: 1;
    /* Firefox */
}

.createMessage button {
    width: 100px;
    background: none;
}

/* Search container and results */
.search-container {
    position: relative;
}

.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ddd;
    border-top: none;
    width: 100%;
}

.search-results ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.search-results li {
    padding: 10px;
    cursor: pointer;
}
</style>

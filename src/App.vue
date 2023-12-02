

<script setup>

  // import { ref, onMounted } from 'vue'
  // import { collection, query, where, getDocs, onSnapshot, serverTimestamp, orderBy, limit  } from "firebase/firestore";
  // import { db } from "@/firebase"
  // import { auth } from "@/firebase"

  // const messages = ref([

  // ])

  // onMounted(() => {
  //   //const q = query(collection(db, "Messages"), where("uid", "==", '4Ar4UfzK9udBhbHBr3D50AljACt2'));
  //   // let fbMessage = []
  //   // const querySnapshot = await getDocs(q);
  //   // querySnapshot.forEach((doc) => {
  //   //   console.log(doc.id, " => ", doc.data());
  //   //   const message = {
  //   //     senderID: doc.uid,
  //   //     content: doc.data().text,
  //   //     sentAt: doc.data().createdAT,
  //   //   }
  //   //   fbMessage.push(message)
  //   // })
  //   // messages.value = fbMessage
    
  //   // This listens and automatically updates the page when a new message arrives
  //   // https://firebase.google.com/docs/firestore/query-data/listen#web-modular-api_3
    
  //   const user = auth.currentUser;
  //   const q = query(collection(db, "Messages"), where("uid", "==", 'user.uid'), orderBy("createdAT"), limit(25));
  //   onSnapshot(q, (querySnapshot) => {
  //     const fbMessage = [];
  //     querySnapshot.forEach((doc) => {
  //       const message = {
  //         senderID: doc.uid,
  //         content: doc.data().text,
  //         sentAt: doc.data().createdAT,
  //       }
  //       fbMessage.push(message)
  //     });
  //     messages.value = fbMessage
  //   });

  //   //this is the method adding a new message
  //   //Ref allows to pull the users message from HTML
  //   const newMessageContent = ref('')
  //   const addMessage = () => {
  //     addDoc(collection(db, "Messages"), {
  //       text: newMessageContent.value,
  //       createdAt: serverTimestamp(),
  //       uid: user.uid,
        
  //     });
  //     console.log("Document written with ID: ", docRef.id);

  //   }

  // });


</script>

<template>
  <router-view />
</template>


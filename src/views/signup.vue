<template>
  <div class="container p-5">
    <div class="row">
      <div class="col-12">
        <input type="text" name="" v-model="email">
      </div>
      <div class="col-12">
        <input type="password" name="" v-model="pass">
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="register">Register</button>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="fblogin">FB login</button>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="signout">Sign Out</button>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="showuser">show User</button>
      </div>
    </div>
  </div>
</template>

<script>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, signOut } from "firebase/auth";
const fbprovider = new FacebookAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyAVY08td58QXmZwj1Is7cpKYP5YgbXZa48",
  authDomain: "mirko-accounts.firebaseapp.com",
  projectId: "mirko-accounts",
  storageBucket: "mirko-accounts.appspot.com",
  messagingSenderId: "271859160489",
  appId: "1:271859160489:web:a8196bfa684310bddb60b8",
  measurementId: "G-KWD5Z1YBF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default {
  name: 'thanks',
  data(){
    return{
      email: "",
      pass: ""
    }
  },
  methods:{
    register(){
      createUserWithEmailAndPassword(auth, this.email, this.pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
    },
    fblogin(){
      signInWithPopup(auth, fbprovider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //const credential = FacebookAuthProvider.credentialFromResult(result);
        //const accessToken = credential.accessToken;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
    },
    signout(){
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });
    },
    showuser(){
      console.log(auth.currentUser)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

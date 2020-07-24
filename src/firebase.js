import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA4ZZSuR_06jSB5VCcKlhrz6YmsV7hJE98",
    authDomain: "instagram-clone-c0967.firebaseapp.com",
    databaseURL: "https://instagram-clone-c0967.firebaseio.com",
    projectId: "instagram-clone-c0967",
    storageBucket: "instagram-clone-c0967.appspot.com",
    messagingSenderId: "728118065486",
    appId: "1:728118065486:web:4c276b366b8b226734861f",
    measurementId: "G-LS5CBQYNJD"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}
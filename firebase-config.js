const firebaseConfig = {
    apiKey: "AIzaSyDPGJ7OAb4riPJ4_9b7IJERtOB9zg2odkI",
    authDomain: "signup-login-b650e.firebaseapp.com",
    projectId: "signup-login-b650e",
    storageBucket: "signup-login-b650e.firebasestorage.app",
    messagingSenderId: "1016039448480",
    appId: "1:1016039448480:web:74827fe031d0b699de8ec5",
    measurementId: "G-FJY85F5B3L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth and Firestore initialization
const auth = firebase.auth();
const db = firebase.firestore();
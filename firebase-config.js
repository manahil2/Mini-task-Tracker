const firebaseConfig = {
  apiKey: "AIzaSyAi4bWWwLYl4N-ukHnaQwM_CoIbZ0GRJvc",
  authDomain: "signup-login-form-6ec76.firebaseapp.com",
  projectId: "signup-login-form-6ec76",
  storageBucket: "signup-login-form-6ec76.firebasestorage.app",
  messagingSenderId: "754484815409",
  appId: "1:754484815409:web:3fcac5421325482abed710",
  measurementId: "G-CYYTVC4KTE"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

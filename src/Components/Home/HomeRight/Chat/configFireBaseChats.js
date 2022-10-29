import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyA5KvHey5SPNHLCeZ2HFThniYm9bYLg6uk",
    authDomain: "chat-teste-ed7ce.firebaseapp.com",
    projectId: "chat-teste-ed7ce",
    storageBucket: "chat-teste-ed7ce.appspot.com",
    messagingSenderId: "461605538492",
    appId: "1:461605538492:web:d822d29e60da5d9ab99eb9",
    measurementId: "G-N1STMB8FWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db
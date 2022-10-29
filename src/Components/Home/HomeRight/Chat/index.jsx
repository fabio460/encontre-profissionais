import React from 'react'
import './chat.css'
import { initializeApp } from "firebase/app";

import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

export default function Chat() {
  const firebaseConfigChat = {
    apiKey: "AIzaSyA5KvHey5SPNHLCeZ2HFThniYm9bYLg6uk",
    authDomain: "chat-teste-ed7ce.firebaseapp.com",
    projectId: "chat-teste-ed7ce",
    storageBucket: "chat-teste-ed7ce.appspot.com",
    messagingSenderId: "461605538492",
    appId: "1:461605538492:web:d822d29e60da5d9ab99eb9",
    measurementId: "G-N1STMB8FWS"
  };
  const app = initializeApp(firebaseConfigChat);
  const db = getFirestore(app);
  
  const setMessage = async()=>{
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div >
      Chat legals
      <button onClick={setMessage}>inserir</button>
    </div>
  )
}

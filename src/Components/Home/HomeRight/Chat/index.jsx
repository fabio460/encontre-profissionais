import React from 'react'
import './chat.css'
import { initializeApp } from "firebase/app";

import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

export default function Chat() {


  
  const setMessage = async()=>{
 
  }
  return (
    <div >
      Chat legals
      <button onClick={setMessage}>inserir</button>
    </div>
  )
}

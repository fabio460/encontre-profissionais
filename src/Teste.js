import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from '@mui/material';

export default function Teste() {
    const app = initializeApp(firebaseConfig);
    const [Image, setImage] = useState('')
    const [arquivo, setUrl] = useState()
    const storage = getStorage();
    useEffect(()=>{
      if(arquivo){
        setImage(URL.createObjectURL(arquivo))
      }
    },[arquivo])
    const upload = ()=>{
      console.log(process.env.REACT_APP_T)
     try {
      const storageRef = ref(storage, 'minha foto');

  
      uploadBytes(storageRef, arquivo).then(() => {
          getDownloadURL(storageRef)
          .then((url) => {
            console.log(url)
          })
          .catch((error) => {
            console.log(error)
          });
      });

     } catch (error) {
      console.log(error)
     }
    }
    
  return (
    <div style={{display:'flex', flexDirection:'column',width:"300px",padding:'20px',alignItems:'center'}}>
        <input type='file' onChange={e=>setUrl(e.target.files[0])}/>
        <Button variant='contained' onClick={upload}>enviar</Button>
        <img src={Image} style={{width:'100px'}}/>
    </div>
  )
}

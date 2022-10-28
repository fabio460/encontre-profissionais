import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from '@mui/material';

export default function Teste() {
    initializeApp(firebaseConfig);
    const [Image, setImage] = useState('')
    const [arquivo, setUrl] = useState()
    const storage = getStorage();
    useEffect(()=>{
      if(arquivo){
        setImage(URL.createObjectURL(arquivo))
        console.log(arquivo.name)
      }
    },[arquivo])


    function RamdomString() {
      let chars = 'abcdefghijlmnopqrstuvxz'
      let arrChars = chars.split('')
      let ramdom = ''
      arrChars.forEach(() => {
        ramdom += chars[Math.ceil(Math.random()*arrChars.length)]
      });
       
      return ramdom
    }


     
    const upload = ()=>{
      const storageRef = ref(storage,RamdomString() +"_"+ arquivo.name);  
      uploadBytes(storageRef, arquivo).then(() => {
        getDownloadURL(storageRef)
        .then((url) => {
          console.log(url)
        })
      });

    }

    const deletarImg = ()=>{
      const desertRef = ref(storage, 'cuflhtndvepjzqflvdmpqvuneymar.jfif');
      deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log('deletado ')
      }).catch((error) => {
        console.log(error)
        // Uh-oh, an error occurred!
      });
    }
    
  return (
    <div style={{display:'flex', flexDirection:'column',width:"300px",padding:'20px',alignItems:'center'}}>
        <input type='file' onChange={e=>setUrl(e.target.files[0])}/>
        <Button variant='contained' onClick={upload}>enviar</Button>
        <img src={Image} style={{width:'100px'}}/>

        <Button variant='outlined' onClick={deletarImg}>deletar imagem</Button>
    </div>
  )
}

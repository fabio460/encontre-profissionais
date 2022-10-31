import React,{useEffect, useState} from 'react'
import './chat.css'
import { collection, doc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"; 

import { useSelector } from 'react-redux';
import firebaseConfig from './configFireBaseChats';
import { initializeApp } from 'firebase/app';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
export default function Chat() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


  var userLogged = JSON.parse(localStorage.getItem('userLogged')||'null')  
  const userSelected = useSelector(state=>state.FunctionsRedcer.getUsuariosReducer) 
  const [Mensagem, setMensagem] = useState('')
  const [Mensagens, setMensagens] = useState([])
  
  const setChat = async()=>{
      const querySnapshot = await getDocs(query(collection(db, "chat"),orderBy('id')));
      const quant = querySnapshot.size
      let id=0
      // se quant = 0 e porque a lista esta vazia, logo o seu id vai ser 0. Se não, vou percorrer pelo maior id e incrementar 
      if(quant === 0){      
        setDoc(doc(db, "chat", '0'), {
          id:0,
          emissor:userLogged.nome,
          receptor:userSelected.nome,
          emailEmissor:userLogged.email,
          emailReceptor:userSelected.email,
          mensagem:Mensagem,
        })  
      }else{
       querySnapshot.forEach(elem=>{
          if (elem.data().id >= id) {
            id = elem.data().id
          }
       }) 
       setDoc(doc(db, "chat", (id + 1).toString()), {
        id:id+1,
        emissor:userLogged.nome,
        receptor:userSelected.nome,
        emailEmissor:userLogged.email,
        emailReceptor:userSelected.email,
        mensagem:Mensagem,
        
      }) 
      }
     setMensagem('')
  }

  useEffect(()=>{
    async function getMensagensFirebase() {
      const q = query(collection(db, "chat"),orderBy('id'));
      onSnapshot(q, (querySnapshot) => {  
          let aux = []  
          querySnapshot.forEach((doc) => {
              aux.push(doc.data()) 
          });
          let mensageFilter = aux.filter((elem,key)=>{
            if ( 
               elem.emailEmissor === userLogged.email && elem.emailReceptor === userSelected.email
               ||
               elem.emailReceptor === userLogged.email && elem.emailEmissor === userSelected.email
               ) {
              return elem
            }
          })
         
          setMensagens(mensageFilter.reverse());   
      });
    }
    
    getMensagensFirebase()
   
  },[userSelected,db])

  const setChatOnKeyUp = (event)=>{
    if(event.code === "Enter" || event.code === "NumpadEnter"){
      setChat()
    }
  }
 // document.querySelector('.chatBody').scrollTo(0,10000000000)
  return (
    <div >
      <div className='chatBody'>
      {Mensagens.map(e=>{
        return <div className='chatOut'>
          <div className={userLogged.email === e.emailEmissor ? "emissor":"receptor"}>
             {e.emissor} - {e.mensagem}
          </div>
        </div>
      })}

      </div>
      <div className='chatInput'>
        
        <input className='inputSearchChat' onKeyUp={setChatOnKeyUp} onChange={e=>setMensagem(e.target.value)} value={Mensagem}/>
        <IconButton onClick={setChat}  color="primary"><NearMeIcon/></IconButton>
        
      </div>
    </div>
  )
}

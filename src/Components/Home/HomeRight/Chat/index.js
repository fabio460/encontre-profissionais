import React,{useEffect, useState} from 'react'
import './chat.css'
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore"; 
import {colorBackGround,initialsAvatar} from '../../../../utils'
import { useSelector } from 'react-redux';
import firebaseConfig from './configFireBaseChats';
import { initializeApp } from 'firebase/app';
import IconButton from '@mui/material/IconButton';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Chat() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userLoggedReducer = useSelector((state)=>state.UserLoggedReducer.userLogged)
 const userSelectedReducer = useSelector(state=>state.FunctionsRedcer.getUsuariosReducer) 
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
        if (Mensagem !== '') {
          setDoc(doc(db, "chat", '0'), {
            id:0,
            emissor:userLogged.nome,
            receptor:userSelected.nome,
            emailEmissor:userLogged.email,
            emailReceptor:userSelected.email,
            mensagem:Mensagem,
            lida:"true",
            hora: (
              new Date().getHours() < 10 ?
                "0"+ new Date().getHours():
                new Date().getHours()
              ).toString()
              +":"+ 
              (new Date().getMinutes() < 10 ?
              "0"+ new Date().getMinutes():
              new Date().getMinutes()
              ).toString()
          })  
        }
      }else{
         if (Mensagem !== '') {
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
              lida:"true",
              hora: (
                new Date().getHours() < 10 ?
                  "0"+ new Date().getHours():
                  new Date().getHours()
                ).toString()
                +":"+ 
                (new Date().getMinutes() < 10 ?
                "0"+ new Date().getMinutes():
                new Date().getMinutes()
                ).toString()
            })
         } 
      }
     setMensagem('')
  }


  const deleteMensage = (idDocument)=>{
    deleteDoc(doc(db, "chat", idDocument.toString()));
  }

  
  useEffect(()=>{
    async function getMensagensFirebase() {
      const q = query(collection(db, "chat"),orderBy('id'));
      onSnapshot(q, (querySnapshot) => {  
          let aux = []  
          querySnapshot.forEach((doc) => {
              aux.push(doc.data()) 
              if (doc.data().lida) {
                //console.log( doc.data())
                let msg = doc.data()
                document.querySelectorAll('.lida').forEach(e=>{  
                  if (e.id === msg.emailEmissor ) {
                    //console.log(e.id)
                   // e.innerHTML=msg.lida
                    e.value=msg.lida
                  }
                })
              }
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
 
  return (
    <div >
      <div className='appBarChat'>
         <Avatar 
            sx={{marginRight:"10px",bgcolor:'#1976d2'}} 
            src={userSelectedReducer.imagemPerfil}
          >
            {initialsAvatar(userSelectedReducer.nome)}
          </Avatar>
         <div className='appBarChatElements'>
            <div className='appBarChatTitle'>{userSelectedReducer.nome}</div>
            <div className='appBarChatItemProfissao'>{userSelectedReducer.profissao}</div>
         </div>
      </div>
      <div className='chatBody'>
          
          {Mensagens.map(e=>{
            return <div className='chatOut'>
                {userLogged.email === e.emailEmissor ? 
                  <div className='emissor' >
                    <div className='emissorAvatar'>
                      
                      <Avatar 
                        src={userLoggedReducer.imagemPerfil}
                        sx={{bgcolor:'#1976d2'}}    
                      >
                          {initialsAvatar(userLoggedReducer.nome)}
                      </Avatar>
                    </div>
                    <div>
                      <div style={{display:'flex',alignItems:'center'}}>
                        <div className='emissorMensage'>{e.mensagem} </div>
                        <span onClick={()=>deleteMensage(e.id)}
                            style={{cursor:'pointer',marginLeft:"0px",marginRight:'0px'}}
                          >
                            <IconButton>
                                <DeleteIcon color='error' sx={{width:'18px',height:'18px'}}/>
                            </IconButton>
                        </span>
                        
                      </div>
                      <div className='emissorHora'>{e.hora && (e.hora).toString()}</div>
                    </div>
                  </div>:

                  <div className='receptor' >
                    <div>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <span onClick={()=>deleteMensage(e.id)}
                                    style={{marginLeft:"0px",marginRight:'0px',color:"black"}}
                                  >
                                    <IconButton>
                                      <DeleteIcon color='error' sx={{width:'18px',height:'18px'}}/>
                                    </IconButton>
                              </span> 
                              <div className='receptorMensage'> {e.mensagem}</div>
                        </div>
                        <div className='receptorHora'>{e.hora && (e.hora).toString()}</div>
                    </div>
                    <div className='receptorAvatar'>
                      
                      <Avatar 
                        src={userSelectedReducer.imagemPerfil}  
                        sx={{bgcolor:'#1976d2'}} 
                      >
                        {initialsAvatar(userSelectedReducer.nome)}
                      </Avatar>
                    </div>
                  </div>
                }
            </div>
          })}

      </div>
      <div className='chatInput'>
           <div className='chatInputContent' >
              <input className='inputSearchChat'  onKeyUp={setChatOnKeyUp} onChange={e=>setMensagem(e.target.value)} value={Mensagem}/>
              <IconButton onClick={setChat}  color="primary"><NearMeIcon/></IconButton>
           </div>
      </div>
    </div>
  )
}

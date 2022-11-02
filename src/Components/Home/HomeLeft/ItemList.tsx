import React,{useEffect,useState,useRef} from 'react'
import { listType } from '../../../types'
import Avatar from '@mui/material/Avatar'
import { backgoundAppBar, colorBackGround, initialsAvatar, ramdomColors } from '../../../utils'
import {useDispatch, useSelector} from 'react-redux'
import ListItemButton from '@mui/material/ListItemButton';
import { collection, query, where, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../HomeRight/Chat/configFireBaseChats'
interface PropsType {
    elem:listType,
    index:number,
    
}

export default function ListItens({elem,index}:PropsType) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const dispatch = useDispatch()
  var user = JSON.parse(localStorage.getItem('userLogged')||'null') 
  const getIdUsers = ()=>{
      dispatch({
        type:'functions',
        payload:{
          getUsuariosReducer:elem,
          toRoll:true,
          index:index        
        }
      })
      if (user) {
        const q = query(collection(db, "chat"),
           where("emailEmissor", "==", elem.email),
           where("lida", "==", "true"),
           where("emailReceptor","==",user.email),
        );
        onSnapshot(q,async (querySnapshot) => {
         const cities:Object[] = [];
         querySnapshot.forEach((document) => {
             const cityRef = doc(db, 'chat', (document.data().id).toString());
              updateDoc(cityRef, {
                 lida: "false"
             });
         });
       });
      }
      
  }
  const selectIndex = useSelector<any,number>(state=>state.FunctionsRedcer.index) 
   
  return(
    <ListItemButton selected={selectIndex === index && true} onClick={getIdUsers} className='ListItens' id={index.toString()}>
      <Avatar src={elem.imagemPerfil} sx={{bgcolor:ramdomColors(),marginRight:'10px'}} >{initialsAvatar(elem.nome)}</Avatar>
      <div>
         <div>{elem.nome}</div>
         <div style={{color:'grey',fontSize:'13px'}}>{elem.profissao}</div>
         <div style={{color:'grey',fontSize:'13px'}}>{elem.bairro}</div>
      </div>
      <div className='lida' id={elem.email}></div>
    </ListItemButton>
  )
}

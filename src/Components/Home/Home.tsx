import React,{useState,useEffect} from 'react'
import './home.css'
import AppBar from './Appbar/AppBar'
import HomeLeft from './HomeLeft/HomeLeft'
import HomeRight from './HomeRight/HomeRight'
import {useDispatch, useSelector} from 'react-redux'
import { apiBase } from '../../utils'
import { listType } from '../../types'
import Chat from './HomeRight/Chat'
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, onSnapshot, query, where } from "firebase/firestore"; 
import firebaseConfig from './HomeRight/Chat/configFireBaseChats'
export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // esta função rola a tela no mobile, intercalando os layouts homeleft e homeright controlada pelo reducer 
  const toRoll = useSelector<any,boolean>(state=>state.FunctionsRedcer.toRoll)
  var user:listType = JSON.parse(localStorage.getItem('userLogged')||'null')  
  const dispatch = useDispatch()

  const [VisibleChat, setVisibleChat] = useState(true)
  
  useEffect(()=>{
    if (user) {
      const formdata = new FormData()
      formdata.append('email',user.email)
      fetch(apiBase+'getUsuarioPorEmail',{
        method:'post',
        body:formdata
      }).then(res=>res.json()).then(res=>{
          dispatch({
            type:'userLogged',
            payload:{userLogged:res[0]}
          })
      })

    onSnapshot(query(collection(db,"chat"),
      where("lida","==","true"),
      where("emailReceptor","==",user.email),
      // where("emailEmissor","==",e.email)
      ), (doc) => {
      let aux:Object[] = []  
      doc.forEach(elem=>{
          aux.push(elem.data())
      })
      dispatch({
        type:'msgRecebidas',
        payload:{msgRecebidas:aux}
      })
    });
    }
    
  },[])

  interface typeMensagensRecebidas{
    MensagensRecebidasReducer:{
      msgRecebidas:Object[]
    }
 }
//  const mensagensRecebidas = useSelector((state:typeMensagensRecebidas)=>state.MensagensRecebidasReducer.msgRecebidas)
//  console.log(mensagensRecebidas)


  return (
    <div className='home'>
      <div>{}</div>
      <div className='AppBar'> <AppBar/></div> 
      <div className='homeMain'>
         <div className={`homeLeft ${toRoll && 'rollHomeLeft'}`}>
            <HomeLeft />
          </div>
         <div className={`homeRight ${toRoll && 'rollHomeRight'}`} >
            {VisibleChat ? <HomeRight setVisibleChat={setVisibleChat}/>:  <Chat setVisibleChat={setVisibleChat}/>}
           
         </div>
      </div>
    </div>
  )
}

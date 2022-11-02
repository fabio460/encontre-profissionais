import React,{useState,useEffect} from 'react'
import './home.css'
import AppBar from './Appbar/AppBar'
import HomeLeft from './HomeLeft/HomeLeft'
import HomeRight from './HomeRight/HomeRight'
import {useDispatch, useSelector} from 'react-redux'
import { apiBase } from '../../utils'
import { listType } from '../../types'

export default function Home() {
  
  // esta função rola a tela no mobile, intercalando os layouts homeleft e homeright controlada pelo reducer 
  const toRoll = useSelector<any,boolean>(state=>state.FunctionsRedcer.toRoll)
  var user:listType = JSON.parse(localStorage.getItem('userLogged')||'null')  
  const dispatch = useDispatch()


  
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
    }

  },[])

  return (
    <div className='home'>
      <div>{}</div>
      <div className='AppBar'> <AppBar/></div> 
      <div className='homeMain'>
         <div className={`homeLeft ${toRoll && 'rollHomeLeft'}`}>
            <HomeLeft />
          </div>
         <div className={`homeRight ${toRoll && 'rollHomeRight'}`} >
            <HomeRight/>
         </div>
      </div>
    </div>
  )
}

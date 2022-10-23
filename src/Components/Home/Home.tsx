import React,{useState} from 'react'
import './home.css'
import AppBar from './Appbar/AppBar'
import HomeLeft from './HomeLeft/HomeLeft'
import HomeRight from './HomeRight/HomeRight'
import {useSelector} from 'react-redux'
export default function Home() {
  
  // esta função rola a tela no mobile, intercalando os layouts homeleft e homeright controlada pelo reducer 
  const toRoll = useSelector<any,boolean>(state=>state.FunctionsRedcer.toRoll)
  return (
    <div className='home'>
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

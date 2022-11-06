import React from 'react'
import {Avatar} from '@mui/material'
import MenuItensMobile from './MenuItensMobile'
import { useSelector } from 'react-redux'
export default function AppBarMobile() {
  interface typeReducerInputVisible{
    AppBarVisibleReducer:{
      inputVisible:boolean
    }
  }
  const inputVisible = useSelector((state:typeReducerInputVisible)=>state.AppBarVisibleReducer.inputVisible)
  
  return (
    <div className='homeAppBarMobile' >
       <div className='homeAppBarLeft'>
            <Avatar 
              sx={{margin:"4px 10px 4px 0px"}}
              src={'https://i.pinimg.com/236x/37/a5/2c/37a52cb19aabbff43eb7346dc71a68ab.jpg'}>
            </Avatar>
            <span style={{color:'black',fontSize:'25px',fontWeight:'bolder'}}>Bicos FS </span>  
       </div>
       
       <div className='homeAppBarRight'>
          
          <MenuItensMobile/>
       </div>
    </div>
  )
}

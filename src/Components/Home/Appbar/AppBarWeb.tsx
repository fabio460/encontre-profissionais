import React from 'react'
import {Avatar} from '@mui/material'
import MenuItensWeb from './MenuItensWeb';
import AppBarInputSearch from './AppBarInputSearch';
export default function AppBarWeb() {
  return (
    <div className='homeAppBarWeb'>
        <div className='homeAppBarLeft'>
            <Avatar 
              sx={{marginRight:"10px"}}
              src={'https://i.pinimg.com/236x/37/a5/2c/37a52cb19aabbff43eb7346dc71a68ab.jpg'}>
            </Avatar>
            <span style={{color:'black',fontSize:'25px',fontWeight:'bolder'}}>Bicos FS </span>  
            {/* <div className='inputSearch'>
               <AppBarInputSearch/>
            </div> */}
        </div>
        <div className='homeAppBarRight'>
           <MenuItensWeb/>
        </div>
    </div>
  )
}

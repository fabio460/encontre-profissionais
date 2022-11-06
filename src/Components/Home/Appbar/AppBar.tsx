import React from 'react'
import './AppBar.css'
import AppBarWeb from './AppBarWeb';
import AppBarMobile from './AppBarMobile';
import { backgoundAppBar, colorTextAbbBar } from '../../../utils';
import { useSelector } from 'react-redux';
export default function AppBar() {

  return (
    <div className='homeAppBar ' style={{background:backgoundAppBar,color:colorTextAbbBar}}>
          <AppBarWeb/>
          <AppBarMobile/>  
    </div>
  )
}




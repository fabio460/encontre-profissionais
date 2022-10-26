import React from 'react'

import {
    BrowserRouter,
    Route,
    Routes
 } from 'react-router-dom'
 import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>}/>
    </Routes>
 </BrowserRouter>
  )
}

import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import imagemLogin from '../../../src/images/login.jpg'

export default function NoLoggedComponent() {
    const navigate = useNavigate()
  return (
    <div>
        <div className='homeLeftImgLogin'>
            <img style={{width:'200px',height:'200px'}} src={imagemLogin}/>
            <h3>Precisa estar logado </h3>
            <Button variant='contained' onClick={()=>navigate('/login')}>login</Button>
        </div>  
    </div>
  )
}

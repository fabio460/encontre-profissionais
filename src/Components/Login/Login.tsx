import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { apiBase } from '../../utils'
import Button from '@mui/material/Button';
import './login.css'
export default function Login() {

  const [email, setEmail] = useState<string>('')  
  const [senha, setSenha] = useState<string>('') 
  const [error, seterror] = useState(false)
  const navigate = useNavigate()
  const logar = ()=>{
    const formdata = new FormData()
    formdata.append('email',email)
    formdata.append('senha',senha)  
    fetch(apiBase+'jwt',{
      method:'post',
      body:formdata
    }).then(res=>res.json()).then(res=>{
      localStorage.setItem('userLogged',JSON.stringify(res.usuario))
      seterror(false)
      navigate('/')
    })
    seterror(true)
  }
  return (
    <div className='loginBody'>
       <TextField
         id="outlined-basic" 
         label="email"
         variant="outlined"
         onChange={e=>setEmail(e.target.value)}
         type='email'
         sx={{margin:'10px'}} 
         error={error}
        />
       <TextField 
         id="outlined-basic" 
         label="senha" 
         variant="outlined" 
         onChange={e=>setSenha(e.target.value)}
         type='password'
         sx={{margin:'10px'}} 
         error={error}
        />
        {error&&
          <div style={{color:'red',margin:'0px 10px'}}>usuario ou senha inválidos</div>
        }
       <Button onClick={logar}>logar</Button>
    </div>
  )
}

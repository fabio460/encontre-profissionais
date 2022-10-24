import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { apiBase } from '../../utils'
import Button from '@mui/material/Button';
import './login.css'
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
export default function Login() {

  const [email, setEmail] = useState<string>('')  
  const [senha, setSenha] = useState<string>('') 
  const [error, seterror] = useState(false)
  const [passwordVisible, setpasswordVisible] = useState(true)
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const logar = ()=>{
    setloading(true)
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
        setloading(false)
    }).catch(res=>{
      seterror(true)
      setloading(false)
    })

  }
  return (
    <div className='loginBody'>
       <div className='loginLeft'>
          
       </div>
       <div className='loginRight'>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
           
              <img width={'150px'} height='150px' src='https://ksarquitetos.com.br/wp-content/uploads/2014/12/user.png'/>
        
            {/* <PersonIcon sx={{width:'70px',height:'70px'}}/> */}
            <h1>Login</h1>
          </div>
          <TextField
            id="outlined-basic" 
            label="email"
            variant="outlined"
            onChange={e=>setEmail(e.target.value)}
            type='email'
            sx={{margin:'10px opx',color:'white'}} 
            error={error}
            size='small'
            />
           
            <div className='inputPassword'>
                <TextField 
                  id="outlined-basic" 
                  label="senha" 
                  onChange={e=>setSenha(e.target.value)}
                  type={passwordVisible ? 'password' : "text"}
                  sx={{margin:'10px 0px',width:"100%"}} 
                  error={error}
                  size='small'
                />
                <IconButton sx={{marginLeft:"-40px"}} aria-label='exemple' onClick={()=>setpasswordVisible(!passwordVisible)}>
                  <RemoveRedEyeIcon/>
                </IconButton>
            </div>
            {error&&
              <div style={{color:'red',margin:'0px 10px'}}>usuario ou senha inválidos</div>
            }
          <Button 
              variant='contained' 
              onClick={logar} 
              disabled={loading ? true : false}
            >{loading ? <CircularProgress sx={{color:'white',height:"25px",width:'25px'}} size='small'/> : 'Logar'}
          </Button>
          
       </div>
    </div>
  )
}

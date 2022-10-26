import React,{useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';

interface typeObj{
    Nome:string,
    Email:string,
    Senha:string,
    ConfirSenha:string,
    setNome:any,
    setEmail:any,
    setSenha:any,
    setConfirSenha:any,

}
export default function FormDadosPessoais({
    Nome,
    Email,
    Senha,
    ConfirSenha,
    setNome,
    setEmail,
    setSenha,
    setConfirSenha
    }:typeObj) {

  return (
    <div>
        <TextField
            value={Nome}
            id="outlined-basic" 
            label="Nome"
            variant="outlined"
            onChange={e=>setNome(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <div id='validName' style={{display:'none',color:'red',marginLeft:'5px',marginBottom:'10px'}}>compo nulo</div>
        <TextField
            value={Email}
            id="outlined-basic" 
            label="email"
            variant="outlined"
            onChange={e=>setEmail(e.target.value)}
            type='email'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />

        <TextField
            value={Senha}
            id="outlined-basic" 
            label="nome"
            variant="outlined"
            onChange={(e)=>setSenha(e.target.value)}
            type='password'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <TextField
            value={ConfirSenha}
            id="outlined-basic" 
            label="senha"
            variant="outlined"
            onChange={(e)=>setConfirSenha(e.target.value)}
            type='password'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
       
    </div>
  )
}

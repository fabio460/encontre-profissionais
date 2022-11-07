import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { Statement } from 'typescript';


interface tepeForm{
    Cep:string,
    Estado:string,
    Cidade:string,
    Bairro:string,
    Rua:string,
    Logradouro:string,
    Complemento:string,
    CepInvalid:boolean,
    setCep:FunctionStringCallback,
    setEstado:FunctionStringCallback,
    setCidade:FunctionStringCallback,
    setBairro:FunctionStringCallback,
    setLogradouro:FunctionStringCallback,
    setRua:FunctionStringCallback,
    setComplemento:FunctionStringCallback,
}
export default function FormEndereco({
    Cep,
    Estado,
    Cidade,
    Bairro,
    Rua,
    Logradouro,
    Complemento,
    setCep,
    setEstado,
    setCidade,
    setBairro,
    setLogradouro,
    setRua,
    setComplemento,
    CepInvalid
}:tepeForm) {
 

  
  return (
    <div>
        <TextField
            value={Cep}
            id="outlined-basic" 
            label="Cep"
            variant="outlined"
            onChange={e=>setCep(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
            error={CepInvalid && true}
        />
        {CepInvalid && <div style={{color:'#d32f2f',marginLeft:'20px'}}>cep inválido</div>}
        <TextField
            value={Estado}
            id="outlined-basic" 
            label="UF"
            variant="outlined"
            onChange={e=>setEstado(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />

        <TextField
            id="outlined-basic" 
            label="Cidade"
            value={Cidade}
            variant="outlined"
            onChange={(e)=>setCidade(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <TextField
            id="outlined-basic" 
            label="Bairro"
            value={Bairro}
            variant="outlined"
            onChange={(e)=>setBairro(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <TextField
            id="outlined-basic" 
            label="Rua"
            value={Rua}
            variant="outlined"
            onChange={(e)=>setRua(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <TextField
            id="outlined-basic" 
            label="Numero"
            value={Logradouro}
            variant="outlined"
            onChange={(e)=>setLogradouro(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />

        <TextField
            id="outlined-basic" 
            label="Complemento"
            value={Complemento}
            variant="outlined"
            onChange={e=>setComplemento(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />

    </div>
  )
}

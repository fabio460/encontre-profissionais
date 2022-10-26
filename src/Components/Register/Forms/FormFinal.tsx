import { TextField } from '@mui/material'
import React from 'react'

interface typeObj{
  Profissao:string,
  OutrasHabilidades:string,
  ObservacoesFinais:string,

  setProfissao:FunctionStringCallback,
  setOutrasHabilidades:FunctionStringCallback,
  setObservacoesFinais:FunctionStringCallback,
}
export default function FormFinal({
  Profissao,
  setProfissao,
  OutrasHabilidades,
  setOutrasHabilidades,
  ObservacoesFinais,
  setObservacoesFinais

}:typeObj) {
  return (
    <div>
       <TextField
            value={Profissao}
            id="outlined-basic" 
            label="Profissão"
            variant="outlined"
            onChange={e=>setProfissao(e.target.value)}
            type='text'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
        <div id='validName' style={{display:'none',color:'red',marginLeft:'5px',marginBottom:'10px'}}>compo nulo</div>
        <TextField
            value={OutrasHabilidades}
            id="outlined-basic" 
            label="OutrasHabilidades"
            variant="outlined"
            onChange={e=>setOutrasHabilidades(e.target.value)}
            type='email'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />

        <TextField
            value={ObservacoesFinais}
            id="outlined-basic" 
            label="Observacôes finais"
            variant="outlined"
            onChange={(e)=>setObservacoesFinais(e.target.value)}
            type='password'
            sx={{margin:'5px 0px',color:'white',width:'100%'}} 
            size='small'
        />
    </div>
  )
}

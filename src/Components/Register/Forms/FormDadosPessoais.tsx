import React,{useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import { colorsLayout, initialsAvatar } from '../../../utils';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
interface typeObj{
    Nome:string,
    Email:string,
    Senha:string,
    ConfirSenha:string,
    setNome:any,
    setEmail:any,
    setSenha:any,
    setConfirSenha:any,
    setImagemPerfil:any,
    ImagemPerfil:any
}
export default function FormDadosPessoais({
    Nome,
    Email,
    Senha,
    ConfirSenha,
    setNome,
    setEmail,
    setSenha,
    setConfirSenha,
    setImagemPerfil,
    ImagemPerfil
    }:typeObj) {

    
    const [SrcImagemPerfil, setSrcImagemPerfil] = useState('')
    useEffect(() => {
        if(ImagemPerfil){
            setSrcImagemPerfil(URL.createObjectURL(ImagemPerfil))
        }
       
    }, [ImagemPerfil])
    
  return (
    <div>

        <div className='avatarPerfi'>
            <IconButton color="primary" aria-label="upload picture" component="label" >
                <input hidden accept="image/*" type="file" 
                    onChange={(e:any)=>setImagemPerfil(e.target.files[0])}
                />
                <div className='textoMensagemDeFundoAvatarAtualizar'>
                    <div> Adicione uma imagem</div>
                    <CameraAltIcon/>
                </div>
                <Avatar 
                    src={SrcImagemPerfil || ''}
                    sx={{width:'170px',height:'170px',fontSize:'70px',bgcolor:colorsLayout}}
                    >{initialsAvatar(Nome)}
                </Avatar>
            </IconButton>
        </div>
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

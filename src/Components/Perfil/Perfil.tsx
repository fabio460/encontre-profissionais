import React,{useState,useEffect} from 'react'
import { listType } from '../../types'
import NoLoggedComponent from '../NoLoggedComponent/NoLoggedComponent'
import Avatar from '@mui/material/Avatar'
import './perfil.css'
import { apiBase, colorBackGround, colorsLayout, initialsAvatar } from '../../utils'
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StreetviewIcon from '@mui/icons-material/Streetview';
import CallIcon from '@mui/icons-material/Call';
import Diversity2 from '@mui/icons-material/Diversity2'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
export default function Perfil() {
    var user:listType = JSON.parse(localStorage.getItem('userLogged')||'null') 
    const [userLogged,setuserLoggedApi] = useState<listType>()

    useEffect(() => {
        const formdata = new FormData()
        if (user) {
          formdata.append('email',user.email)
          fetch(apiBase+'getUsuarioPorEmail',{
            method:'post',
            body:formdata
          }).then(res=>res.json()).then(res=>{
              setuserLoggedApi(res[0])
          })
        }
    }, [user])

    const tamavatar = '180px'
    const dispatch = useDispatch()
    const update = ()=>{
        dispatch({
            type:'btnUpdate',
            payload:{btnUpdate:true}
        })
    }
  return (

    <div className='perfil'>
        {
            userLogged?
            <div>
              <div className='avatarPerfi'>
                <Avatar 
                    src={userLogged.imagemPerfil}
                    sx={{width:tamavatar,height:tamavatar,fontSize:'70px',bgcolor:colorsLayout}}  
                    >{initialsAvatar(userLogged.nome)}
                </Avatar>
              </div>
              <h1 className='tituloPerfil'>{userLogged.nome}</h1>
              <div className='profissaoPerfil'>{userLogged.profissao}</div>

              <div className='buttonsPerfil'>
                <Button onClick={update} variant="contained" color="primary" sx={{marginRight:'40px',borderRadius:'30px'}}>
                    atualizar
                </Button>
                <Button variant="outlined" color="error" sx={{borderRadius:'30px'}}>
                    deletar conta
                </Button>  
              </div>  

              <div className='perfilItems' style={{background:colorBackGround}}>
                <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.email}
                    <Avatar><EmailIcon/></Avatar>
                </div>
                <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.telefone}
                    <Avatar><CallIcon/></Avatar>
                </div>
              </div>

              <div className='perfilItems' style={{background:colorBackGround}}>
             
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.rua}, nº {userLogged.logradouro && userLogged.logradouro} {userLogged.complemento && userLogged.complemento}
                    <Avatar><StreetviewIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.bairro}
                    <Avatar><LocationCityIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.cidade} - {userLogged.estado}
                    <Avatar ><ApartmentIcon/></Avatar>
                  </div>
              </div>

              <div className='perfilItems' style={{background:colorBackGround}}>
              <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged.profissao}
                    <Avatar><EngineeringIcon/></Avatar>
                  </div>
                    {  userLogged.outrasHabilidades &&
                      <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                          {userLogged.outrasHabilidades}
                          <Avatar><Diversity2/></Avatar>
                      </div>
                    }
                    { userLogged.observacoesFinais &&
                        <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                          {userLogged.observacoesFinais}
                          <Avatar><Diversity2/></Avatar>
                        </div>
                    }
              </div>
      
            </div>:
            <div><NoLoggedComponent/></div>
        }
    </div>
  )
}

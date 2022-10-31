import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { listType } from '../../../types'
import { colorsLayout, colorTextAbbBar } from '../../../utils'
import { initialsAvatar } from '../../../utils'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ChatIcon from '@mui/icons-material/Chat';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StreetviewIcon from '@mui/icons-material/Streetview';
import CallIcon from '@mui/icons-material/Call';
import Diversity2 from '@mui/icons-material/Diversity2'
import imagemUsers from '../../../images/users2.png'
import Fab from '@mui/material/Fab';
import Chat from './Chat'
export default function HomeRight() {
  const dispatch = useDispatch()

  const voltar = ()=>{
    dispatch({
      type:'functions',
      payload:{
        getUsuariosReducer:{},
        toRoll:false        
      }
    })
  }
  const users = useSelector<any,listType>(state=>state.FunctionsRedcer.getUsuariosReducer)
  const tamAvatar = "150px"
  const tamAvatar2 = "100px"

  const [VisibleChat, setVisibleChat] = useState(false)
  const handleVisibleChat = ()=>{
    setVisibleChat(!VisibleChat)
  }

  return (
    <div>
      <div className='homeRightButtonReturn'>
        <Button onClick={voltar} >voltar</Button>
      </div>
      { users._id ?  
         <div className='homeRightContainer' >
            <div className='homeRightHeader' style={{background:colorsLayout,color:colorTextAbbBar}}>
              <h1 className='homeRightTitle'>{users.nome}</h1>
              <div className='homeRightAvatar'>
                  <Avatar src={users.imagemPerfil}
                    sx={{width:tamAvatar,height:tamAvatar,fontSize:'70px',bgcolor:'',border:'solid 3px white'}} 
                  >{initialsAvatar(users.nome)}</Avatar>
              </div>
            </div>
            <div className='homeRightBody'>
              <div className='homeRightItems'>
                  <PersonIcon sx={{width:tamAvatar2,height:tamAvatar2, color:colorsLayout}}/>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.email}
                    <Avatar><EmailIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.telefone}
                    <Avatar><CallIcon/></Avatar>
                  </div>
              </div>
              <div className='homeRightItems'>
                  <LocationCityIcon sx={{width:tamAvatar2,height:tamAvatar2, color:colorsLayout}}/>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.rua}, nº {users.logradouro} {users.complemento && users.complemento}
                    <Avatar><StreetviewIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.bairro}
                    <Avatar><LocationCityIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.cidade} - {users.estado}
                    <Avatar ><ApartmentIcon/></Avatar>
                  </div>
         
              </div>
              <div className='homeRightItems'>
                  <HomeWorkIcon sx={{width:tamAvatar2,height:tamAvatar2, color:colorsLayout}}/>
          
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {users.profissao}
                    <Avatar><EngineeringIcon/></Avatar>
                  </div>
                    {  users.outrasHabilidades &&
                      <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                          {users.outrasHabilidades}
                          <Avatar><Diversity2/></Avatar>
                      </div>
                    }
                    { users.observacoesFinais &&
                        <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                          {users.observacoesFinais}
                          <Avatar><Diversity2/></Avatar>
                        </div>
                    }
              </div>
            </div>
            <div className='chatContainer' >
              <div className='chatBtn'>
                <Fab color='primary' onClick={handleVisibleChat}><ChatIcon/></Fab>
              </div>
              <div className={VisibleChat ? 'chat visibleChat' : 'chat'}><Chat/></div>
             
            </div>
         </div>
         :
         <div className='homeRightEmpty'>
            <h1>Nenhum profissional selecionado!</h1>
            <img src={imagemUsers}/>
   
         </div>
      }
      
    </div>
  )
}

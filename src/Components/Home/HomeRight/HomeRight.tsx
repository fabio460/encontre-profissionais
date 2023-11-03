import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { listType } from '../../../types'
import { colorsLayout, colorTextAbbBar } from '../../../utils'
import { initialsAvatar } from '../../../utils'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
import ChatIcon from '@mui/icons-material/Chat';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom'
interface typeFunction{
  setVisibleChat:any
}
export default function HomeRight({setVisibleChat}:typeFunction) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const voltar = ()=>{
    dispatch({
      type:'functions',
      payload:{
        getUsuariosReducer:{},
        toRoll:false        
      }
    })
  }

  var userLogged:listType = JSON.parse(localStorage.getItem('userLogged')||'null') 
  const users = useSelector<any,listType>(state=>state.FunctionsRedcer.getUsuariosReducer)
  const tamAvatar = "150px"
  const tamAvatar2 = "100px"

  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      { users?._id ?  
      
         <div className='homeRightContainer' >
            <div className='homeRightHeader' style={{background:colorsLayout,color:colorTextAbbBar}}>
              <div className='btnReturMensage'>
                 {userLogged && 
                   userLogged?.email !== users?.email &&
                   <IconButton onClick={()=>setVisibleChat(false)}><ArrowForwardIosIcon sx={{color:'white'}}/></IconButton>
                  }
              </div>
              <div className='btnReturMensageMobile' style={{justifyContent:'space-between',width:'100%'}}>
                  <div >
                    <IconButton onClick={voltar}><ArrowBackIosNew sx={{color:'white',margin:'10px 0px 0px -10px'}}/></IconButton>
                  </div>
                  <div  style={{display:'flex',justifyContent:'flex-end'}}>
                    {userLogged &&
                      userLogged?.email !== users?.email && 
                      <IconButton onClick={()=>setVisibleChat(false)}><ArrowForwardIosIcon sx={{color:'white',margin:'10px -8px 0px auto'}}/></IconButton>
                    }
                  </div>
              </div>
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
                    {users?.email}
                    <Avatar><EmailIcon/></Avatar>
                  </div>
                  {users.telefone && <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                      {users.telefone}
                      <Avatar><CallIcon/></Avatar>
                    </div>
                  }
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    {userLogged  ?
                      userLogged?.email !== users?.email &&
                      <Button variant='outlined' onClick={()=>setVisibleChat(false)}>mensagem</Button>:
                      <div>
                        <Button variant="outlined" onClick={handleClickOpen} >
                            mensagem
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Ops!!!  Voçe não esta logado!"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Você precisa estar logado para enviar mensagens
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={()=>navigate('/login')}>Login</Button>
                            <Button onClick={handleClose} autoFocus>
                              Fechar
                            </Button>
                          </DialogActions>
                        </Dialog>
                     </div>
                    }
                    {userLogged?.email !== users?.email && <Avatar><ChatIcon/></Avatar>}
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
            {/* {userLogged && <div className='chatContainer' >
              <div className='chatBtn'>
                <div style={{textAlign:"center"}}>Chat</div>
                <Fab color='primary' onClick={handleVisibleChat}><ChatIcon/></Fab>
              </div>
              <div className={VisibleChat ? 'chat visibleChat' : 'chat'}><Chat/></div>
            </div>} */}
            
         </div>
         :
         <div className='homeRightEmpty'>
            <h1 style={{color:'grey'}}>Nenhum profissional selecionado!</h1>
            <img src={imagemUsers}/>
   
         </div>
      }
      
    </div>
  )
}

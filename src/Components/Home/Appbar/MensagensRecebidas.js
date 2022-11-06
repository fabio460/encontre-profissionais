import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { apiBase } from '../../../utils';
export default function MensagensRecebidas({marginLeft,Close}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch()
  const mensagensRecebidas = useSelector(state=>state.MensagensRecebidasReducer.msgRecebidas)
  const getUserMensage=async(Email)=>{

    const formdataEmail = new FormData()
    formdataEmail.append('email',Email)
    const usuarioExistente =await fetch(apiBase+'getUsuarioPorEmail',{
        method:'post',
        body:formdataEmail
    }).then(res=>res.json()).catch(res=> null)
    dispatch({
      type:'functions',
      payload:{
        getUsuariosReducer:usuarioExistente[0],
        toRoll:true,
        index:0        
      }
    })
    Close()
  }
  // let aux = []
  // mensagensRecebidas.forEach(e=>{
  //   aux.push(e.emissor)
  //   aux = aux.sort()
  // })
  // console.log(aux)
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center',marginLeft }}>
   
        <Tooltip title="Voçê tem mensagens recebidas" >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}

          >
        
            <Badge badgeContent={mensagensRecebidas.length} color="primary">
               <NotificationsNoneIcon color="action" />
           </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {mensagensRecebidas.map((elem,key)=>{
            return <div>
                <MenuItem onClick={()=> getUserMensage(elem.emailEmissor)}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    {elem.emissor}
                </MenuItem>
            </div> 
        })}
       
      </Menu>
    </React.Fragment>
  );
}

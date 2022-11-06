import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AppBarInputSearch from './AppBarInputSearch';
import { listType } from '../../../types';
import { apiBase, colorsLayout, initialsAvatar } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MensagensRecebidas from './MensagensRecebidas';
import Typography from '@mui/material/Typography';
export default function MenuItensMobile() {
  var userLogged:listType = JSON.parse(localStorage.getItem('userLogged')||'null')   
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deslogar = ()=>{
    localStorage.removeItem('userLogged')
    window.location.reload()
  }
  const navigate = useNavigate()
  const logar = ()=>{
    navigate('/login')
  }

  const [UserLoggedApi, setUserLoggedApi] = React.useState({
    nome:'',
    imagemPerfil:''
  })
  useEffect(() => {
    if (userLogged) {
      const formdata = new FormData()
      formdata.append('email',userLogged.email)
      fetch(apiBase+'getUsuarioPorEmail',{
        method:'post',
        body:formdata
      })
      .then(res=>res.json())
      .then(res=>{
        setUserLoggedApi(res[0])
      })
    }
  }, [])
  
  
  const dispatch = useDispatch()
  const getIdUsers = ()=>{
      dispatch({
        type:'functions',
        payload:{
          getUsuariosReducer:userLogged,
          toRoll:true,
          index:0        
        }
      })
      handleClose()
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
              <MenuIcon sx={{width:'35px',height:'35px'}}/>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
    
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
        <MenuItem onClick={getIdUsers}>
            <Avatar src={UserLoggedApi?.imagemPerfil} sx={{ width: 40, height: 40,bgcolor:colorsLayout  }}>
              {userLogged && initialsAvatar(UserLoggedApi.nome)}
            </Avatar>
            {userLogged ?  UserLoggedApi?.nome : "Usuario"}
        </MenuItem>
        {userLogged && 
          <MenuItem >
            <Avatar /> Minha conta
          </MenuItem>}
        <Divider />
        <MenuItem>
          <ListItemIcon>
             <MensagensRecebidas marginLeft={-3} Close={handleClose}/>
          </ListItemIcon>
          Notificações
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        {!localStorage.getItem('userLogged')?
          <MenuItem onClick={logar}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            logar
          </MenuItem>:
            <MenuItem onClick={deslogar}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              deslogar
            </MenuItem>
        }
   
      </Menu>
    </React.Fragment>
  );
}

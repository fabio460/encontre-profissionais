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
import {  useNavigate } from 'react-router-dom';
import { apiBase, colorsLayout, initialsAvatar } from '../../../utils';
import { listType } from '../../../types';

export default function MenuItensWeb() {
  interface typeLocalStotage{
    userLogged:listType
  }
  var userLogged:listType = JSON.parse(localStorage.getItem('userLogged')||'null')  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
  const logar = ()=>{
    navigate('/login')
  }
  const deslogar = ()=>{
    localStorage.removeItem('userLogged')
    window.location.reload()
  }

  const [UserLoggedApi, setUserLoggedApi] = React.useState({
    nome:'',
    imagemPerfil:''
  })
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
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={UserLoggedApi?.imagemPerfil} sx={{ width: 40, height: 40,bgcolor:colorsLayout  }}>
              {UserLoggedApi &&initialsAvatar(UserLoggedApi?.nome)}
            </Avatar>
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
        <MenuItem>
            <Avatar src={userLogged?.imagemPerfil} sx={{ width: 40, height: 40}}>
              {UserLoggedApi && initialsAvatar(UserLoggedApi?.nome)}
            </Avatar>
            {userLogged ?  UserLoggedApi?.nome : "Usuario"}
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
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

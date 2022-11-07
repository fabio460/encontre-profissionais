import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AppBarInputSearch from '../Appbar/AppBarInputSearch';
import { colorBackGround, colorsLayout } from '../../../utils';

import UsersList from './UsersList';

import { useNavigate } from 'react-router-dom';
import UsersListNearToYou from './UserListNearToYou';
import Perfil from '../../Perfil/Perfil';
import NoLoggedComponent from '../../NoLoggedComponent/NoLoggedComponent';
import PerfilUpdate from '../../Perfil/PerfilUpdate';
import { useSelector } from 'react-redux';


import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '../HomeRight/Chat/configFireBaseChats';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function HomeLeft() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const btnUpdate = useSelector(state=>state.BtnUpdateReducer.btnUpdate)
  const userSelected = useSelector(state=>state.FunctionsRedcer.getUsuariosReducer) 
  var user = JSON.parse(localStorage.getItem('userLogged')||'null') 
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [lido,setLido]= useState()
  const inputVisible = useSelector((state)=>state.AppBarVisibleReducer.inputVisible)
  
  const BoxStyle ={
    bgcolor: 'background.paper',
    width: '100%',
    position: 'relative',
    minHeight: '100%',
    borderRadius:'5px',
    transitions:'0.5s',
    
    "@media (max-width:750px)":{
      position:inputVisible ? 'relative' : 'fixed',
      top:0,
      transitions:'0.5s',
    }
  }

  const AppBarStyle ={
    bgcolor:colorsLayout,
    boxShadow:'none',
    color:'white',
    transitions:'0.5s',
    
    "@media (max-width:750px)":{
      display:inputVisible ? "block" : 'none',
      transitions:'0.5s',
    }
    
  }

  const TabPanelStyle = {
    height:'calc(100vh - 252px)',
   
    "@media (max-width:750px)":{
      height:!inputVisible && 'calc(100vh - 52px)',
      
    }
  }
  return (
    <Box
      sx={BoxStyle}
    >
      
      <div style={{background:colorsLayout,borderTopRightRadius:'20px',borderTopLeftRadius:'20px'}}>
         <AppBarInputSearch/>
      </div>
      <AppBar position="static"  sx={AppBarStyle}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="inherit"
          textColor="inherit"
          variant="fullWidth"
          aria-label="action tabs example"
          
        >
          <Tab label="perto de mim" {...a11yProps(0)} />
          <Tab label="todos" {...a11yProps(1)} />
          <Tab label="perfil" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className='SwipeableViews'
      >
        <TabPanel value={value} index={0} dir={theme.direction}
            className='TabPainel'
            sx={TabPanelStyle}
        > 
          {
            localStorage.getItem('userLogged')?
            <div>
              <UsersListNearToYou/>
            </div>:
            <NoLoggedComponent/>
          }
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}
           className='TabPainel'
           sx={TabPanelStyle}
        >
          
           <UsersList/>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}
            className='TabPainel'
            sx={TabPanelStyle}
        >
           
            {btnUpdate?
               <PerfilUpdate/>:
               <Perfil/>  
            }
        </TabPanel>

      </SwipeableViews>
   
    </Box>
  );
}

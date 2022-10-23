import React,{useEffect,useState,useRef} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getUsuarios } from '../../../utils';

import { listType } from '../../../types';
import ItemList from './ItemList';
import { useSelector } from 'react-redux';

export default function UsersListNearToYou() {
    const [loading, setLoading] = useState(true)
    const [list, setlist] = useState<listType[]>([])   
    var userLogged:listType = JSON.parse(localStorage.getItem('userLogged')||'null')  

    useEffect(() => {
      fetch(getUsuarios)
      .then(res=>res.json())
      .then(res=>{
          let auxList = res.filter((e:listType)=>{
            if (e.bairro === userLogged.bairro && e._id !== userLogged._id) {
                return e
            }
          })
          setlist(auxList)
          setLoading(false)
      })
    
    }, [])
   
  return (
    <div>
        {loading && 
            <Box sx={{ display: 'flex',justifyContent:'center',marginTop:'80px'}}>
              <CircularProgress />
            </Box>
        }
        
        {list.map((elem,key)=>{
            return <ItemList elem={elem} index={key} />
        })}
    
    </div>
  )
}

import React,{useEffect,useState,useRef} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getUsuarios } from '../../../utils';

import { } from '../../../types';
import ItemList from './ItemList';
import { useSelector } from 'react-redux';
import Search from '@mui/icons-material/Search';

export default function UsersListNearToYou() {
    const [loading, setLoading] = useState(true)
    const [list, setlist] = useState([])   
    var userLogged = JSON.parse(localStorage.getItem('userLogged')||'null')  
    let filterByName = []   
    const search = useSelector((state)=>state.inputSearchReducer.value)
    useEffect(() => {
      fetch(getUsuarios)
      .then(res=>res.json())
      .then(res=>{
          
          let auxList = res.filter((e)=>{
            if (e.bairro === userLogged.bairro && e._id !== userLogged._id) {
                return e
            }
          })
  
          setlist(auxList)
          setLoading(false)
      })

      
    }, [])
    
    let primeiraLetraMaiouscula = search.slice(0,1).toLocaleUpperCase()
    let primeiraLetraMinuscula = search.slice(0,1).toLocaleLowerCase()
    let restante = search.slice(1)
    let maiusculo = primeiraLetraMaiouscula+restante
    let minusculo = primeiraLetraMinuscula+restante

    filterByName = list.filter((item)=>{
      if  (
           (item.nome.includes(maiusculo) ||item.profissao.includes(maiusculo)) ||
           (item.nome.includes(minusculo) ||item.profissao.includes(minusculo))
          ) 
      {
        return item
      }
    })
    
  return (
    <div>
        {loading && 
            <Box sx={{ display: 'flex',justifyContent:'center',marginTop:'80px'}}>
              <CircularProgress />
            </Box>
        }
        
        {filterByName.map((elem,key)=>{
            return <ItemList elem={elem} index={key} />
        })}
    
    </div>
  )
}

import React,{useEffect,useState,useRef} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getUsuarios } from '../../../utils';

import { listType } from '../../../types';
import ItemList from './ItemList';
import { useSelector } from 'react-redux';

export default function UsersList() {
    const [loading, setLoading] = useState(true)
    const [list, setlist] = useState<listType[]>([])   
    var userLogged:listType = JSON.parse(localStorage.getItem('userLogged')||'null')  
    let filterByName = []
    const search = useSelector((state:{inputSearchReducer:any,value:string})=>state.inputSearchReducer.value)
    useEffect(() => {
      fetch(getUsuarios)
      .then(res=>res.json())
      .then(res=>{
        let aux = []
        if (userLogged) {
          aux = res.filter((elem:listType)=>{
            if(elem.email !== userLogged.email){
              return res
            }
          })
          
          setlist(aux.reverse())        
        }else{         
          setlist(res.reverse())
        }
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

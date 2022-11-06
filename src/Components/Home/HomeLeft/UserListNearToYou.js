import React,{useEffect,useState,useRef} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getUsuarios } from '../../../utils';
import Pagination from '@mui/material/Pagination';
import { } from '../../../types';
import ItemList from './ItemList';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { collection, query, where, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function UsersListNearToYou() {
    const mensagensRecebidas = useSelector(state=>state.MensagensRecebidasReducer.msgRecebidas)
   
    const [loading, setLoading] = useState(true)
    const [list, setlist] = useState([])   
    const [totalList, settotalList] = useState([]) 
    var userLogged = JSON.parse(localStorage.getItem('userLogged')||'null')  
    let filterByName = []   
    const search = useSelector((state)=>state.inputSearchReducer.value)
    useEffect(() => {
      fetch(getUsuarios)
      .then(res=>res.json())
      .then(res=>{
          let auxList = res.filter((e,key)=>{
            if (e.bairro === userLogged.bairro && e._id !== userLogged._id) {
                return e
            }
          })
         
          setlist(auxList)
          setLoading(false)
      })

      fetch(getUsuarios)
      .then(res=>res.json())
      .then(res=>{
          let auxList = res.filter((e,key)=>{
            if (e.bairro === userLogged.bairro && e._id !== userLogged._id) {
                return e
            }
          })
         
          settotalList({users:auxList,msg:mensagensRecebidas})
          setLoading(false)
      })
    }, [])
    
    let primeiraLetraMaiouscula = search.slice(0,1).toLocaleUpperCase()
    let primeiraLetraMinuscula = search.slice(0,1).toLocaleLowerCase()
    let restante = search.slice(1)
    let maiusculo = primeiraLetraMaiouscula+restante
    let minusculo = primeiraLetraMinuscula+restante
 
    filterByName =list.filter((item)=>{
      if  (
           (item.nome.includes(maiusculo) ||item.profissao.includes(maiusculo)) ||
           (item.nome.includes(minusculo) ||item.profissao.includes(minusculo))
          ) 
      {
        return item
      }
    })


    const [valueRadio, setValue] = React.useState('5');
    const [page, setPage] = React.useState(1);
    const n = parseInt(valueRadio)
    let initial = page*n - n
    let final = page*n-1
  
    let countPage = Math.ceil(filterByName.length/n)
    const filterPages = filterByName.filter((e,key)=>{
      if (key >= initial && key <= final ) {
        return e
      }
    }) 
   const handleChange = (event, value) => {
    setPage(value);
   };

   useEffect(()=>{
     setPage(1)
   },[search])

    
   const handleChangeRadio = (event) => {
     setValue(event.target.value);
   };
    
   function handleVisiblePagination() {
      if (filterPages.length >= 5 ) {
        return true
      }else{
        if (page !== 1) {
          return true
        }else{
          return false
        }
      }
   }
   const inputVisible = useSelector((state)=>state.AppBarVisibleReducer.inputVisible)
  return (
    <div>
        {loading ? 
            <Box sx={{ display: 'flex',justifyContent:'center',marginTop:'80px'}}>
              <CircularProgress />
            </Box>:
            <div>
              {inputVisible &&  <FormControl sx={{width:'100%',display:'flex',justifyContent:"center"}}>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      
                    value={valueRadio}
                    onChange={handleChangeRadio}
                  >
                      <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',marginLeft:"9px"}}>
                      {list.length > 10 && <FormLabel id="demo-radio-buttons-group-label" sx={{width:"100%"}}>Intervalo da lista</FormLabel>}
                      {list.length > 10 && <FormControlLabel value={'5'} control={<Radio size='small'/>} label={<div style={{marginLeft:'-7px'}}>5</div>} />}
                      {list.length > 10 && <FormControlLabel value={'10'} control={<Radio size='small'/>} label={<div style={{marginLeft:'-7px'}}>10</div>} />}
                      {list.length > 15 && <FormControlLabel value={'15'} control={<Radio size='small'/>} label={<div style={{marginLeft:'-7px'}}>15</div>} />}
                      </div>
                  </RadioGroup>
                </FormControl>}
                { filterPages.length > 0 ? 
                    <div>
                      {filterPages.map((elem,key)=>{
                        let m =  mensagensRecebidas.filter(msg=>{
                              if (msg.emailEmissor === elem.email) {
                                return msg
                              }
                            })
                        return <ItemList elem={elem} index={key} mensagensRecebidas={m}/>
                      })}
                   </div>:
                   <div id='naoEncontrado' style={{textAlign:'center',marginTop:"60px",color:'gray'}}>Não encontrado! </div>
                }
                
                <div style={{display:'flex',justifyContent:"center",margin:'10px 0px'}}>
                   {handleVisiblePagination() && <Pagination count={countPage} page={page} onChange={handleChange} color='secondary'/>}
                </div>
            </div>
        }
             
    </div>
  )
}

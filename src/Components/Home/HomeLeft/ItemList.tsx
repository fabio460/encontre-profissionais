import React,{useEffect,useState} from 'react'
import { listType } from '../../../types'
import Avatar from '@mui/material/Avatar'
import { backgoundAppBar, colorBackGround, initialsAvatar, ramdomColors } from '../../../utils'
import {useDispatch, useSelector} from 'react-redux'
import ListItemButton from '@mui/material/ListItemButton';
interface PropsType {
    elem:listType,
    index:number,
    
}

export default function ListItens({elem,index}:PropsType) {
  const dispatch = useDispatch()
  const getIdUsers = ()=>{
      dispatch({
        type:'functions',
        payload:{
          getUsuariosReducer:elem,
          toRoll:true,
          index:index        
        }
      })
    
  }
  const selectIndex = useSelector<any,number>(state=>state.FunctionsRedcer.index) 
   
  return(
    <ListItemButton selected={selectIndex === index && true} onClick={getIdUsers} className='ListItens' id={index.toString()}>
      <Avatar src={elem.imagemPerfil} sx={{bgcolor:ramdomColors(),marginRight:'10px'}} >{initialsAvatar(elem.nome)}</Avatar>
      <div>
         <div>{elem.nome}</div>
         <div style={{color:'grey',fontSize:'13px'}}>{elem.profissao}</div>
         <div style={{color:'grey',fontSize:'13px'}}>{elem.bairro}</div>
      </div>
      <div className='lida' id={elem.email}></div>
    </ListItemButton>
  )
}

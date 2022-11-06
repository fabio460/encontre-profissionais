import React,{useState} from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { colorsLayout } from '../../../utils';
import { useDispatch } from 'react-redux';
export default function AppBarInputSearch() {
  const [Search, setSearch] = useState('')
  const dispatch = useDispatch()
  dispatch({
    type:'search',
    payload:{value:Search}
  })

  const inputHidden = ()=>{
    dispatch({
      type:'inputVisible',
      payload:{inputVisible:true}
    })
  }

  const inputVisible = ()=>{
    dispatch({
      type:'inputVisible',
      payload:{inputVisible:false}
    })
  }
  const inputBaseStyle ={  
    flex: 1,
    color:'white',
    width:"75%",
    m:"20px",
    "@media (max-width:750px)":{
      m:inputVisible && "0px 20px",
    }  
  }
  return (
    <div>
        <Paper sx={{boxShadow:'none',bgcolor:colorsLayout}}>
     
            <InputBase
                sx={inputBaseStyle}
                placeholder="Encontre usuarios ..."
                inputProps={{ 'aria-label': 'search google maps' }}
                value={Search}
                onChange={e=> setSearch(e.target.value)}
                onFocus={inputVisible}
                onBlur={inputHidden}
            />
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
            >
                <SearchIcon sx={{color:'white'}}/>
            </IconButton>   
        </Paper>
    </div>
  )
}

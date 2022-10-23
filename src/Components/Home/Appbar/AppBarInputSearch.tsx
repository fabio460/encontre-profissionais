import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { colorsLayout } from '../../../utils';
export default function AppBarInputSearch() {
  return (
    <div>
        <Paper sx={{boxShadow:'none',bgcolor:colorsLayout}}>
     
            <InputBase
                sx={{  flex: 1,color:'white',width:"75%",m:"20px" }}
                placeholder="Encontre usuarios ..."
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon sx={{color:'white'}}/>
            </IconButton>   
        </Paper>
    </div>
  )
}

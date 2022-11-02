import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);

  const n = 10
  let initial = page*n - n
  let final = page*n-1

   
   let list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
   console.log(list.length%6)
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={5} page={page} onChange={handleChange} color='secondary'/>
    </Stack>
  );
}

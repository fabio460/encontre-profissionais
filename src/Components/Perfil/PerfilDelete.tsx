import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { listType } from '../../types';
import { apiBase, getReferenciaImageFireSorage } from '../../utils';
import { deleteObject, getStorage, ref } from 'firebase/storage';

export default function PerfilDelete() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var user:listType = JSON.parse(localStorage.getItem('userLogged')||'null') 
  const deleteUser = ()=>{
    

    
     try {
      const formdata = new FormData()
      formdata.append('id',user._id)
      fetch(apiBase+'removerConta',{
        method:'delete',
        body:formdata
      }).then(res=>{
         alert('usuario deletado com sucesso')
      })

           let r = getReferenciaImageFireSorage(user.imagemPerfil) || null
           if (r) {
            console.log(r)
            const desertRef = ref(getStorage(),r);
            deleteObject(desertRef).then(() => {
                console.log('deletada a ref '+r)
   
              }).catch((error) => {
                console.log(error)
              });
           }

           localStorage.removeItem('userLogged')
           setTimeout(() => {
      
            window.location.reload()     
           }, 1000);
     } catch (error) {
       alert(error)
     }    
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color='error' sx={{borderRadius:'30px'}}>
        deletar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>voltar</Button>
          <Button onClick={deleteUser} autoFocus>
            deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

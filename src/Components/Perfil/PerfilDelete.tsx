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
    

    <div className=""></div>
     try {
          const formdata = new FormData()
          formdata.append('email',user.email)
          fetch(apiBase+'getUsuarioPorEmail',{
            method:'post',
            body:formdata
          })
          .then(res=>res.json())
          .then((res:any)=>{
            let r = getReferenciaImageFireSorage(res[0].imagemPerfil) || null
            console.log(r)
            if (r) {
            console.log(r)
            const desertRef = ref(getStorage(),r);
            deleteObject(desertRef).then(() => {
                console.log('deletada a ref '+r)

              }).catch((error) => {
                console.log(error)
              });
            }
          })
          formdata.append('id',user._id)
          fetch(apiBase+'removerConta',{
            method:'delete',
            body:formdata
          }).then(res=>{
            alert('usuario deletado com sucesso')
          })

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
          {"Você esta prestes a deletar sua conta"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Deseja realmente deletar sua conta? Se clicar em confirmar, não sera mais possível reverter 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>voltar</Button>
          <Button color='error' onClick={deleteUser} autoFocus>
            confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

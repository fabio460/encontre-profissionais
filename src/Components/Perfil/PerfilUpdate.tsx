import React, { useState,useEffect } from 'react'
import { listType } from '../../types'
import NoLoggedComponent from '../NoLoggedComponent/NoLoggedComponent'
import Avatar from '@mui/material/Avatar'
import './perfil.css'
import { apiBase, colorBackGround, colorsLayout, getReferenciaImageFireSorage, initialsAvatar } from '../../utils'
import EngineeringIcon from '@mui/icons-material/Engineering';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StreetviewIcon from '@mui/icons-material/Streetview';
import CallIcon from '@mui/icons-material/Call';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Diversity2 from '@mui/icons-material/Diversity2'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseConfig } from '../../firebaseConfig'
import { initializeApp } from 'firebase/app'

export default function PerfilUpdate() {
    initializeApp(firebaseConfig);
    const storage = getStorage();
    var user:listType = JSON.parse(localStorage.getItem('userLogged')||'null') 
    const [userLogged, setuserLoggedApi] = useState<listType>()
    
    const [Email, setEmail] = useState<string>('')
    const [Nome, setNome] = useState<string>('')
    const [Profissao, setProfissao] = useState<string>('')
    const [Rua, setRua] = useState<string>('')
    const [Cidade, setCidade] = useState<string>('')
    const [Estado, setEstado] = useState<string>('')
    const [Complemento, setComplemento] = useState<string>('')
    const [Logradouro, setLogradouro] = useState<string>('')
    const [OutrasHabilidades, setOutrasHabilidades] = useState<string>('')
    const [ObservacoesFinais, setObservacoesFinais] = useState<string>('')
    const [Bairro, setBairro] = useState<string>('')
    const [Telefone, setTelefone] = useState<string>('')
    const [ImagemPerfil, setImagemPerfil] = useState('')
    const [fileImagemPerfil, setFileImagemPerfil] = useState(null)

    const [SrcImagemPerfil, setSrcImagemPerfil] = useState('')
    const [User, setUser] = useState(null)
    useEffect(() => {


        // carregando os dados do usuario antes de atualizar
        if(fileImagemPerfil){
            setSrcImagemPerfil(URL.createObjectURL(fileImagemPerfil))
        }
        const formdata = new FormData()
        formdata.append('email',user.email)
        fetch(apiBase+'getUsuarioPorEmail',{
          method:'post',
          body:formdata
        }).then(res=>res.json()).then(res=>{
            setUser(res)
            setImagemPerfil(res[0].imagemPerfil)
            setEmail(res[0].email)
            setNome(res[0].nome)
            setEstado(res[0].estado)
            setCidade(res[0].cidade)
            setRua(res[0].rua)
            setBairro(res[0].bairro)
            setComplemento(res[0].complemento)
            setLogradouro(res[0].logradouro)
            setOutrasHabilidades(res[0].outrasHabilidades)
            setObservacoesFinais(res[0].observacoesFinais)
            setProfissao(res[0].profissao)
            setTelefone(res[0].telefone)
            setuserLoggedApi(res[0])
        })
    }, [fileImagemPerfil])
    
    const tamavatar = '180px'

    const dispatch = useDispatch()
    const cancelUpdate = ()=>{
        dispatch({
            type:'btnUpdate',
            payload:{btnUpdate:false}
        })
    }
    
    function RamdomString() {
        let chars = 'abcdefghijlmnopqrstuvxz'
        let arrChars = chars.split('')
        let ramdom = ''
        arrChars.forEach(() => {
          ramdom += chars[Math.ceil(Math.random()*(arrChars.length-1))]
        });
         
        return ramdom.toString()
      }

    const confirmUpdate = async()=>{
      
            let ramdomStringName = RamdomString()
            const storageRef = ref(storage, ramdomStringName);
    
            if (fileImagemPerfil) {
                uploadBytes(storageRef, fileImagemPerfil).then(() => {
                    getDownloadURL(storageRef)
                        .then((url) => {
                                const formdata = new FormData()
                                formdata.append('id',user._id)
                                formdata.append('imagemPerfil',url)
                                formdata.append('email',Email)
                                formdata.append('nome',Nome)
                                formdata.append('telefone',Telefone)
                                formdata.append('cidade',Cidade)
                                formdata.append('estado',Estado)
                                formdata.append('rua',Rua)
                                formdata.append('bairro',Bairro)
                                formdata.append('logradouro',Logradouro)
                                formdata.append('complemento',Complemento)
                                formdata.append('profissao',Profissao)
                                formdata.append('outrasHabilidades',OutrasHabilidades)
                                formdata.append('observacoesFinais',ObservacoesFinais)
                                if(Nome !== '' && Email !== '' ){

                                    
                                    fetch(apiBase+'updateUsuario',{
                                        method:'put',
                                        body:formdata
                                    })
                                    
                                    let r = getReferenciaImageFireSorage(ImagemPerfil) || null
                                   
                                   
                                    if (r) {
                                        console.log(r)
                                        const desertRef = ref(storage,r);
                                        deleteObject(desertRef).then(() => {
                                            console.log('deletada a ref '+r)
                                          }).catch((error) => {
                                            console.log(error)
                                          });
                                    }
                                    localStorage.setItem('userLogged',JSON.stringify(user))
                                    dispatch({
                                        type:'btnUpdate',
                                        payload:{btnUpdate:false}
                                    })
                                    
                                }
                                else{alert('campos não podem ser nulos')}
                        })
                });
            }else{
                const formdata = new FormData()
                formdata.append('id',user._id)
                formdata.append('email',Email)
                formdata.append('nome',Nome)
                formdata.append('telefone',Telefone)
                formdata.append('cidade',Cidade)
                formdata.append('estado',Estado)
                formdata.append('rua',Rua)
                formdata.append('bairro',Bairro)
                formdata.append('logradouro',Logradouro)
                formdata.append('complemento',Complemento)
                formdata.append('profissao',Profissao)
                formdata.append('outrasHabilidades',OutrasHabilidades)
                formdata.append('observacoesFinais',ObservacoesFinais)
                if(Nome !== '' && Email !== '' ){
                   setTimeout(() => {
                    fetch(apiBase+'updateUsuario',{
                        method:'put',
                        body:formdata
                    })
                    dispatch({
                        type:'btnUpdate',
                        payload:{btnUpdate:false}
                    })
                   }, 500);
                }
                else{alert('campos não podem ser nulos')}
            }
    }

  return (

    <div className='perfil'>
        {
            userLogged?
            <div>
              <div className='avatarPerfi'>
                    <IconButton color="primary" aria-label="upload picture" component="label" >
                        <input hidden accept="image/*" type="file" 
                           onChange={(e:any)=>setFileImagemPerfil(e.target.files[0])}
                        />
                        <div className='textoMensagemDeFundoAvatarAtualizar'>
                           
                           <div> Alterar imagem</div>
                           <CameraAltIcon/>
                        </div>
                        <Avatar 
                            src={SrcImagemPerfil === '' ? ImagemPerfil : SrcImagemPerfil}
                            sx={{width:tamavatar,height:tamavatar,fontSize:'70px',bgcolor:colorsLayout}}  
                            >{initialsAvatar(userLogged.nome)}
                        </Avatar>
                    </IconButton>
              </div>
              <h1 className='tituloPerfil'>{userLogged.nome}</h1>
              <div className='profissaoPerfil'>{userLogged.profissao}</div>

              <div className='buttonsPerfil'>
                <Button onClick={cancelUpdate} variant="outlined" color="primary" sx={{marginRight:'40px',borderRadius:'30px'}}>
                    cancelar
                </Button>
                <Button onClick={confirmUpdate} variant="contained" color="success" sx={{borderRadius:'30px'}}>
                    confirmar
                </Button>  
              </div>  

              <div className='perfilItems' style={{background:colorBackGround}}>
                <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                  
                    <TextField
                        id="standard-helperText"
                        label="Nome"
                        value={Nome}
                        variant="standard"
                        onChange={e=>setNome(e.target.value)}
                    />
                    <Avatar><EmailIcon/></Avatar>
                </div>
                <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                   
                    <TextField
                        id="standard-helperText"
                        label="Telefone"
                        defaultValue=   {userLogged.telefone}
                        variant="standard"
                        onChange={e=>setTelefone(e.target.value)}
                    />
                    <Avatar><CallIcon/></Avatar>
                </div>
              </div>

              <div className='perfilItems' style={{background:colorBackGround}}>
             
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    
                    <TextField
                        id="standard-helperText"
                        label="Rua"
                        defaultValue=   {userLogged.rua}
                        variant="standard"
                        onChange={e=>setRua(e.target.value)}
                    />
                    <TextField
                        id="standard-helperText"
                        label="Nº"
                        defaultValue=   {userLogged.logradouro && userLogged.logradouro}
                        variant="standard"
                        sx={{maxWidth:'35px',margin:'0px 5px'}}
                        onChange={e=>setLogradouro(e.target.value)}
                    />
                    <TextField
                        id="standard-helperText"
                        label="Comp"
                        defaultValue=   {userLogged.complemento && userLogged.complemento}
                        variant="standard"
                        sx={{maxWidth:'75px'}}
                        onChange={e=>setComplemento(e.target.value)}
                    />
                    <Avatar><StreetviewIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    <TextField
                        id="standard-helperText"
                        label="Bairro"
                        defaultValue=   {userLogged.bairro && userLogged.bairro}
                        variant="standard"
                        onChange={e=>setBairro(e.target.value)}
                    />
                    <Avatar><LocationCityIcon/></Avatar>
                  </div>
                  <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                    
                    <TextField
                        id="standard-helperText"
                        label="Cidade"
                        defaultValue=   {userLogged.cidade}
                        variant="standard"
                        onChange={e=>setCidade(e.target.value)}
                    />
                    <TextField
                        id="standard-helperText"
                        label="Estado"
                        defaultValue=   {userLogged.estado}
                        variant="standard"
                        sx={{maxWidth:'35px'}}
                        onChange={e=>setEstado(e.target.value)}
                    />
                    <Avatar ><ApartmentIcon/></Avatar>
                  </div>
              </div>

              <div className='perfilItems' style={{background:colorBackGround}}>
              <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                 
                    <TextField
                        id="standard-helperText"
                        label="Profissão"
                        defaultValue=   {userLogged.profissao}
                        variant="standard"
                        onChange={e=>setProfissao(e.target.value)}
                    />
                    <Avatar><EngineeringIcon/></Avatar>
                  </div>
                      <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                        <TextField
                            id="standard-helperText"
                            label="Outras habilidades"
                            defaultValue=   {userLogged.outrasHabilidades}
                            variant="standard"
                            onChange={e=>setOutrasHabilidades(e.target.value)}
                        />
                          <Avatar><Diversity2/></Avatar>
                      </div>
                        <div style={{marginBottom:"7px",display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}> 
                          <TextField
                                id="standard-helperText"
                                label="Observações finais"
                                defaultValue=   {userLogged.observacoesFinais}
                                variant="standard"
                                onChange={e=>setObservacoesFinais(e.target.value)}
                            />
                          <Avatar><Diversity2/></Avatar>
                        </div>

              </div>
      
            </div>:
            <div><NoLoggedComponent/></div>
        }
    </div>
  )
}

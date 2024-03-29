import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import "./register.css";
import FormDadosPessoais from './Forms/FormDadosPessoais';
import FormEndereco from './Forms/FormEndereco';
import FormFinal from './Forms/FormFinal';
import FormHeader from './FormHeader';
import { apiBase } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../Home/HomeRight/Chat/configFireBaseChats';


export default function Register() {
    initializeApp(firebaseConfig);
    const navigate = useNavigate()
    const [CepInvalid, setCepInvalid] = useState<boolean>(true)

    const [ImagemPerfil, setImagemPerfil] = useState(null)
    const [Nome, setNome] = useState<string>('')
    const [Email, setEmail] = useState<string>('')
    const [Senha, setSenha] = useState<string>('')
    const [ConfirSenha, setConfirSenha] = useState<string>('')
    

    const [Cep, setCep] = useState<string>('')
    const [Estado, setEstado] = useState<string>('')
    const [Cidade, setCidade] = useState<string>('')
    const [Bairro, setBairro] = useState<string>('')
    const [Rua, setRua] = useState<string>('')
    const [Logradouro, setLogradouro] = useState<string>('')
    const [Complemento, setComplemento] = useState<string>('')

    const [Profissao, setProfissao] = useState<string>('')
    const [Telefone, setTelefone] = useState<string>('')
    const [OutrasHabilidades, setOutrasHabilidades] = useState<string>('')
    const [ObservacoesFinais, setObservacoesFinais] = useState<string>('')
    const [urlImagemPerfil, setUrlImagemPerfil] = useState('')
    function RamdomString() {
        let chars = 'abcdefghijlmnopqrstuvxz'
        let arrChars = chars.split('')
        let ramdom = ''
        arrChars.forEach(() => {
          ramdom += chars[Math.ceil(Math.random()*(arrChars.length-1))]
        });
         
        return ramdom.toString()
      }
    const cadastrar = async()=>{
        const formdataEmail = new FormData()
        formdataEmail.append('email',Email)
        const usuarioExistente =await fetch(apiBase+'getUsuarioPorEmail',{
            method:'post',
            body:formdataEmail
        }).then(res=>res.json()).catch(res=> null)
        if (usuarioExistente[0]) {
            alert('ja existe este usuario')
        }else{

            let ramdomStringName = RamdomString()
            const formdata = new FormData()
            if (ImagemPerfil) {
                const storage = getStorage();
                const storageRef = ref(storage, ramdomStringName);
                
                // 'file' comes from the Blob or File API
                uploadBytes(storageRef, ImagemPerfil).then((snapshot) => {
                  getDownloadURL(storageRef).then(url=>{
                    formdata.append('imagemPerfil',url)
                    formdata.append('email',Email)
                    formdata.append('nome',Nome)
                    formdata.append('senha',Senha)
                    formdata.append('estado',Estado)
                    formdata.append('cidade',Cidade)
                    formdata.append('bairro',Bairro)
                    formdata.append('rua',Rua)
                    formdata.append('complemento',Complemento)
                    formdata.append('profissao',Profissao)
                    formdata.append('telefone',Telefone)
                    formdata.append('observacoesFinais',ObservacoesFinais)
                    formdata.append('outrasHabilidades',OutrasHabilidades)
                    fetch(apiBase+'setUsuario',{
                       method:'post',
                       body:formdata
                    }).then(res=>{
                        alert(`usuário(a) ${Nome} cadastrado(a) com sucesso`)
                        navigate('/login')
                    }).catch(res=>{alert('falha ao cadastrar, motivo: '+res)})
                  })
                });
            }else{
                formdata.append('imagemPerfil','')
                formdata.append('email',Email)
                formdata.append('nome',Nome)
                formdata.append('senha',Senha)
                formdata.append('estado',Estado)
                formdata.append('cidade',Cidade)
                formdata.append('bairro',Bairro)
                formdata.append('rua',Rua)
                formdata.append('complemento',Complemento)
                formdata.append('profissao',Profissao)
                formdata.append('telefone',Telefone)
                formdata.append('observacoesFinais',ObservacoesFinais)
                formdata.append('outrasHabilidades',OutrasHabilidades)
                fetch(apiBase+'setUsuario',{
                   method:'post',
                   body:formdata
                }).then(res=>{
                    alert(`usuário(a) ${Nome} cadastrado(a) com sucesso`)
                    navigate('/login')
                }).catch(res=>{alert('falha ao cadastrar, motivo: '+res)})
            }            
        }
       
        
    }

    const [key, setKey] = useState(1)



    const validaCep = (cep:string)=>{
        let urlApi = `https://viacep.com.br/ws/${cep}/json/`
        fetch(urlApi).then(res=> res.json())
           .then(res=>{
            setCidade(res.localidade)
            setBairro(res.bairro)
            setEstado(res.uf)
            setRua(res.logradouro)
            setComplemento(res.complemento)
            
            setCepInvalid(false)
           })
           .catch(()=> setCepInvalid(true))
    }
    useEffect(() => {
        validaCep(Cep)
    }, [Cep])

    const [validName, setvalidName] = useState(true)
    const [validEmail, setvalidEmail] = useState(true)
    const [validSenha, setvalidSenha] = useState(true)
    const [validSenhaNaoConfere, setvalidSenhaNaoConfere] = useState(true)
    const [validCep, setvalidCep] = useState(true)
    let emailValido = Email.search(/^[a-z]+(@){1}[a-z]+(.com)(.br)*$/)
    return (
        <div className='registerBody'>
            
            <div className='registerleft'></div>
            <div className='registerRight'>
                <div>
                    <Button onClick={()=> navigate('/')}>home</Button>
                </div>
                {key === 1  ?
                  <div className='forms'>
                    <div>
                        <div className='formsHeader'><FormHeader index={0}/></div>
                        <FormDadosPessoais
                            Nome={Nome}
                            Email={Email}
                            Senha={Senha}
                            ConfirSenha={ConfirSenha}
                            setNome={setNome}
                            setEmail={setEmail}
                            setSenha={setSenha}
                            setConfirSenha={setConfirSenha}  
                            setImagemPerfil={setImagemPerfil}
                            ImagemPerfil={ImagemPerfil}
                            validName={validName}
                            validEmail={validEmail}
                            validSenha={validSenha}
                            validSenhaNaoConfere={validSenhaNaoConfere}
                        />
                    </div>
                   
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div>
                            <Button variant="outlined" onClick={()=>navigate('/login')}>Login</Button>
                        </div>
                        <Button variant="outlined" onClick={()=>{
                            if (Nome !== '') {
                               if (Email !== '' && emailValido === 0) {
                                 if (Senha !== '') {
                                    if (Senha === ConfirSenha) {
                                        setKey(2) 
                                        setvalidSenhaNaoConfere(true)
                                    } else {
                                        setvalidSenhaNaoConfere(false)
                                    }
                                    setvalidSenha(true)
                                 } else {
                                    setvalidSenha(false)
                                 }
                                 setvalidEmail(true)
                               } else {
                                 setvalidEmail(false)
                               }
                               setvalidName(true)
                            }else{
                                setvalidName(false)
                            }
                            }}>proximo
                        </Button>
                    </div>
                  </div>:
                  key === 2  ?
                    <div className='forms'>
                        <div>
                            <div className='formsHeader'><FormHeader index={1}/></div>
                            <FormEndereco
                                Cep={Cep}
                                Estado={Estado}
                                Cidade={Cidade}
                                Bairro={Bairro}
                                Rua={Rua}
                                Logradouro={Logradouro}
                                Complemento={Complemento}
                                CepInvalid={CepInvalid}
                                setCep={setCep}
                                setEstado={setEstado}
                                setCidade={setCidade}
                                setBairro={setBairro}
                                setLogradouro={setLogradouro}
                                setRua={setRua}
                                setComplemento={setComplemento}
                            />
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <Button variant="outlined" onClick={()=>setKey(1)}>voltar</Button>
                            <Button variant="outlined" onClick={()=>{
                                
                                setTimeout(() => {
                                    if (Cep !== '' &&  !CepInvalid ){
                                        setKey(3) 
                                        setvalidCep(true)
                                    } else{
                                        setvalidCep(false)
                                    }
                                }, 200);
                                }}>proximo
                            </Button>
                        </div>
                    </div>:
                    <div className='forms'>
                        <div>
                            <div className='formsHeader'><FormHeader index={2}/></div>
                            <FormFinal
                                ObservacoesFinais={ObservacoesFinais}
                                OutrasHabilidades={OutrasHabilidades}
                                Profissao={Profissao}
                                setObservacoesFinais={setObservacoesFinais}
                                setOutrasHabilidades={setOutrasHabilidades}
                                setProfissao={setProfissao}
                                Telefone={Telefone}
                                setTelefone={setTelefone}
                            />
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <Button variant="outlined" onClick={()=> setKey(2)}>voltar</Button>
                            <Button variant="outlined" onClick={()=>{
                                if (Profissao !== '') {
                                    cadastrar()
                                    
                                }else{
                                    alert('campo profissão é obrigatório')
                                }
                                }}>Cadastrar
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

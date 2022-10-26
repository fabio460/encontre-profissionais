import React,{useState,useEffect} from 'react'
import "./register.css";
import FormDadosPessoais from './Forms/FormDadosPessoais';
import FormEndereco from './Forms/FormEndereco';
import FormFinal from './Forms/FormFinal';
import FormHeader from './FormHeader';
import { apiBase } from '../../utils';

export default function Register() {

    const [CepInvalid, setCepInvalid] = useState<boolean>(true)

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
    const [OutrasHabilidades, setOutrasHabilidades] = useState<string>('')
    const [ObservacoesFinais, setObservacoesFinais] = useState<string>('')
    
    const cadastrar = async()=>{
        const formdata = new FormData()
        formdata.append('email',Email)
        const usuarioExistente =await fetch(apiBase+'getUsuarioPorEmail',{
            method:'post',
            body:formdata
        }).then(res=>res.json()).catch(res=> null)
        if (usuarioExistente[0]) {
            console.log('ja existe este usuario')
        }else{
            console.log('usuario cadastrado com sucessos')
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
    return (
        <div className='registerBody'>
            
            <div className='registerleft'></div>
            <div className='registerRight'>

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
                        />
                    </div>
                   
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div></div>
                        <button onClick={()=>{
                            if (Nome !== '') {
                               if (Email !== '') {
                                 if (Senha !== '' && ConfirSenha !== '') {
                                    if (Senha === ConfirSenha) {
                                        setKey(2) 
                                    } else {
                                        alert('senhas não conferem')
                                    }
                                 } else {
                                    alert('campos senha esta nulo')
                                 }
                               } else {
                                 alert('email invalido')
                               }
                            }else{
                                alert('nome nulo')
                            }
                            }}>proximo
                        </button>
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
                            <button onClick={()=>setKey(1)}>voltar</button>
                            <button onClick={()=>{
                                
                                setTimeout(() => {
                                    if (Cep !== '' &&  !CepInvalid ){
                                        setKey(3) 
                                    } else{
                                        alert('cep invalido')
                                    }
                                }, 200);
                                }}>proximo
                            </button>
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
                            />
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <button onClick={()=> setKey(2)}>voltar</button>
                            <button onClick={()=>{
                                if (Profissao !== '') {
                                    cadastrar()
                                    setKey(1) 
                                }else{
                                    alert('campo profissão é obrigatório')
                                }
                                }}>Cadastrar
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

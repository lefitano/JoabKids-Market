 import Button from 'react-bootstrap/Button';
 import Form from 'react-bootstrap/Form';
 import { BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
 import {useState} from 'react';
 import {Link, useNavigate} from 'react-router-dom';
 import  '../css/Login.css';

    export default function Admin(){
        const [autenticado, setAutenticado] = useState(false)
        const  [email, setEmail] = useState('');
        const [senha, setSenha] = useState('');
        const [erro, setErro] = useState('');
        const [abaAtiva, setAbaAtiva] = useState('novo');

        const handleLogin = async(e) => {
            e.preventDefault();
            setErro('');
            if(!email || !senha){
                setErro("Preencha todos os campos!")
                return;
            }
            if(email === "admin@joabkids.com" && senha === "jadmin1990"){
                setAutenticado(true)
            }else{
                setErro("Email ou senha do admin incorretos!")
            }
        }
    }
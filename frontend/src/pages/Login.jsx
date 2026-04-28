import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  '../css/Login.css';


export default function Login(){
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErro('');
        if (!email || !senha){
            setErro('Preencha os campos');
            return;
        }
        navigate('/');
    }
    return(
        <div className="FormLogin">
            <div className="LoginCard">
                <h2 className='TiuloForm'>Login de Cliente</h2>
                {erro && <p className="ErroForm">{erro}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
                <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se agora!</Link></p>
            </div>
        </div>
      
    )
}
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Cadastro.css';


export default function Cadastro(){
    const[emailCadastro, setEmailCadastro] = useState('');
    const[nome, setNome] = useState('');
    const[senhaCadastro, setSenhaCadastro] = useState('');
    const[cep, setCep] = useState('');
    const[cidade, setCidade] = useState('');
    const[rua, setRua] = useState('');
    const[bairro, setBairro] = useState('');
    const[numero, setNumero] = useState('');
    const[numeroTelefone, setNumeroTel] = useState('');
    const[erroCadastro, setErroCadastro] = useState('');

    const handleRegister = async(e) => {
        e.preventDefault();
        setErroCadastro('');
        if(!emailCadastro || !senhaCadastro || !nome || !cep || !cidade || !rua ||
            !bairro || !numero || !numeroTelefone){
                setErroCadastro("Para realizar o cadastro, todos os campos devem ser preenchidos!");
                return;
            }
            navigate('/');
    }


    return(
        <>
        <div className="formCadastro">
            <div className="CadastroCard">
                <h2 className="TituloCadastro">Cadastre-se agora!</h2>

                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="nomeCadastro">
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome completo"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='FormEmailCadastro'>
                        <Form.Label>Email para cadastro</Form.Label>
                        <Form.Control type="email" value={emailCadastro} onChange={(e) => setEmailCadastro(e.target.value)} placeholder="Email de endereço válido"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='FormSenhaCadastro'>
                        <Form.Label>Senha para conta</Form.Label>
                        <Form.Control type="password" value={senhaCadastro} onChange={(e) => setSenhaCadastro(e.target.value)} placeholder="Senha para cadastro"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='cep'>
                        <Form.Label>Digite seu cep</Form.Label>
                        <Form.Control type="text" value={cep} onChange={(e)=> setCep(e.target.value)} placeholder="CEP"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='cidade'>
                        <Form.Label>Sua cidade</Form.Label>
                        <Form.Control type="text" value={cidade} onChange={(e)=> setCidade(e.target.value)} placeholder="Nome da sua cidade"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='rua'>
                        <Form.Label>Digite sua rua</Form.Label>
                        <Form.Control type="text" value={rua} onChange={(e)=> setRua(e.target.value)} placeholder="Nome da sua rua"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='bairro'>
                        <Form.Label>Digite seu bairro</Form.Label>
                        <Form.Control type="text" value={bairro} onChange={(e)=> setBairro(e.target.value)} placeholder="Nome do seu bairro"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='numero'>
                        <Form.Label>Digite o número</Form.Label>
                        <Form.Control type="text" value={numero} onChange={(e)=> setNumero(e.target.value)} placeholder="Numero da sua residência"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='numeroTelefone'>
                        <Form.Label>Digite seu número de celular com DDD</Form.Label>
                        <Form.Control type="tel" value={numeroTelefone} onChange={(e)=> setNumeroTel(e.target.value)} placeholder="Número para contato"></Form.Control>
                    </Form.Group> 
                    {erroCadastro && <p className="ErroFormCadastro">{erroCadastro}</p>}
                    <Button variant="primary" type="submit">
                        Cadastrar
                        </Button> 
                </Form>
                <p>Já tem uma conta? <Link to ="/login">Faça seu login!</Link></p>
                
            </div>
        </div>
        </>
    )
}
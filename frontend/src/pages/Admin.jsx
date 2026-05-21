import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';

import { BsEnvelope, BsLock, BsListCheck, BsStar, BsArrowRight, BsPersonCircle, BsClipboardData, BsPlusCircleFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import "../css/DashboardGerencia.css";
import FormNovoProduto from "../components/FormNovoProduto";
import GerenciarDestaques from "../components/GerenciarDestaques";

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("novo");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }
    if (email === "admin@joabkids.com" && senha === "jadmin1990") {
      setAutenticado(true);
    } else {
      setErro("Email ou senha do admin incorretos!");
    }
  };
  if(!autenticado){
  return (
    <div className="FormLogin">
      <div className="LoginCard">
        <h2 className="TituloForm mb-3">Login do ADMIN</h2>
        {erro && <p className="ErroForm">{erro}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Digite o email administrativo:</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder= "Email"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Digite a senha administrativa:</Form.Label>
            <Form.Control type="password" onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrar <BsArrowRight  className="mb-1"/>
          </Button>
        </Form>
      </div>
    </div>
  );
}
if(autenticado){
  return(
    
    <div className="PainelADM">
      <div className="admin-topbar">
        <BsClipboardData className="me-2"/>
        Painel Administrativo - Acesso Único - Não forneça os dados de acesso
      </div>
      <Navbar expand="lg" style={{backgroundColor:"#003235"}}>
      <Container style={{position: "relative"}}>
        <Navbar.Brand href="#home" className="Titulopainel">
          <BsPersonCircle className="me-2"/>Joab Kids
          <Badge bg= "warning" text = "dark" className="ms-2">ADM</Badge>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="admin-nav-center">
            <Button size="sm" className="botoes-nav" onClick ={() => setAbaAtiva('novo')}
            variant={abaAtiva === 'novo' ? 'light' : 'outline-light'}>
              <BsPlusCircleFill className="me-2"/>Novo produto
            </Button>
            <Button size="sm" className="botoes-nav" onClick ={() => setAbaAtiva('editar')}
            variant={abaAtiva === 'editar' ? 'light' : 'outline-light'}>
              <BsPencilSquare className="me-2"/>Editar Produto
            </Button>
            <Button size="sm" className="botoes-nav" onClick={() => setAbaAtiva('remover')}
            variant={abaAtiva === 'remover' ? 'light' : 'outline-light'}>
              <BsTrash className="me-2"/>Remover produto
            </Button>
            <Button size="sm" className="botoes-nav" onClick= {() => setAbaAtiva('alterardestaque')}
            variant={abaAtiva === 'alterardestaque' ? 'light' : 'outline-light'}>
              <BsStar className="me-2"/>Mostruário
            </Button>
            <Button size="sm" className="botoes-nav" onClick={() => setAbaAtiva('listarprodutos')}
            variant={abaAtiva === 'listarprodutos' ? 'light' : 'outline-light'}>
              <BsListCheck className="me-2"/>Listar produtos
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {abaAtiva === 'novo' && <FormNovoProduto />}
      {abaAtiva === 'editar' && <div className="painel-conteudo">Lista para editar produtos</div>}
      {abaAtiva === 'remover' && <div className="painel-conteudo">Lista para remover produtos</div>}
      {abaAtiva === 'alterardestaque' && <GerenciarDestaques/>}
      {abaAtiva === 'produtoscadastrados' && <div className="painel-conteudo">Lista de produtos já cadastrados</div>}
    </div>
    </div>
  )
}
}

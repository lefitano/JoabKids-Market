import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsEnvelope, BsLock, BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import "../css/DahsboardGerencia.css";

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
      <h2>Joab Kids</h2>
      <h2>Painel de Gerência </h2>
    </div>
  )
}
}

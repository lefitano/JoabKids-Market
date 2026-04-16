import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsBag, BsHouseDoor, BsGrid, BsPersonPlus, BsBoxArrowInRight} from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import tag from '../assets/JoabKidsTag.jpeg';
export default function Header(){
    return(
        <Navbar variant="dark" className="justify-content-center"style={{backgroundColor:"#003235"}}>
        <Container>
          <Navbar.Brand href="/"><img src={tag} alt = "Joab Kids" height="80" /></Navbar.Brand>
          <Nav className="mx-auto">
            <Button className="me-2" variant="outline-light" href="/">< BsHouseDoor className="me-1" />Página Inicial</Button>
            <Button className="me-2" variant="outline-light" href="/catalogo"><BsGrid className="me-1"/>Catálogo</Button>
            <Button  className="me-2" variant ="outline-light" href="/carrinho"><BsBag className="me-1"/>Carrinho</Button>
            <Button className="me-2" variant ="outline-light" href="/login"><BsBoxArrowInRight className="me-1"/>Entrar</Button>
            <Button variant="light" href="/cadastro"><BsPersonPlus  className="me-1"/>Cadastrar</Button>
          </Nav>
        </Container>
      </Navbar>
  );
}

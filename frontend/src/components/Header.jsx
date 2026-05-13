import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { BsCart3, BsHouseDoor, BsGrid, BsPersonPlus, BsBoxArrowInRight } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import tag from '../assets/JoabKidsTag.jpeg';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import '../css/Nav.css';

export default function Header() {
    const { itens } = useCarrinho();

    return (
        <Navbar variant="dark" className="justify-content-center" style={{ backgroundColor: "#003235" }}>
            <Container>
                <Navbar.Brand className="navbrand" as={Link} to="/">
                    <img src={tag} alt="Joab Kids" height="100" />Joab Kids - Shop
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <Button className="me-2" variant="outline-light" as={Link} to="/"><BsHouseDoor className="me-1" />Página Inicial</Button>
                    <Button className="me-2" variant="outline-light" as={Link} to="/catalogo"><BsGrid className="me-1" />Catálogo</Button>
                    <Button className="me-2" variant="outline-light" as={Link} to="/carrinho">
                        <BsCart3 className="me-1" />
                        Carrinho
                        {itens.length > 0 && (
                            <Badge bg="warning" text="dark" className="ms-1">{itens.length}</Badge>
                        )}
                    </Button>
                    <Button className="me-2" variant="outline-light" as={Link} to="/login"><BsBoxArrowInRight className="me-1" />Entrar</Button>
                    <Button variant="light" as={Link} to="/cadastro"><BsPersonPlus className="me-1" />Cadastrar</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

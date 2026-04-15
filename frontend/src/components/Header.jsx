import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsBag } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
// import logo from '../assets/joabkidslogo.jpeg';
import tag from '../assets/JoabKidsTag.jpeg';
export default function Header(){
    return(
        <Navbar variant="dark" style={{backgroundColor:"#003235"}}>
        <Container>
          <Navbar.Brand href="#JoabKidsHome"><img src={tag} alt = "Joab Kids" height="100"/></Navbar.Brand>
          <Nav className="me-auto">
            <Button className="me-2" variant="outline-light" href="#paginainicial"><BsBag BsTags className="me-1" />Página Inicial</Button>
            <Button variant="outline-light" href="#produtos"><BsTags className="me-1"/>Produtos</Button>
          </Nav>
        </Container>
      </Navbar>
  );
}

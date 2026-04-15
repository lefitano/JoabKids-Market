import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsBag } from "react-icons/bs";
import { BsTags } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
export default function Header(){
    return(
        <Navbar variant="dark" style={{backgroundColor:"#2a9d8f"}}>
        <Container>
          <Navbar.Brand className="btn btn-outline-light" href="#JoabKidsHome">Joab Kids</Navbar.Brand>
          <Nav className="me-auto">
            <Button className="me-2" variant="outline-light" href="#paginainicial"><BsBag/>Página Inicial</Button>
            <Button variant="outline-light" href="#produtos"><BsTags/>Produtos</Button>
          </Nav>
        </Container>
      </Navbar>
  );
}

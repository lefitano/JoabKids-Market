import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/Footer.css';
import { FaInstagram} from 'react-icons/fa';
import { BsSignpost2 } from "react-icons/bs";
export default function Footer(){
    return(
        <footer className="footer pt-4">
            <Container className="text-center">
                <Row>
                    <Col>
                        
                        <Button className="me-2 botao-instagram" href="https://instagram.com/joabkids" target='_blank'><FaInstagram className='me-1'/>@Joab Kids</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p className="pt-2" ><BsSignpost2 className="me-2"/>Rua Romeu Martins, 99 - Canindé, Ceará</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>&copy; 2026 Joab Kids</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
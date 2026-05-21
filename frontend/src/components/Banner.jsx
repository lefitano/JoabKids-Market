import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { BsBag, BsArrowRight } from 'react-icons/bs';
import { useProduto } from '../context/ProdutoContext';
import '../css/Banner.css';

export default function Banner() {
    const { produtos } = useProduto();
    const destaques = produtos.filter(p => p.destaque);

    const slides = [];
    for (let i = 0; i < destaques.length; i += 2) {
        slides.push(destaques.slice(i, i + 2));
    }

    return (
        <>
            <div className="banner-titulo">
                <Badge className="banner-badge mb-3">
                    <BsBag className="me-1" /> Novidades semanalmente
                </Badge>
                <h2>Moda Infantil e Juvenil com Estilo</h2>
                <p>Looks incríveis para os pequenos e os nem tão pequenos assim.</p>
                <a href="/catalogo" className="banner-link-catalogo">
                    Ver catálogo completo <BsArrowRight className="ms-1" />
                </a>
            </div>

            <Carousel className="carrossel-container py-2" interval={4000}>
                {slides.map((par, index) => (
                    <Carousel.Item key={index}>
                        <Row className="g-0">
                            {par.map((produto) => (
                                <Col key={produto.id}>
                                    <img
                                        className="d-block w-100 img-carrossel"
                                        src={produto.imagem}
                                        alt={produto.nome}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Carousel.Caption className="legenda-carrossel">
                            <h3>{par.map(p => p.nome).join(" & ")}</h3>
                            <h5 className="mensagem-fixa-carrossel  ">Tudo isso e muito mais!</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

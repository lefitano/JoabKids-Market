import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { BsBag, BsArrowRight } from 'react-icons/bs';
import ImagemMasculino1 from '../assets/ImagesMascBanner.jpeg';
import ImagemFeminino1 from '../assets/ImagesFeminBanner.jpeg';
import ImagemCalcado1 from '../assets/Calcado1Banner.jpeg';
import ImagemMasculino2 from '../assets/ImagesMasc2Banner.jpeg';
import ImagemFeminino2 from '../assets/ImagesFemin2Banner.jpeg';
import ImagemCalcado2 from '../assets/Calcados2Banner.jpeg';
import '../css/Banner.css';

export default function Banner() {
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

                <Carousel.Item>
                    <Row className="g-0">
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemMasculino1}
                                alt="Imagem Masculino 1"
                            />
                        </Col>
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemMasculino2}
                                alt="Imagem Masculino 2"
                            />
                        </Col>
                    </Row>
                    <Carousel.Caption className="legenda-carrossel">
                        <h3>Para os garotos</h3>
                        <p>Confira nossas opções masculinas</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Row className="g-0">
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemFeminino1}
                                alt="Imagem Feminina 1"
                            />
                        </Col>
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemFeminino2}
                                alt="Imagem Feminina 2"
                            />
                        </Col>
                    </Row>
                    <Carousel.Caption className="legenda-carrossel">
                        <h3>Para as moças</h3>
                        <p>Looks incríveis para elas</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Row className="g-0">
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemCalcado1}
                                alt="Imagem Calçado 1"
                            />
                        </Col>
                        <Col>
                            <img
                                className="d-block w-100 img-carrossel"
                                src={ImagemCalcado2}
                                alt="Imagem Calçado 2"
                            />
                        </Col>
                    </Row>
                    <Carousel.Caption className="legenda-carrossel">
                        <h3>Nossos calçados</h3>
                        <p>Conforto e estilo para os pés</p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </>
    );
}

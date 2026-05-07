import Banner from '../components/Banner.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BsStarFill, BsTagFill, BsRulers, BsPerson, BsPersonHeart } from 'react-icons/bs';
import { GiRunningShoe } from 'react-icons/gi';
import '../css/Home.css';

export default function Home() {
    return (
        <>
            <Banner />

            <section className="categorias-section">
                <Container>
                    <h2 className="section-titulo">Nossas Categorias</h2>
                    <p className="section-subtitulo">Encontre o look perfeito para cada ocasião.</p>
                    <Row className="g-4 justify-content-center">

                        <Col xs={12} sm={4}>
                            <Card className="categoria-card">
                                <Card.Body className="text-center py-4 d-flex flex-column align-items-center">
                                    <div className="categoria-icone">
                                        <BsPerson size={46} />
                                    </div>
                                    <Card.Title>Masculino</Card.Title>
                                    <Card.Text className="text-muted">
                                        Camisetas, calças, shorts e muito mais para os garotos.
                                    </Card.Text>
                                    <Button href="/catalogo" className="btn-categoria mt-auto">
                                        Ver produtos
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={4}>
                            <Card className="categoria-card">
                                <Card.Body className="text-center py-4 d-flex flex-column align-items-center">
                                    <div className="categoria-icone">
                                        <BsPersonHeart size={46} />
                                    </div>
                                    <Card.Title>Feminino</Card.Title>
                                    <Card.Text className="text-muted">
                                        Vestidos, saias, blusas e looks encantadores para as meninas.
                                    </Card.Text>
                                    <Button href="/catalogo" className="btn-categoria mt-auto">
                                        Ver produtos
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col xs={12} sm={4}>
                            <Card className="categoria-card">
                                <Card.Body className="text-center py-4 d-flex flex-column align-items-center">
                                    <div className="categoria-icone">
                                        <GiRunningShoe size={46} />
                                    </div>
                                    <Card.Title>Calçados</Card.Title>
                                    <Card.Text className="text-muted">
                                        Chinelos e sandálias confortáveis para os pés.
                                    </Card.Text>
                                    <Button href="/catalogo" className="btn-categoria mt-auto">
                                        Ver produtos
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </section>

            <section className="diferenciais-section">
                <Container>
                    <h2 className="section-titulo claro">Por que comprar na Joab Kids?</h2>
                    <p className="section-subtitulo" style={{ color: '#9ecfcf' }}>
                        Qualidade e carinho em cada peça.
                    </p>
                    <Row className="g-4 text-center">

                        <Col xs={12} sm={4}>
                            <div className="diferencial-item">
                                <BsStarFill className="diferencial-icone" size={42} />
                                <h5>Qualidade garantida</h5>
                                <p>Peças selecionadas com cuidado para garantir conforto e durabilidade.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="diferencial-item">
                                <BsRulers className="diferencial-icone" size={42} />
                                <h5>Variedade de tamanhos</h5>
                                <p>Do bebê ao juvenil, temos opções para todas as faixas etárias.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="diferencial-item">
                                <BsTagFill className="diferencial-icone" size={42} />
                                <h5>Preço justo</h5>
                                <p>Roupas e calçados de qualidade com preços acessíveis para toda a família.</p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

        </>
    );
}

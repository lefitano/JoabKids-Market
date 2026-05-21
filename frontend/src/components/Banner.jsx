import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { BsBag, BsArrowRight, BsTagFill } from 'react-icons/bs';
import { useProduto } from '../context/ProdutoContext';
import '../css/Banner.css';

export default function Banner() {
    const { produtos } = useProduto();
    const destaques = produtos.filter(p => p.destaque);

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

            <Carousel className="carrossel-container" interval={4000}>
                {destaques.map((produto) => (
                    <Carousel.Item key={produto.id}>
                        <Row className="g-0 align-items-center slide-produto">
                            <Col md={6} className="slide-imagem-col">
                                <img
                                    className="img-carrossel"
                                    src={produto.imagem}
                                    alt={produto.nome}
                                />
                            </Col>
                            <Col md={6} className="slide-info">
                                <Badge className="slide-categoria mb-3">
                                    {produto.categoria}
                                </Badge>
                                <h2 className="slide-nome">{produto.nome}</h2>
                                <p className="slide-descricao">{produto.descricao}</p>
                                <div className="slide-preco">
                                    <BsTagFill className="me-2" />
                                    R$ {produto.preco.toFixed(2)}
                                </div>
                                <Button href="/catalogo" className="slide-botao mt-4">
                                    Ver no catálogo <BsArrowRight className="ms-2" />
                                </Button>
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

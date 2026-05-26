import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BsGrid, BsArrowRepeat, BsCheckCircle, BsReceipt } from 'react-icons/bs';
import ProductCard from '../components/ProductCard.jsx';
import '../css/Catalogo.css';
import { useProduto } from '../context/ProdutoContext.jsx';


export default function Catalogo() {
    
    const { produtos, carregando } = useProduto();
    const [filtro, setFiltro] = useState("Todos");

    const produtosFiltrados = filtro === "Todos"
        ? produtos
        : produtos.filter(p => p.categoria === filtro);

    return (
        <>
            <div className="catalogo-titulo">
                <h2><BsGrid className="me-2" />Catálogo de Produtos</h2>
                <p>Encontre o look perfeito para os seus filhos!</p>
            </div>
            <Container className="catalogo-container">

                <div className="filtros-wrapper">
                    <ButtonGroup>
                        {["Todos", "Masculino", "Feminino", "Calçados"].map(categoria => (
                            <Button
                                key={categoria}
                                className={filtro === categoria ? "btn-filtro ativo" : "btn-filtro"}
                                onClick={() => setFiltro(categoria)}
                            >
                                {categoria}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <Row className="g-4">
                    {carregando ? (
                        <div className="text-center py-5 text-muted">
                            <div className="spinner-border mb-3" style={{ color: "#003235" }} role="status" />
                            <p>Carregando produtos...</p>
                        </div>
                    ) : produtosFiltrados.length === 0 ? (
                        <div className="text-center py-5 text-muted">
                            <p>Nenhum produto encontrado.</p>
                        </div>
                    ) : (
                        produtosFiltrados.map(produto => (
                            <ProductCard key={produto.id} produto={produto} />
                        ))
                    )}
                </Row>

            </Container>
            <section className="trocas-section">
                <Container>
                    <h2 className="section-titulo claro">Política de Trocas:</h2>
                    <p className="section-subtitulo trocas-subtitulo">
                        Sua satisfação é nossa prioridade!
                    </p>
                    <Row className="g-4 text-center">

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsArrowRepeat className="troca-icone" size={42} />
                                <h5>Prazo de 14 dias!</h5>
                                <p>Aceitamos trocas em até 14 dias após a data da compra.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsCheckCircle className="troca-icone" size={42} />
                                <h5>Produto sem uso</h5>
                                <p>O item deve estar sem uso, com etiqueta e na embalagem original.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsReceipt className="troca-icone" size={42} />
                                <h5>Mediante comprovante</h5>
                                <p>É necessário apresentar o comprovante de compra na solicitação.</p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    );
}

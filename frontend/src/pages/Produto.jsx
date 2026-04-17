import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { BsCartPlus, BsArrowLeft, BsDashLg, BsPlusLg } from 'react-icons/bs';
import '../css/Produto.css';

export default function Produto() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const produto = state?.produto;

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);

    if (!produto) {
        navigate('/catalogo');
        return null;
    }

    function diminuir() {
        if (quantidade > 1) setQuantidade(quantidade - 1);
    }

    function aumentar() {
        setQuantidade(quantidade + 1);
    }

    return (
        <Container className="produto-pagina">
            <Row className="g-5 align-items-start">

                <Col xs={12} md={6}>
                    <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="produto-imagem"
                    />
                </Col>

                <Col xs={12} md={6}>
                    <Badge className="produto-detalhe-categoria">
                        {produto.categoria}
                    </Badge>
                    <h2 className="produto-detalhe-nome">{produto.nome}</h2>
                    <p className="produto-detalhe-preco">
                        R$ {produto.preco.toFixed(2)}
                    </p>

                    <hr className="produto-divider" />

                    <p className="produto-label">Tamanho:</p>
                    <div className="tamanhos-wrapper">
                        {produto.tamanhos.map(tamanho => (
                            <button
                                key={tamanho}
                                className={tamanhoSelecionado === tamanho ? "btn-tamanho ativo" : "btn-tamanho"}
                                onClick={() => setTamanhoSelecionado(tamanho)}
                            >
                                {tamanho}
                            </button>
                        ))}
                    </div>

                    <hr className="produto-divider" />

                    <p className="produto-label">Quantidade:</p>
                    <div className="quantidade-wrapper">
                        <button className="btn-quantidade" onClick={diminuir}>
                            <BsDashLg />
                        </button>
                        <span className="quantidade-valor">{quantidade}</span>
                        <button className="btn-quantidade" onClick={aumentar}>
                            <BsPlusLg />
                        </button>
                    </div>

                    <hr className="produto-divider" />

                    <Button className="btn-carrinho">
                        <BsCartPlus className="me-2" size={20} />
                        Adicionar ao carrinho
                    </Button>
                    <Button
                        className="btn-voltar"
                        onClick={() => navigate('/catalogo')}
                    >
                        <BsArrowLeft className="me-2" />
                        Voltar ao catálogo
                    </Button>
                </Col>

            </Row>

            <Row className="mt-5">
                <Col>
                    <Card className="especificacoes-card">
                        <Card.Body>
                            <Card.Title className="especificacoes-titulo">
                                Especificações do produto
                            </Card.Title>
                            <hr className="produto-divider" />
                            <Row>
                                <Col xs={12} sm={4}>
                                    <p className="espec-label">Categoria:</p>
                                    <p className="espec-valor">{produto.categoria}</p>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <p className="espec-label">Tamanhos disponíveis:</p>
                                    <p className="espec-valor">{produto.tamanhos.join(", ")}</p>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <p className="espec-label">Descrição:</p>
                                    <p className="espec-valor">{produto.descricao}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

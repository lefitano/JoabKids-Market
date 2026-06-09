import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsTrash, BsWhatsapp, BsCartX, BsArrowLeft, BsGeoAlt } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext.jsx';
import '../css/Carrinho.css';

const WHATSAPP_NUMERO = import.meta.env.VITE_WHATSAPP_NUMERO;

function gerarMensagem(itens, endereco) {
    const lista = itens.map((item, i) =>
        `${i + 1}. ${item.nome}\n   Ref: ${item.referencia}\n   Categoria: ${item.categoria}\n   Tamanho: ${item.tamanhoSelecionado}\n   Cor: ${item.corSelecionada}\n   Quantidade: ${item.quantidade}\n   Preço unit.: R$ ${item.preco.toFixed(2)}`
    ).join("\n\n");
    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const complementoLinha = endereco.complemento ? `\nComplemento: ${endereco.complemento}` : "";
    const enderecoTexto = `Endereço de entrega:\nCEP: ${endereco.cep}\nRua: ${endereco.rua}, ${endereco.numero}\nBairro: ${endereco.bairro}\nCidade: ${endereco.cidade}${complementoLinha}`;
    return `Olá vim pelo site, gostaria de finalizar minha compra:\n\n${lista}\n\nTotal: R$ ${total.toFixed(2)}\n\n${enderecoTexto}\n\nAguardo confirmação!`;
}

export default function Carrinho() {
    const { itens, removerItem, limparCarrinho } = useCarrinho();
    const navigate = useNavigate();

    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    function finalizarPedido() {
        if (!cep || !rua || !numero || !bairro || !cidade) {
            alert('Preencha o endereço de entrega antes de finalizar o pedido.');
            return;
        }
        const endereco = { cep, rua, numero, bairro, cidade, complemento };
        const mensagem = encodeURIComponent(gerarMensagem(itens, endereco));
        window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`, "_blank");
        limparCarrinho();
    }

    if (itens.length === 0) {
        return (
            <Container className="carrinho-vazio">
                <BsCartX size={64} className="carrinho-vazio-icone" />
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos do catálogo para continuar.</p>
                <Button className="btn-ir-catalogo" onClick={() => navigate('/catalogo')}>
                    <BsArrowLeft className="me-2" />
                    Ir para o catálogo
                </Button>
            </Container>
        );
    }

    return (
        <Container className="carrinho-container">
            <h2 className="carrinho-titulo">Meu Carrinho</h2>

            <div className="carrinho-itens">
                {itens.map((item, index) => (
                    <Row key={index} className="carrinho-item align-items-center">
                        <Col xs={3} sm={2}>
                            <img src={item.imagem} alt={item.nome} className="carrinho-item-imagem" />
                        </Col>
                        <Col xs={6} sm={7}>
                            <p className="carrinho-item-nome">{item.nome}</p>
                            <p className="carrinho-item-detalhe">Ref: {item.referencia}</p>
                            <p className="carrinho-item-detalhe">Tamanho: {item.tamanhoSelecionado} &nbsp;|&nbsp; Cor: {item.corSelecionada}</p>
                            <p className="carrinho-item-detalhe">Quantidade: {item.quantidade}</p>
                        </Col>
                        <Col xs={3} sm={3} className="text-end">
                            <p className="carrinho-item-preco">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                            <button className="btn-remover" onClick={() => removerItem(index)}>
                                <BsTrash />
                            </button>
                        </Col>
                    </Row>
                ))}
            </div>

            <div className="endereco-section">
                <h5 className="endereco-titulo"><BsGeoAlt className="me-2" />Endereço de Entrega</h5>
                <Row className="g-3">
                    <Col xs={12} sm={4}>
                        <Form.Group>
                            <Form.Label>CEP</Form.Label>
                            <Form.Control type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Form.Group>
                            <Form.Label>Rua</Form.Label>
                            <Form.Control type="text" placeholder="Nome da rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={4}>
                        <Form.Group>
                            <Form.Label>Número</Form.Label>
                            <Form.Control type="text" placeholder="Nº" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Form.Group>
                            <Form.Label>Complemento <span className="texto-opcional">(opcional)</span></Form.Label>
                            <Form.Control type="text" placeholder="Apto, bloco, referência..." value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Group>
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control type="text" placeholder="Nome do bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Form.Group>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type="text" placeholder="Nome da cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
            </div>

            <div className="carrinho-rodape">
                <p className="carrinho-total">Total: <span>R$ {total.toFixed(2)}</span></p>
                <Button className="btn-finalizar" onClick={finalizarPedido}>
                    <BsWhatsapp className="me-2" size={20} />
                    Finalizar Pedido pelo WhatsApp
                </Button>
                <Button className="btn-continuar" onClick={() => navigate('/catalogo')}>
                    <BsArrowLeft className="me-2" />
                    Continuar comprando
                </Button>
            </div>
        </Container>
    );
}

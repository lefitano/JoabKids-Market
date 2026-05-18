import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {
    BsReceiptCutoff,
    BsChevronDown,
    BsChevronUp,
    BsCartX,
    BsArrowLeft,
    BsCalendar3,
    BsBoxSeam,
    BsGeoAlt,
    BsClock,
    BsCheckCircle,
    BsXCircle,
    BsHourglassSplit,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../css/HistoricoPedidos.css';

// ─── Dados simulados ────────────────────────────────────────────────────────
// Quando a autenticação Firebase e a API estiverem integradas, substitua
// este array pelo resultado da chamada:
//   GET /pedidos  (com o token do usuário no header Authorization)
const PEDIDOS_MOCK = [
    {
        id: 'JK-2024-001',
        createdAt: '2024-05-10T14:32:00',
        status: 'entregue',
        total: 94.80,
        endereco: {
            rua: 'Rua das Flores',
            numero: '42',
            bairro: 'Centro',
            cidade: 'Canindé',
            cep: '62700-000',
        },
        itens: [
            {
                nome: 'Camiseta Esportiva',
                referencia: 'JK-001',
                categoria: 'Masculino',
                tamanhoSelecionado: '6',
                corSelecionada: 'Azul',
                quantidade: 1,
                preco: 39.90,
                imagem: null,
            },
            {
                nome: 'Sandália Infantil',
                referencia: 'JK-005',
                categoria: 'Calçados',
                tamanhoSelecionado: '28',
                corSelecionada: 'Rosa',
                quantidade: 1,
                preco: 34.90,
                imagem: null,
            },
            {
                nome: 'Vestido Floral',
                referencia: 'JK-003',
                categoria: 'Feminino',
                tamanhoSelecionado: '4',
                corSelecionada: 'Lilás',
                quantidade: 0,
                preco: 20.00,
                imagem: null,
            },
        ],
    },
    {
        id: 'JK-2024-002',
        createdAt: '2024-06-01T09:15:00',
        status: 'em andamento',
        total: 59.90,
        endereco: {
            rua: 'Av. São Francisco',
            numero: '200',
            bairro: 'Bom Jesus',
            cidade: 'Canindé',
            cep: '62700-100',
        },
        itens: [
            {
                nome: 'Conjunto Casual',
                referencia: 'JK-002',
                categoria: 'Masculino',
                tamanhoSelecionado: '10',
                corSelecionada: 'Preto',
                quantidade: 1,
                preco: 59.90,
                imagem: null,
            },
        ],
    },
    {
        id: 'JK-2024-003',
        createdAt: '2024-06-15T18:50:00',
        status: 'cancelado',
        total: 69.90,
        endereco: {
            rua: 'Rua do Comércio',
            numero: '15',
            bairro: 'Mercado',
            cidade: 'Canindé',
            cep: '62700-200',
        },
        itens: [
            {
                nome: 'Tênis Colorido',
                referencia: 'JK-006',
                categoria: 'Calçados',
                tamanhoSelecionado: '32',
                corSelecionada: 'Branco',
                quantidade: 1,
                preco: 69.90,
                imagem: null,
            },
        ],
    },
];
// ────────────────────────────────────────────────────────────────────────────

const CONFIG_STATUS = {
    entregue: {
        rotulo: 'Entregue',
        variante: 'success',
        Icone: BsCheckCircle,
    },
    'em andamento': {
        rotulo: 'Em andamento',
        variante: 'warning',
        Icone: BsHourglassSplit,
    },
    pendente: {
        rotulo: 'Pendente',
        variante: 'secondary',
        Icone: BsClock,
    },
    cancelado: {
        rotulo: 'Cancelado',
        variante: 'danger',
        Icone: BsXCircle,
    },
};

function formatarData(isoString) {
    return new Date(isoString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function CartaoPedido({ pedido }) {
    const [aberto, setAberto] = useState(false);
    const cfg = CONFIG_STATUS[pedido.status] ?? CONFIG_STATUS.pendente;
    const { Icone } = cfg;
    const totalItens = pedido.itens.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="pedido-card">
            {/* Cabeçalho sempre visível */}
            <div
                className="pedido-header"
                onClick={() => setAberto(!aberto)}
                role="button"
                aria-expanded={aberto}
            >
                <div className="pedido-header-esquerda">
                    <BsReceiptCutoff className="pedido-icone-recibo" size={22} />
                    <div>
                        <p className="pedido-id">Pedido #{pedido.id}</p>
                        <p className="pedido-data">
                            <BsCalendar3 size={12} className="me-1" />
                            {formatarData(pedido.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="pedido-header-direita">
                    <Badge
                        bg={cfg.variante}
                        className="pedido-badge-status"
                    >
                        <Icone className="me-1" size={12} />
                        {cfg.rotulo}
                    </Badge>
                    <p className="pedido-total">R$ {pedido.total.toFixed(2)}</p>
                    <span className="pedido-toggle-icone">
                        {aberto ? <BsChevronUp /> : <BsChevronDown />}
                    </span>
                </div>
            </div>

            {/* Resumo colapsável */}
            <Collapse in={aberto}>
                <div>
                    <div className="pedido-body">

                        {/* Itens do pedido */}
                        <div className="pedido-secao">
                            <p className="pedido-secao-titulo">
                                <BsBoxSeam className="me-2" />
                                Itens ({totalItens})
                            </p>
                            <div className="pedido-itens-lista">
                                {pedido.itens.map((item, idx) => (
                                    <Row key={idx} className="pedido-item align-items-center">
                                        <Col xs={12} sm={7}>
                                            <p className="pedido-item-nome">{item.nome}</p>
                                            <p className="pedido-item-detalhe">
                                                Ref: {item.referencia} &nbsp;·&nbsp;
                                                Tamanho: {item.tamanhoSelecionado} &nbsp;·&nbsp;
                                                Cor: {item.corSelecionada}
                                            </p>
                                        </Col>
                                        <Col xs={6} sm={3} className="pedido-item-qtd">
                                            <span>Qtd: {item.quantidade}</span>
                                        </Col>
                                        <Col xs={6} sm={2} className="text-end">
                                            <span className="pedido-item-preco">
                                                R$ {(item.preco * item.quantidade).toFixed(2)}
                                            </span>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        </div>

                        <hr className="pedido-divider" />

                        {/* Endereço e total */}
                        <Row className="g-3">
                            <Col xs={12} sm={7}>
                                <p className="pedido-secao-titulo">
                                    <BsGeoAlt className="me-2" />
                                    Endereço de entrega
                                </p>
                                <p className="pedido-endereco">
                                    {pedido.endereco.rua}, {pedido.endereco.numero} — {pedido.endereco.bairro}
                                    <br />
                                    {pedido.endereco.cidade} · CEP {pedido.endereco.cep}
                                </p>
                            </Col>
                            <Col xs={12} sm={5} className="pedido-total-bloco">
                                <p className="pedido-total-label">Total do pedido</p>
                                <p className="pedido-total-valor">R$ {pedido.total.toFixed(2)}</p>
                            </Col>
                        </Row>

                    </div>
                </div>
            </Collapse>
        </div>
    );
}

export default function HistoricoPedidos() {
    const navigate = useNavigate();

    // Quando a API estiver integrada, busque os pedidos aqui com useEffect:
    //
    //   const [pedidos, setPedidos] = useState([]);
    //   const [carregando, setCarregando] = useState(true);
    //   useEffect(() => {
    //     async function buscar() {
    //       const token = await auth.currentUser.getIdToken();
    //       const resp = await fetch('/pedidos', {
    //         headers: { Authorization: `Bearer ${token}` }
    //       });
    //       const dados = await resp.json();
    //       setPedidos(dados);
    //       setCarregando(false);
    //     }
    //     buscar();
    //   }, []);
    //
    const pedidos = PEDIDOS_MOCK;

    return (
        <>
            {/* Cabeçalho da página */}
            <div className="meus-pedidos-titulo">
                <h2>
                    <BsReceiptCutoff className="me-2" />
                    Meus Pedidos
                </h2>
                <p>Acompanhe o histórico e o status das suas compras.</p>
            </div>

            <Container className="meus-pedidos-container">

                {pedidos.length === 0 ? (
                    /* Estado vazio */
                    <div className="pedidos-vazio">
                        <BsCartX size={64} className="pedidos-vazio-icone" />
                        <h3>Nenhum pedido encontrado</h3>
                        <p>Você ainda não fez nenhum pedido. Que tal explorar o catálogo?</p>
                        <Button
                            className="btn-ir-catalogo"
                            onClick={() => navigate('/catalogo')}
                        >
                            <BsArrowLeft className="me-2" />
                            Ir para o catálogo
                        </Button>
                    </div>
                ) : (
                    /* Lista de pedidos */
                    <div className="pedidos-lista">
                        {pedidos.map(pedido => (
                            <CartaoPedido key={pedido.id} pedido={pedido} />
                        ))}
                    </div>
                )}

            </Container>
        </>
    );
}

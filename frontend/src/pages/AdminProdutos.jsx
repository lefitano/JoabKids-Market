import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import {
    BsBoxSeam,
    BsSearch,
    BsPlusLg,
    BsPencil,
    BsTrash,
    BsExclamationTriangle,
    BsArrowClockwise,
    BsImage,
    BsX,
    BsCheck2,
    BsTagFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/AdminProdutos.css';

const API = import.meta.env.VITE_API_URL;

const CATEGORIAS = ['Masculino', 'Feminino', 'Calçados'];

// Produto em branco usado ao abrir o modal de criação
const PRODUTO_VAZIO = {
    referencia: '',
    nome:       '',
    descricao:  '',
    preco:      '',
    categoria:  '',
    imagem:     '',
    tamanhos:   '',   // string separada por vírgula no formulário
    cores:      '',   // string separada por vírgula no formulário
    estoque:    '',
};

// ─── Funções auxiliares ───────────────────────────────────────────────────────

// Converte "2, 4, 6" → ["2","4","6"]
function parseLista(str) {
    return str.split(',').map((s) => s.trim()).filter(Boolean);
}

// Converte ["2","4","6"] → "2, 4, 6"  (para preencher o input)
function listaParaString(arr) {
    return Array.isArray(arr) ? arr.join(', ') : (arr ?? '');
}

function formatarData(valor) {
    if (!valor) return '—';
    const data = valor._seconds
        ? new Date(valor._seconds * 1000)
        : new Date(valor);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
}

// ─── Card de métricas ─────────────────────────────────────────────────────────
function CardsMetricas({ produtos }) {
    const total      = produtos.length;
    const porCat     = (c) => produtos.filter((p) => p.categoria === c).length;
    const semEstoque = produtos.filter((p) => Number(p.estoque) === 0).length;

    const metricas = [
        { rotulo: 'Total de produtos', valor: total,               cor: 'metrica-azul',    Icone: BsBoxSeam    },
        { rotulo: 'Masculino',         valor: porCat('Masculino'), cor: 'metrica-verde',   Icone: BsTagFill    },
        { rotulo: 'Feminino',          valor: porCat('Feminino'),  cor: 'metrica-rosa',    Icone: BsTagFill    },
        { rotulo: 'Calçados',          valor: porCat('Calçados'),  cor: 'metrica-amarelo', Icone: BsTagFill    },
    ];

    return (
        <Row className="g-3 mb-4">
            {metricas.map((m) => (
                <Col key={m.rotulo} xs={12} sm={6} md={3}>
                    <div className={`metrica-card ${m.cor}`}>
                        <m.Icone size={26} className="metrica-icone" />
                        <div>
                            <p className="metrica-valor">{m.valor}</p>
                            <p className="metrica-rotulo">{m.rotulo}</p>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

// ─── Modal de criar / editar produto ─────────────────────────────────────────
function ModalFormulario({ produto, onFechar, onSalvar, salvando, erroModal }) {
    const editando = !!produto?.id;

    const [form, setForm] = useState({
        ...PRODUTO_VAZIO,
        ...produto,
        tamanhos: listaParaString(produto?.tamanhos),
        cores:    listaParaString(produto?.cores),
    });
    const [erros, setErros] = useState({});

    function handle(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
        setErros((prev) => ({ ...prev, [campo]: '' }));
    }

    function validar() {
        const e = {};
        if (!form.referencia.trim()) e.referencia = 'Informe a referência.';
        if (!form.nome.trim())       e.nome       = 'Informe o nome.';
        if (!form.categoria)         e.categoria  = 'Selecione a categoria.';
        if (!form.imagem.trim())     e.imagem     = 'Informe a URL da imagem.';
        if (!form.descricao.trim())  e.descricao  = 'Informe a descrição.';
        if (form.preco === '' || isNaN(Number(form.preco)) || Number(form.preco) < 0)
            e.preco = 'Informe um preço válido.';
        if (form.estoque === '' || isNaN(Number(form.estoque)) || Number(form.estoque) < 0)
            e.estoque = 'Informe um estoque válido.';
        if (!form.tamanhos.trim())   e.tamanhos   = 'Informe pelo menos um tamanho.';
        if (!form.cores.trim())      e.cores      = 'Informe pelo menos uma cor.';
        return e;
    }

    function handleSubmit() {
        const e = validar();
        if (Object.keys(e).length > 0) { setErros(e); return; }

        onSalvar({
            ...form,
            preco:    parseFloat(form.preco),
            estoque:  parseInt(form.estoque, 10),
            tamanhos: parseLista(form.tamanhos),
            cores:    parseLista(form.cores),
        });
    }

    return (
        <Modal show onHide={onFechar} size="lg" centered scrollable>
            <Modal.Header closeButton className="modal-header-admin">
                <Modal.Title className="modal-titulo-admin">
                    {editando ? <><BsPencil className="me-2" />Editar produto</> : <><BsPlusLg className="me-2" />Novo produto</>}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body-admin">
                {erroModal && <Alert variant="danger" className="mb-3">{erroModal}</Alert>}

                <Row className="g-3">
                    {/* Referência */}
                    <Col xs={12} sm={4}>
                        <Form.Label className="modal-label">Referência *</Form.Label>
                        <Form.Control
                            value={form.referencia}
                            onChange={(e) => handle('referencia', e.target.value)}
                            placeholder="Ex: JK-007"
                            isInvalid={!!erros.referencia}
                            className="admin-input"
                        />
                        <Form.Control.Feedback type="invalid">{erros.referencia}</Form.Control.Feedback>
                    </Col>

                    {/* Nome */}
                    <Col xs={12} sm={8}>
                        <Form.Label className="modal-label">Nome do produto *</Form.Label>
                        <Form.Control
                            value={form.nome}
                            onChange={(e) => handle('nome', e.target.value)}
                            placeholder="Ex: Camiseta Listrada"
                            isInvalid={!!erros.nome}
                            className="admin-input"
                        />
                        <Form.Control.Feedback type="invalid">{erros.nome}</Form.Control.Feedback>
                    </Col>

                    {/* Categoria */}
                    <Col xs={12} sm={4}>
                        <Form.Label className="modal-label">Categoria *</Form.Label>
                        <Form.Select
                            value={form.categoria}
                            onChange={(e) => handle('categoria', e.target.value)}
                            isInvalid={!!erros.categoria}
                            className="admin-select"
                        >
                            <option value="">Selecione...</option>
                            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{erros.categoria}</Form.Control.Feedback>
                    </Col>

                    {/* Preço */}
                    <Col xs={12} sm={4}>
                        <Form.Label className="modal-label">Preço (R$) *</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.preco}
                            onChange={(e) => handle('preco', e.target.value)}
                            placeholder="0.00"
                            isInvalid={!!erros.preco}
                            className="admin-input"
                        />
                        <Form.Control.Feedback type="invalid">{erros.preco}</Form.Control.Feedback>
                    </Col>

                    {/* Estoque */}
                    <Col xs={12} sm={4}>
                        <Form.Label className="modal-label">Estoque *</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            value={form.estoque}
                            onChange={(e) => handle('estoque', e.target.value)}
                            placeholder="0"
                            isInvalid={!!erros.estoque}
                            className="admin-input"
                        />
                        <Form.Control.Feedback type="invalid">{erros.estoque}</Form.Control.Feedback>
                    </Col>

                    {/* URL da imagem */}
                    <Col xs={12}>
                        <Form.Label className="modal-label">URL da imagem *</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="admin-busca-icone"><BsImage /></InputGroup.Text>
                            <Form.Control
                                value={form.imagem}
                                onChange={(e) => handle('imagem', e.target.value)}
                                placeholder="https://..."
                                isInvalid={!!erros.imagem}
                                className="admin-input"
                            />
                            <Form.Control.Feedback type="invalid">{erros.imagem}</Form.Control.Feedback>
                        </InputGroup>
                        {form.imagem && (
                            <div className="preview-imagem-wrapper mt-2">
                                <img
                                    src={form.imagem}
                                    alt="Prévia"
                                    className="preview-imagem"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                        )}
                    </Col>

                    {/* Tamanhos */}
                    <Col xs={12} sm={6}>
                        <Form.Label className="modal-label">Tamanhos disponíveis *</Form.Label>
                        <Form.Control
                            value={form.tamanhos}
                            onChange={(e) => handle('tamanhos', e.target.value)}
                            placeholder="Ex: 2, 4, 6, 8, 10"
                            isInvalid={!!erros.tamanhos}
                            className="admin-input"
                        />
                        <Form.Text className="text-muted">Separe com vírgulas.</Form.Text>
                        <Form.Control.Feedback type="invalid">{erros.tamanhos}</Form.Control.Feedback>
                    </Col>

                    {/* Cores */}
                    <Col xs={12} sm={6}>
                        <Form.Label className="modal-label">Cores disponíveis *</Form.Label>
                        <Form.Control
                            value={form.cores}
                            onChange={(e) => handle('cores', e.target.value)}
                            placeholder="Ex: Azul, Branco, Cinza"
                            isInvalid={!!erros.cores}
                            className="admin-input"
                        />
                        <Form.Text className="text-muted">Separe com vírgulas.</Form.Text>
                        <Form.Control.Feedback type="invalid">{erros.cores}</Form.Control.Feedback>
                    </Col>

                    {/* Descrição */}
                    <Col xs={12}>
                        <Form.Label className="modal-label">Descrição *</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={form.descricao}
                            onChange={(e) => handle('descricao', e.target.value)}
                            placeholder="Descreva o produto..."
                            isInvalid={!!erros.descricao}
                            className="admin-input"
                        />
                        <Form.Control.Feedback type="invalid">{erros.descricao}</Form.Control.Feedback>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onFechar} disabled={salvando}>
                    <BsX className="me-1" />Cancelar
                </Button>
                <Button className="btn-admin-primario" onClick={handleSubmit} disabled={salvando}>
                    {salvando
                        ? <Spinner size="sm" animation="border" className="me-1" />
                        : <BsCheck2 className="me-1" />}
                    {editando ? 'Salvar alterações' : 'Criar produto'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// ─── Modal de confirmação de exclusão ─────────────────────────────────────────
function ModalConfirmarExclusao({ produto, onFechar, onConfirmar, excluindo }) {
    if (!produto) return null;
    return (
        <Modal show onHide={onFechar} centered>
            <Modal.Header closeButton className="modal-header-admin">
                <Modal.Title className="modal-titulo-admin modal-titulo-perigo">
                    <BsExclamationTriangle className="me-2" />Excluir produto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-admin">
                <p>Tem certeza que deseja excluir o produto <strong>{produto.nome}</strong> (ref. {produto.referencia})?</p>
                <p className="text-danger" style={{ fontSize: '0.88rem' }}>Esta ação não pode ser desfeita.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onFechar} disabled={excluindo}>Cancelar</Button>
                <Button variant="danger" onClick={() => onConfirmar(produto.id)} disabled={excluindo}>
                    {excluindo && <Spinner size="sm" animation="border" className="me-1" />}
                    Confirmar exclusão
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AdminProdutos() {
    const { usuario, carregando: authCarregando, getToken } = useAuth();
    const navigate = useNavigate();

    const [produtos, setProdutos]           = useState([]);
    const [carregando, setCarregando]       = useState(true);
    const [erro, setErro]                   = useState('');
    const [sucesso, setSucesso]             = useState('');
    const [busca, setBusca]                 = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('todos');

    const [modalFormulario, setModalFormulario]   = useState(null); // null | PRODUTO_VAZIO | produto existente
    const [produtoExcluir, setProdutoExcluir]     = useState(null);
    const [salvando, setSalvando]                 = useState(false);
    const [excluindo, setExcluindo]               = useState(false);
    const [erroModal, setErroModal]               = useState('');

    // ── Buscar produtos ───────────────────────────────────────────────────────
    const buscarProdutos = useCallback(async () => {
        setCarregando(true);
        setErro('');
        try {
            // GET /api/produtos é público — não precisa de token
            const resp = await fetch(`${API}/api/produtos`);
            if (!resp.ok) throw new Error(`Erro ${resp.status}`);
            setProdutos(await resp.json());
        } catch (e) {
            setErro('Não foi possível carregar os produtos. Verifique se o servidor está rodando.');
        } finally {
            setCarregando(false);
        }
    }, []);

    // ── Verificar autenticação e carregar ─────────────────────────────────────
    useEffect(() => {
        if (authCarregando) return;
        if (!usuario) { navigate('/login'); return; }

        usuario.getIdTokenResult().then((result) => {
            if (!result.claims.admin) { navigate('/'); return; }
            buscarProdutos();
        });
    }, [usuario, authCarregando, navigate, buscarProdutos]);

    // ── Mensagem de sucesso some após 3s ──────────────────────────────────────
    useEffect(() => {
        if (!sucesso) return;
        const t = setTimeout(() => setSucesso(''), 3000);
        return () => clearTimeout(t);
    }, [sucesso]);

    // ── Criar ou editar ───────────────────────────────────────────────────────
    async function handleSalvar(dados) {
        setSalvando(true);
        setErroModal('');
        const editando = !!dados.id;
        try {
            const token = await getToken();
            const url    = editando
                ? `${API}/api/produtos/${dados.id}`
                : `${API}/api/produtos`;
            const method = editando ? 'PUT' : 'POST';

            const resp = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  `Bearer ${token}`,
                },
                body: JSON.stringify(dados),
            });

            if (!resp.ok) {
                const msg = await resp.json().catch(() => ({}));
                throw new Error(msg.error ?? `Erro ${resp.status}`);
            }

            const produtoSalvo = await resp.json();

            setProdutos((prev) =>
                editando
                    ? prev.map((p) => p.id === produtoSalvo.id ? produtoSalvo : p)
                    : [...prev, produtoSalvo]
            );

            setSucesso(editando ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
            setModalFormulario(null);
        } catch (e) {
            setErroModal(e.message ?? 'Erro ao salvar produto.');
        } finally {
            setSalvando(false);
        }
    }

    // ── Excluir ───────────────────────────────────────────────────────────────
    async function handleExcluir(id) {
        setExcluindo(true);
        try {
            const token = await getToken();
            const resp  = await fetch(`${API}/api/produtos/${id}`, {
                method:  'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!resp.ok) throw new Error(`Erro ${resp.status}`);

            setProdutos((prev) => prev.filter((p) => p.id !== id));
            setSucesso('Produto excluído com sucesso!');
            setProdutoExcluir(null);
        } catch (e) {
            setErro('Erro ao excluir produto. Tente novamente.');
            setProdutoExcluir(null);
        } finally {
            setExcluindo(false);
        }
    }

    // ── Filtragem ─────────────────────────────────────────────────────────────
    const produtosFiltrados = produtos.filter((p) => {
        const termo     = busca.toLowerCase();
        const bateBusca = !busca
            || p.nome.toLowerCase().includes(termo)
            || p.referencia.toLowerCase().includes(termo);
        const bateCategoria = filtroCategoria === 'todos' || p.categoria === filtroCategoria;
        return bateBusca && bateCategoria;
    });

    // ── Render ────────────────────────────────────────────────────────────────
    if (authCarregando || (carregando && produtos.length === 0)) {
        return (
            <div className="admin-loading">
                <Spinner animation="border" style={{ color: '#003235' }} />
                <p>Carregando produtos...</p>
            </div>
        );
    }

    return (
        <>
            {/* Cabeçalho */}
            <div className="admin-titulo">
                <h2><BsBoxSeam className="me-2" />Gerenciamento de Produtos</h2>
                <p>Cadastre, edite e remova produtos do catálogo da loja.</p>
            </div>

            <Container className="admin-container">

                {erro    && <Alert variant="danger"  onClose={() => setErro('')}    dismissible>{erro}</Alert>}
                {sucesso && <Alert variant="success" onClose={() => setSucesso('')} dismissible>{sucesso}</Alert>}

                <CardsMetricas produtos={produtos} />

                {/* Barra de ferramentas */}
                <div className="admin-barra-ferramentas">
                    <InputGroup className="admin-busca">
                        <InputGroup.Text className="admin-busca-icone"><BsSearch /></InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar por nome ou referência..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="admin-input-busca"
                        />
                    </InputGroup>

                    <Form.Select
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className="admin-select admin-select-filtro"
                    >
                        <option value="todos">Todas as categorias</option>
                        {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                    </Form.Select>

                    <Button
                        className="btn-admin-primario btn-novo-produto"
                        onClick={() => { setErroModal(''); setModalFormulario(PRODUTO_VAZIO); }}
                    >
                        <BsPlusLg className="me-2" />Novo produto
                    </Button>

                    <Button
                        variant="outline-secondary"
                        className="btn-recarregar"
                        onClick={buscarProdutos}
                        title="Recarregar"
                    >
                        <BsArrowClockwise />
                    </Button>
                </div>

                {/* Tabela */}
                {produtosFiltrados.length === 0 ? (
                    <div className="admin-vazio">
                        <BsBoxSeam size={52} className="admin-vazio-icone" />
                        <p>Nenhum produto encontrado para os filtros aplicados.</p>
                    </div>
                ) : (
                    <div className="admin-tabela-wrapper">
                        <Table responsive hover className="admin-tabela">
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Ref.</th>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Preço</th>
                                    <th>Estoque</th>
                                    <th>Tamanhos</th>
                                    <th>Cadastro</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosFiltrados.map((produto) => (
                                    <tr key={produto.id}>
                                        <td>
                                            <img
                                                src={produto.imagem}
                                                alt={produto.nome}
                                                className="tabela-thumb"
                                                onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; }}
                                            />
                                        </td>
                                        <td className="col-ref">{produto.referencia}</td>
                                        <td>
                                            <p className="tabela-nome-produto">{produto.nome}</p>
                                            <p className="tabela-descricao-produto">{produto.descricao}</p>
                                        </td>
                                        <td>
                                            <Badge className="badge-categoria-admin">
                                                {produto.categoria}
                                            </Badge>
                                        </td>
                                        <td className="tabela-preco">
                                            R$ {Number(produto.preco).toFixed(2)}
                                        </td>
                                        <td>
                                            <span className={`badge-estoque ${Number(produto.estoque) === 0 ? 'sem-estoque' : ''}`}>
                                                {produto.estoque ?? '—'}
                                            </span>
                                        </td>
                                        <td className="tabela-tamanhos">
                                            {Array.isArray(produto.tamanhos)
                                                ? produto.tamanhos.join(', ')
                                                : produto.tamanhos ?? '—'}
                                        </td>
                                        <td className="tabela-data">{formatarData(produto.createdAt)}</td>
                                        <td>
                                            <div className="acoes-wrapper">
                                                <button
                                                    className="btn-acao btn-editar"
                                                    title="Editar produto"
                                                    onClick={() => {
                                                        setErroModal('');
                                                        setModalFormulario(produto);
                                                    }}
                                                >
                                                    <BsPencil size={15} />
                                                </button>
                                                <button
                                                    className="btn-acao btn-excluir"
                                                    title="Excluir produto"
                                                    onClick={() => setProdutoExcluir(produto)}
                                                >
                                                    <BsTrash size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>

            {/* Modais */}
            {modalFormulario !== null && (
                <ModalFormulario
                    produto={modalFormulario}
                    onFechar={() => setModalFormulario(null)}
                    onSalvar={handleSalvar}
                    salvando={salvando}
                    erroModal={erroModal}
                />
            )}

            <ModalConfirmarExclusao
                produto={produtoExcluir}
                onFechar={() => setProdutoExcluir(null)}
                onConfirmar={handleExcluir}
                excluindo={excluindo}
            />
        </>
    );
}
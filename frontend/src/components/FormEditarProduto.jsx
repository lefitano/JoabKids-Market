import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { BsPencilSquare, BsArrowLeft } from "react-icons/bs";
import { useProduto } from "../context/ProdutoContext";

const TAMANHOS_ROUPAS = ["2", "4", "6", "8", "10", "12", "14"];
const CORES_DISPONIVEIS = ["Azul", "Branco", "Cinza", "Preto", "Rosa", "Vermelho", "Amarelo", "Verde", "Roxo", "Lilás", "Cáqui", "Azul Marinho", "Dourado", "Prata"];
const TAMANHOS_CALCADOS = ["24", "26", "28", "30", "32", "34"];
const CATEGORIAS = ["Masculino", "Feminino", "Calçados"];

export default function FormEditarProduto() {
    const { produtos, editarProduto } = useProduto();
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [form, setForm] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState("");

    const tamanhosDaCategoria = form?.categoria === "Calçados" ? TAMANHOS_CALCADOS : TAMANHOS_ROUPAS;

    function selecionarProduto(produto) {
        setProdutoSelecionado(produto);
        setForm({
            nome:      produto.nome,
            preco:     produto.preco,
            categoria: produto.categoria,
            imagem:    produto.imagem,
            descricao: produto.descricao,
            variantes: produto.variantes || {},
            destaque:  produto.destaque ?? false,
        });
        setErro("");
        setSucesso(false);
    }

    function voltar() {
        setProdutoSelecionado(null);
        setForm(null);
        setErro("");
        setSucesso(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "categoria" ? { variantes: {} } : {}),
        }));
    }

    function handleTamanho(tamanho) {
        setForm((prev) => {
            const novasVariantes = { ...prev.variantes };
            if (novasVariantes[tamanho]) {
                delete novasVariantes[tamanho];
            } else {
                novasVariantes[tamanho] = [];
            }
            return { ...prev, variantes: novasVariantes };
        });
    }

    function handleCor(tamanho, cor) {
        setForm((prev) => {
            const coresAtuais = prev.variantes[tamanho] || [];
            const novasCores = coresAtuais.includes(cor)
                ? coresAtuais.filter((c) => c !== cor)
                : [...coresAtuais, cor];
            return { ...prev, variantes: { ...prev.variantes, [tamanho]: novasCores } };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        if (!form.nome || !form.preco || !form.categoria || !form.imagem || !form.descricao) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }
        if (Object.keys(form.variantes).length === 0) {
            setErro("Adicione ao menos um tamanho.");
            return;
        }
        const tamanhoSemCor = Object.entries(form.variantes).some(([, cores]) => cores.length === 0);
        if (tamanhoSemCor) {
            setErro("Todos os tamanhos selecionados precisam ter ao menos uma cor.");
            return;
        }

        try {
            await editarProduto(produtoSelecionado.id, {
                ...produtoSelecionado,
                nome:      form.nome.trim(),
                preco:     parseFloat(form.preco),
                categoria: form.categoria,
                imagem:    form.imagem.trim(),
                descricao: form.descricao.trim(),
                variantes: form.variantes,
                destaque:  form.destaque,
            });
            setSucesso(true);
            setTimeout(() => setSucesso(false), 3000);
        } catch {
            setErro("Erro ao salvar as alterações. Tente novamente.");
        }
    }

    // ----- LISTA DE PRODUTOS -----
    if (!produtoSelecionado) {
        return (
            <div className="painel-conteudo">
                <h5 className="painel-titulo">
                    Editar Produto <BsPencilSquare className="ms-2" />
                </h5>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Clique em um produto para editar suas informações.
                </p>
                {produtos.length === 0 ? (
                    <Alert variant="info">Nenhum produto cadastrado.</Alert>
                ) : (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Referência</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Destaque</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.referencia}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.categoria}</td>
                                    <td>R$ {Number(produto.preco).toFixed(2)}</td>
                                    <td>
                                        {produto.destaque
                                            ? <Badge bg="warning" text="dark">Destaque</Badge>
                                            : <Badge bg="secondary">Normal</Badge>
                                        }
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            style={{ backgroundColor: "#003235", border: "none" }}
                                            onClick={() => selecionarProduto(produto)}
                                        >
                                            <BsPencilSquare className="me-1" /> Editar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        );
    }

    // ----- FORMULÁRIO DE EDIÇÃO -----
    return (
        <div className="painel-conteudo">
            <div className="d-flex align-items-center gap-3 mb-3">
                <Button variant="outline-secondary" size="sm" onClick={voltar}>
                    <BsArrowLeft className="me-1" /> Voltar à lista
                </Button>
                <h5 className="painel-titulo mb-0">
                    Editando: {produtoSelecionado.referencia} — {produtoSelecionado.nome}
                </h5>
            </div>

            {sucesso && <Alert variant="success">Produto atualizado com sucesso!</Alert>}
            {erro && <Alert variant="danger">{erro}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Referência</Form.Label>
                            <Form.Control value={produtoSelecionado.referencia} disabled />
                            <Form.Text className="text-muted">A referência não pode ser alterada.</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>Nome do produto *</Form.Label>
                            <Form.Control
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Ex: Camiseta Esportiva"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Preço (R$) *</Form.Label>
                            <Form.Control
                                type="number"
                                name="preco"
                                value={form.preco}
                                onChange={handleChange}
                                placeholder="Ex: 49.90"
                                min="0"
                                step="0.01"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Categoria *</Form.Label>
                            <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
                                <option value="">Selecione...</option>
                                {CATEGORIAS.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>URL da imagem *</Form.Label>
                            <Form.Control
                                name="imagem"
                                value={form.imagem}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Tamanhos disponíveis *
                        {!form.categoria && <span className="text-muted ms-2" style={{ fontSize: "0.8rem" }}>(selecione uma categoria primeiro)</span>}
                    </Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                        {tamanhosDaCategoria.map((tam) => (
                            <Button
                                key={tam}
                                type="button"
                                size="sm"
                                variant={form.variantes[tam] ? "success" : "outline-secondary"}
                                onClick={() => handleTamanho(tam)}
                                disabled={!form.categoria}
                            >
                                {tam}
                            </Button>
                        ))}
                    </div>
                </Form.Group>

                {Object.keys(form.variantes).length > 0 && (
                    <Form.Group className="mb-3">
                        <Form.Label>Cores por tamanho *</Form.Label>
                        <div className="d-flex flex-column gap-3">
                            {Object.keys(form.variantes).map((tam) => (
                                <div key={tam}>
                                    <span className="fw-bold me-2" style={{ fontSize: "0.9rem" }}>Tamanho {tam}:</span>
                                    <div className="d-flex gap-2 flex-wrap mt-1">
                                        {CORES_DISPONIVEIS.map((cor) => (
                                            <Button
                                                key={cor}
                                                type="button"
                                                size="sm"
                                                variant={form.variantes[tam]?.includes(cor) ? "success" : "outline-secondary"}
                                                onClick={() => handleCor(tam, cor)}
                                            >
                                                {cor}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                )}

                <Form.Group className="mb-4">
                    <Form.Label>Descrição *</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Descreva o produto..."
                    />
                </Form.Group>

                <Button type="submit" style={{ backgroundColor: "#003235", border: "none" }}>
                    Salvar alterações
                </Button>
            </Form>
        </div>
    );
}

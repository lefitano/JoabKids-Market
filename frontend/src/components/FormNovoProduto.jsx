import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { BsTags, BsXCircleFill, BsPlusCircle } from "react-icons/bs";
import { useProduto } from "../context/ProdutoContext";

const TAMANHOS_ROUPAS = ["2", "4", "6", "8", "10", "12", "14"];
const TAMANHOS_CALCADOS = ["24", "26", "28", "30", "32", "34"];
const CATEGORIAS = ["Masculino", "Feminino", "Calçados"];

const estadoInicial = {
    referencia: "",
    nome: "",
    preco: "",
    categoria: "",
    imagem: "",
    variantes: {},
    descricao: "",
};

export default function FormNovoProduto() {
    const { produtos, adicionarProduto } = useProduto();
    const [form, setForm] = useState(estadoInicial);
    const [inputCores, setInputCores] = useState({});
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState("");

    const tamanhosDaCategoria =
        form.categoria === "Calçados" ? TAMANHOS_CALCADOS : TAMANHOS_ROUPAS;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value, ...(name === "categoria" ? { variantes: {} } : {}) }));
        if (name === "categoria") setInputCores({});
    }

    function handleTamanho(tamanho) {
        setForm((prev) => {
            const novasVariantes = { ...prev.variantes };
            if (novasVariantes[tamanho] !== undefined) {
                delete novasVariantes[tamanho];
                setInputCores((prev) => { const n = { ...prev }; delete n[tamanho]; return n; });
            } else {
                novasVariantes[tamanho] = [];
            }
            return { ...prev, variantes: novasVariantes };
        });
    }

    function adicionarCor(tamanho) {
        const cor = (inputCores[tamanho] || "").trim();
        if (!cor) return;
        if (form.variantes[tamanho].includes(cor)) return;
        setForm((prev) => ({
            ...prev,
            variantes: { ...prev.variantes, [tamanho]: [...prev.variantes[tamanho], cor] },
        }));
        setInputCores((prev) => ({ ...prev, [tamanho]: "" }));
    }

    function removerCor(tamanho, cor) {
        setForm((prev) => ({
            ...prev,
            variantes: {
                ...prev.variantes,
                [tamanho]: prev.variantes[tamanho].filter((c) => c !== cor),
            },
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        if (!form.referencia || !form.nome || !form.preco || !form.categoria || !form.imagem || !form.descricao) {
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

        const novoProduto = {
            id: produtos.length + 1,
            referencia: form.referencia.trim(),
            nome: form.nome.trim(),
            preco: parseFloat(form.preco),
            categoria: form.categoria,
            imagem: form.imagem.trim(),
            variantes: form.variantes,
            descricao: form.descricao.trim(),
            destaque: false,
        };

        adicionarProduto(novoProduto);
        setForm(estadoInicial);
        setInputCores({});
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
    }

    return (
        <div className="painel-conteudo">
            <h5 className="painel-titulo">Novo Produto <BsTags className="ms-2"/></h5>

            {sucesso && <Alert variant="success">Produto adicionado com sucesso!</Alert>}
            {erro && <Alert variant="danger">{erro}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Referência *</Form.Label>
                            <Form.Control name="referencia" value={form.referencia} onChange={handleChange} placeholder="Ex: JK-007" />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>Nome do produto *</Form.Label>
                            <Form.Control name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Camiseta Esportiva" />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Preço (R$) *</Form.Label>
                            <Form.Control type="number" name="preco" value={form.preco} onChange={handleChange} placeholder="Ex: 49.90" min="0" step="0.01" />
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
                            <Form.Control name="imagem" value={form.imagem} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Variantes — Tamanhos e Cores *
                        {!form.categoria && <span className="text-muted ms-2" style={{ fontSize: "0.8rem" }}>(selecione uma categoria primeiro)</span>}
                    </Form.Label>
                    <div className="d-flex flex-column gap-3">
                        {tamanhosDaCategoria.map((tam) => (
                            <div key={tam} className="variante-linha">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant={form.variantes[tam] !== undefined ? "success" : "outline-secondary"}
                                    onClick={() => handleTamanho(tam)}
                                    disabled={!form.categoria}
                                    className="variante-tam-btn"
                                >
                                    {tam}
                                </Button>

                                {form.variantes[tam] !== undefined && (
                                    <div className="ms-3 d-flex flex-column gap-2 flex-grow-1">
                                        <div className="d-flex gap-2 flex-wrap">
                                            {form.variantes[tam].map((cor) => (
                                                <span key={cor} className="cor-tag">
                                                    {cor}
                                                    <BsXCircleFill
                                                        className="ms-1"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => removerCor(tam, cor)}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                        <div className="d-flex gap-2">
                                            <Form.Control
                                                size="sm"
                                                placeholder="Ex: Azul Royal"
                                                value={inputCores[tam] || ""}
                                                onChange={(e) => setInputCores((prev) => ({ ...prev, [tam]: e.target.value }))}
                                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); adicionarCor(tam); } }}
                                                style={{ maxWidth: "200px" }}
                                            />
                                            <Button type="button" size="sm" variant="outline-success" onClick={() => adicionarCor(tam)}>
                                                <BsPlusCircle className="me-1" /> Adicionar
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Descrição *</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descreva o produto..." />
                </Form.Group>

                <Button type="submit" style={{ backgroundColor: "#003235", border: "none" }}>
                    Adicionar produto
                </Button>
            </Form>
        </div>
    );
}

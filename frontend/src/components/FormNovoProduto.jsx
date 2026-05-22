import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useProduto } from "../context/ProdutoContext";
import { BsTags } from "react-icons/bs";

const TAMANHOS_ROUPAS = ["2", "4", "6", "8", "10", "12", "14"];
const CORES_DISPONIVEIS = ["Azul", "Branco", "Cinza", "Preto", "Rosa", "Vermelho", "Amarelo", "Verde", "Roxo", "Lilás", "Cáqui", "Azul Marinho", "Dourado", "Prata"];
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
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState("");

    const tamanhosDaCategoria =
        form.categoria === "Calçados" ? TAMANHOS_CALCADOS : TAMANHOS_ROUPAS;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value, ...(name === "categoria" ? {  variantes: {} } : {}) }));
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
            tamanhos: form.tamanhos,
            cores: form.cores.split(",").map((c) => c.trim()).filter(Boolean),
            descricao: form.descricao.trim(),
        };

        adicionarProduto(novoProduto);
        setForm(estadoInicial);
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
    }

    return (
        <div className="painel-conteudo">
            <h5 className="painel-titulo">Novo Produto<BsTags className="ms-2"/></h5>

            {sucesso && <Alert variant="success">Produto adicionado com sucesso!</Alert>}
            {erro && <Alert variant="danger">{erro}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Referência *</Form.Label>
                            <Form.Control
                                name="referencia"
                                value={form.referencia}
                                onChange={handleChange}
                                placeholder="Ex: JK-007"
                            />
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
                        {!form.categoria && <span className="text-muted ms-2" style={{fontSize:"0.8rem"}}>(selecione uma categoria primeiro)</span>}
                    </Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                        {tamanhosDaCategoria.map((tam) => (
                            <Button
                                key={tam}
                                type="button"
                                size="sm"
                                variant={form.tamanhos.includes(tam) ? "success" : "outline-secondary"}
                                onClick={() => handleTamanho(tam)}
                                disabled={!form.categoria}
                            >
                                {tam}
                            </Button>
                        ))}
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cores disponíveis *</Form.Label>
                    <Form.Control
                        name="cores"
                        value={form.cores}
                        onChange={handleChange}
                        placeholder="Ex: Azul, Branco, Cinza"
                    />
                    <Form.Text className="text-muted">Separe as cores por vírgula.</Form.Text>
                </Form.Group>

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
                    Adicionar produto
                </Button>
            </Form>
        </div>
    );
}

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { BsPencilSquare, BsArrowLeft } from "react-icons/bs";
import { useProduto } from "../context/ProdutoContext";

const CATEGORIAS = ["Masculino", "Feminino", "Calçados"];

export default function EditarProduto() {
    const { produtos, editarProduto } = useProduto();
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [form, setForm] = useState(null);
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState("");

    function selecionarProduto(produto) {
        setProdutoSelecionado(produto);
        setForm({
            referencia: produto.referencia,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria,
            imagemUrl: typeof produto.imagem === "string" ? produto.imagem : "",
            descricao: produto.descricao,
        });
        setSucesso(false);
        setErro("");
    }

    function voltar() {
        setProdutoSelecionado(null);
        setForm(null);
        setSucesso(false);
        setErro("");
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        if (!form.referencia || !form.nome || !form.preco || !form.categoria || !form.descricao) {
            setErro("Preencha todos os campos obrigatórios.");
            return;
        }

        const imagemFinal = form.imagemUrl.trim() || produtoSelecionado.imagem;

        const produtoEditado = {
            ...produtoSelecionado,
            referencia: form.referencia.trim(),
            nome: form.nome.trim(),
            preco: parseFloat(form.preco),
            categoria: form.categoria,
            imagem: imagemFinal,
            descricao: form.descricao.trim(),
        };

        editarProduto(produtoSelecionado.id, produtoEditado);
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);
    }

    if (!produtoSelecionado) {
        return (
            <div className="painel-conteudo">
                <h5 className="painel-titulo">Editar Produto <BsPencilSquare className="ms-2" /></h5>
                <p className="text-muted mb-3">Selecione um produto para editar:</p>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Referência</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.referencia}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.categoria}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
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
            </div>
        );
    }

    return (
        <div className="painel-conteudo">
            <div className="d-flex align-items-center mb-4">
                <Button variant="outline-secondary" size="sm" onClick={voltar} className="me-3">
                    <BsArrowLeft className="me-1" /> Voltar
                </Button>
                <h5 className="painel-titulo mb-0">
                    Editando: {produtoSelecionado.nome} <BsPencilSquare className="ms-2" />
                </h5>
            </div>

            {sucesso && <Alert variant="success">Produto atualizado com sucesso!</Alert>}
            {erro && <Alert variant="danger">{erro}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Referência *</Form.Label>
                            <Form.Control name="referencia" value={form.referencia} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>Nome do produto *</Form.Label>
                            <Form.Control name="nome" value={form.nome} onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Preço (R$) *</Form.Label>
                            <Form.Control type="number" name="preco" value={form.preco} onChange={handleChange} min="0" step="0.01" />
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
                            <Form.Label>URL da imagem</Form.Label>
                            <Form.Control
                                name="imagemUrl"
                                value={form.imagemUrl}
                                onChange={handleChange}
                                placeholder="Deixe em branco para manter a imagem atual"
                            />
                            <Form.Text className="text-muted d-flex align-items-center gap-2 mt-1">
                                Imagem atual:
                                <img src={produtoSelecionado.imagem} alt="" style={{ height: 40, borderRadius: 4 }} />
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Label>Descrição *</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descricao" value={form.descricao} onChange={handleChange} />
                </Form.Group>

                <Button type="submit" style={{ backgroundColor: "#003235", border: "none" }}>
                    Salvar alterações
                </Button>
            </Form>
        </div>
    );
}

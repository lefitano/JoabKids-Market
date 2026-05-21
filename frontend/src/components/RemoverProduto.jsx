import { useState } from 'react';
import { useProduto } from "../context/ProdutoContext";
import { BsTrash, BsExclamationTriangleFill } from 'react-icons/bs';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function RemoverProduto() {
    const { produtos, removerProduto } = useProduto();
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    function abrirConfirmacao(produto) {
        setProdutoSelecionado(produto);
    }

    function confirmarRemocao() {
        removerProduto(produtoSelecionado.id);
        setProdutoSelecionado(null);
    }

    return (
        <div className="painel-conteudo">
            <h5 className="painel-titulo">Remover Produto</h5>

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
                                    variant="danger"
                                    onClick={() => abrirConfirmacao(produto)}
                                >
                                    <BsTrash className="me-1" /> Remover
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={!!produtoSelecionado} onHide={() => setProdutoSelecionado(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <BsExclamationTriangleFill className="me-2" style={{ color: "#dc3545" }} />
                        Confirmar Remoção
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja remover <strong>{produtoSelecionado?.nome}</strong>? Essa ação não pode ser desfeita.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setProdutoSelecionado(null)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarRemocao}>
                        <BsTrash className="me-1" /> Remover
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

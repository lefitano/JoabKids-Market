import { useProduto } from "../context/ProdutoContext.jsx";
import Table from 'react-bootstrap/Table';

export default function ListarProdutos() {
    const { produtos } = useProduto();

    return (
        <div className='painel-conteudo'>
            <h5 className="painel-titulo">Produtos Cadastrados no catálogo</h5>

            <Table hover responsive>
                <thead>
                    <tr>
                        <th>Referência</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Tamanhos</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.referencia}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.categoria}</td>
                            <td>R$ {produto.preco.toFixed(2)}</td>
                            <td>{Object.keys(produto.variantes).join(",")}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

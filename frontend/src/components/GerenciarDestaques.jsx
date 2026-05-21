import { useProduto } from "../context/ProdutoContext";
import { BsStarFill, BsStar } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const MAX_DESTAQUES = 4;

export default function GerenciarDestaques() {
    const { produtos, toggleDestaque } = useProduto();
    const totalDestaques = produtos.filter(p => p.destaque).length;

    return (
        <div className="painel-conteudo">
            <h5 className="painel-titulo">
                Produtos em Destaque <BsStarFill className="ms-2" style={{ color: "#f59e0b" }} />
            </h5>

            {totalDestaques >= MAX_DESTAQUES && (
                <Alert variant="warning">
                    Limite de {MAX_DESTAQUES} destaques atingido. Remova um antes de adicionar outro.
                </Alert>
            )}

            <div className="d-flex flex-column gap-3">
                {produtos.map((produto) => (
                    <div key={produto.id} className="destaque-item d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <img
                                src={produto.imagem}
                                alt={produto.nome}
                                width={60}
                                height={60}
                                style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                            <div>
                                <strong>{produto.nome}</strong>
                                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                                    {produto.categoria} — R$ {produto.preco.toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <Button
                            variant={produto.destaque ? "warning" : "outline-secondary"}
                            size="sm"
                            onClick={() => toggleDestaque(produto.id)}
                            disabled={!produto.destaque && totalDestaques >= MAX_DESTAQUES}
                        >
                            {produto.destaque
                                ? <><BsStarFill className="me-1" />Em destaque</>
                                : <><BsStar className="me-1" />Destacar</>
                            }
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

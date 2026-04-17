import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BsGrid, BsArrowRepeat, BsCheckCircle, BsReceipt } from 'react-icons/bs';
import ProductCard from '../components/ProductCard.jsx';
import ImagemMasculino1 from '../assets/ImagesMascBanner.jpeg';
import ImagemMasculino2 from '../assets/ImagesMasc2Banner.jpeg';
import ImagemFeminino1 from '../assets/ImagesFeminBanner.jpeg';
import ImagemFeminino2 from '../assets/ImagesFemin2Banner.jpeg';
import ImagemCalcado1 from '../assets/Calcado1Banner.jpeg';
import ImagemCalcado2 from '../assets/Calcados2Banner.jpeg';
import '../css/Catalogo.css';

const produtos = [
    { id: 1, nome: "Camiseta Esportiva", preco: 39.90, categoria: "Masculino", imagem: ImagemMasculino1, tamanhos: ["2", "4", "6", "8", "10"],       descricao: "Camiseta leve em algodão, ideal para o dia a dia dos garotos." },
    { id: 2, nome: "Conjunto Casual",    preco: 59.90, categoria: "Masculino", imagem: ImagemMasculino2, tamanhos: ["4", "6", "8", "10", "12"],       descricao: "Conjunto com camiseta e bermuda, perfeito para passeios e brincadeiras." },
    { id: 3, nome: "Vestido Floral",     preco: 49.90, categoria: "Feminino",  imagem: ImagemFeminino1,  tamanhos: ["2", "4", "6", "8"],              descricao: "Vestido floral leve e encantador, ideal para ocasiões especiais." },
    { id: 4, nome: "Conjunto Rosa",      preco: 54.90, categoria: "Feminino",  imagem: ImagemFeminino2,  tamanhos: ["4", "6", "8", "10", "12"],       descricao: "Conjunto com blusa e calça, confortável e estiloso para o cotidiano." },
    { id: 5, nome: "Sandália Infantil",  preco: 34.90, categoria: "Calçados",  imagem: ImagemCalcado1,   tamanhos: ["24", "26", "28", "30"],          descricao: "Sandália infantil resistente e confortável, perfeita para o verão." },
    { id: 6, nome: "Tênis Colorido",     preco: 69.90, categoria: "Calçados",  imagem: ImagemCalcado2,   tamanhos: ["26", "28", "30", "32", "34"],    descricao: "Tênis colorido com solado macio, ideal para brincar e se movimentar." },
];

export default function Catalogo() {
    const [filtro, setFiltro] = useState("Todos");

    const produtosFiltrados = filtro === "Todos"
        ? produtos
        : produtos.filter(p => p.categoria === filtro);

    return (
        <>
            <div className="catalogo-titulo">
                <h2><BsGrid className="me-2" />Catálogo de Produtos</h2>
                <p>Encontre o look perfeito para os seus filhos</p>
            </div>

            <Container className="catalogo-container">

                <div className="filtros-wrapper">
                    <ButtonGroup>
                        {["Todos", "Masculino", "Feminino", "Calçados"].map(categoria => (
                            <Button
                                key={categoria}
                                className={filtro === categoria ? "btn-filtro ativo" : "btn-filtro"}
                                onClick={() => setFiltro(categoria)}
                            >
                                {categoria}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>

                <Row className="g-4">
                    {produtosFiltrados.map(produto => (
                        <ProductCard key={produto.id} produto={produto} />
                    ))}
                </Row>

            </Container>

            <section className="trocas-section">
                <Container>
                    <h2 className="section-titulo claro">Política de Trocas</h2>
                    <p className="section-subtitulo trocas-subtitulo">
                        Sua satisfação é nossa prioridade
                    </p>
                    <Row className="g-4 text-center">

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsArrowRepeat className="troca-icone" size={42} />
                                <h5>Prazo de 14 dias!</h5>
                                <p>Aceitamos trocas em até 14 dias após a data da compra.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsCheckCircle className="troca-icone" size={42} />
                                <h5>Produto sem uso</h5>
                                <p>O item deve estar sem uso, com etiqueta e na embalagem original.</p>
                            </div>
                        </Col>

                        <Col xs={12} sm={4}>
                            <div className="troca-item">
                                <BsReceipt className="troca-icone" size={42} />
                                <h5>Mediante comprovante</h5>
                                <p>É necessário apresentar o comprovante de compra na solicitação.</p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    );
}

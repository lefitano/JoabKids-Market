import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function ProductCard({ produto }) {
    const navigate = useNavigate();

    return (
        <Col xs={12} sm={6} md={4}>
            <Card className="produto-card">
                <Card.Img
                    variant="top"
                    src={produto.imagem}
                    className="produto-img"
                />
                <Card.Body className="d-flex flex-column">
                    <Badge className="badge-categoria mb-2 align-self-start">
                        {produto.categoria}
                    </Badge>
                    <Card.Title className="produto-nome">{produto.nome}</Card.Title>
                    <Card.Text className="produto-preco">
                        R$ {produto.preco.toFixed(2)}
                    </Card.Text>
                    <Button
                        className="btn-ver-produto mt-auto"
                        onClick={() => navigate('/produto', { state: { produto } })}
                    >
                        Ver produto
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

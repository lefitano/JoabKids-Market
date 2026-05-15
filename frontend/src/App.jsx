import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrinho from './pages/Carrinho.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import Produto from './pages/Produto.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { CarrinhoProvider } from './context/CarrinhoContext.jsx';

export default function App() {
  const { pathname } = useLocation();
  return (
    <CarrinhoProvider>
      <Header />
      <div key={pathname} className="pagina-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="login" element={<Login />} />
        <Route path="produto" element={<Produto />} />
      </Routes>
      </div>
      <Footer />
    </CarrinhoProvider>
  );
}

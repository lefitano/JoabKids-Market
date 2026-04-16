import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Carrinho from './pages/Carrinho.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import Produto from './pages/Produto.jsx';
import Header from './components/Header.jsx';
export default function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalogo" element={<Catalogo/>} />
      <Route path="carrinho" element={<Carrinho/>} />
      <Route path="cadastro" element={<Cadastro/>} />
      <Route path="login" element={<Login/>} />
      <Route path="produto" element={<Produto/>} />
    </Routes>
      
    </>
  )
}

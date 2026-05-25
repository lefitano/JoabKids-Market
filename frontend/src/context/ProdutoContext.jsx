import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";

const ProdutoContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function getAuthHeader() {
    const token = await auth.currentUser?.getIdToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export function ProdutoProvider({ children }) {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const res = await fetch(`${API_URL}/api/produtos`);
                if (!res.ok) throw new Error("Erro ao buscar produtos");
                const data = await res.json();
                setProdutos(data);
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
                setErro("Não foi possível carregar os produtos.");
            } finally {
                setCarregando(false);
            }
        }
        carregarProdutos();
    }, []);

    async function adicionarProduto(produto) {
        const authHeader = await getAuthHeader();
        const res = await fetch(`${API_URL}/api/produtos`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeader },
            body: JSON.stringify(produto),
        });
        if (!res.ok) throw new Error("Erro ao adicionar produto");
        const novo = await res.json();
        setProdutos((prev) => [...prev, novo]);
    }

    async function removerProduto(id) {
        const authHeader = await getAuthHeader();
        const res = await fetch(`${API_URL}/api/produtos/${id}`, {
            method: "DELETE",
            headers: authHeader,
        });
        if (!res.ok) throw new Error("Erro ao remover produto");
        setProdutos((prev) => prev.filter((p) => p.id !== id));
    }

    async function editarProduto(id, dadosNovos) {
        const authHeader = await getAuthHeader();
        const { id: _id, ...dados } = dadosNovos;
        const res = await fetch(`${API_URL}/api/produtos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeader },
            body: JSON.stringify(dados),
        });
        if (!res.ok) throw new Error("Erro ao editar produto");
        const atualizado = await res.json();
        setProdutos((prev) => prev.map((p) => (p.id === id ? atualizado : p)));
    }

    async function toggleDestaque(id) {
        const produto = produtos.find((p) => p.id === id);
        if (!produto) return;
        await editarProduto(id, { ...produto, destaque: !produto.destaque });
    }

    return (
        <ProdutoContext.Provider
            value={{ produtos, carregando, erro, adicionarProduto, removerProduto, editarProduto, toggleDestaque }}
        >
            {children}
        </ProdutoContext.Provider>
    );
}

export function useProduto() {
    return useContext(ProdutoContext);
}

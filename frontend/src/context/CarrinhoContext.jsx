import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

const STORAGE_KEY = "joabkids:carrinho";

function carregarCarrinho() {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(carregarCarrinho);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch {
    }
  }, [itens]);

  function adicionarItem(produto) {
    setItens((prev) => [...prev, produto]);
  }

  function removerItem(index) {
    setItens((prev) => prev.filter((_, i) => i !== index));
  }

  function limparCarrinho() {
    setItens([]);
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

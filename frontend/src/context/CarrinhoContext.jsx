import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvo = localStorage.getItem("carrinho");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
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
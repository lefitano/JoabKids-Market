import { createContext, useContext, useState } from "react";
import ImagemMasculino1 from '../assets/ImagesMascBanner.jpeg';
import ImagemMasculino2 from '../assets/ImagesMasc2Banner.jpeg';
import ImagemFeminino1 from '../assets/ImagesFeminBanner.jpeg';
import ImagemFeminino2 from '../assets/ImagesFemin2Banner.jpeg';
import ImagemCalcado1 from '../assets/Calcado1Banner.jpeg';
import ImagemCalcado2 from '../assets/Calcados2Banner.jpeg';

const ProdutoContext = createContext();

export function ProdutoProvider({children}){
    const [produtos, setProdutos] = useState([
        {
            id: 1, referencia: "JK-001", nome: "Camiseta Esportiva", preco: 39.90,
            categoria: "Masculino", imagem: ImagemMasculino1, destaque: true,
            descricao: "Camiseta leve em algodão, ideal para o dia a dia dos garotos.",
            variantes: {
                "2":  ["Azul", "Cinza"],
                "4":  ["Azul", "Branco", "Cinza"],
                "6":  ["Azul", "Branco", "Cinza"],
                "8":  ["Branco", "Cinza"],
                "10": ["Azul"],
            },
        },
        {
            id: 2, referencia: "JK-002", nome: "Conjunto Casual", preco: 59.90,
            categoria: "Masculino", imagem: ImagemMasculino2, destaque: true,
            descricao: "Conjunto com camiseta e bermuda, perfeito para passeios e brincadeiras.",
            variantes: {
                "4":  ["Preto", "Cáqui"],
                "6":  ["Preto", "Azul Marinho", "Cáqui"],
                "8":  ["Preto"],
                "10": ["Preto", "Azul Marinho", "Cáqui"],
                "12": ["Azul Marinho"],
            },
        },
        {
            id: 3, referencia: "JK-003", nome: "Vestido Floral", preco: 49.90,
            categoria: "Feminino", imagem: ImagemFeminino1, destaque: true,
            descricao: "Vestido floral leve e encantador, ideal para ocasiões especiais.",
            variantes: {
                "2": ["Rosa", "Amarelo"],
                "4": ["Rosa", "Lilás", "Amarelo"],
                "6": ["Rosa", "Lilás"],
                "8": ["Lilás", "Amarelo"],
            },
        },
        {
            id: 4, referencia: "JK-004", nome: "Conjunto Rosa", preco: 54.90,
            categoria: "Feminino", imagem: ImagemFeminino2, destaque: true,
            descricao: "Conjunto com blusa e calça, confortável e estiloso para o cotidiano.",
            variantes: {
                "4":  ["Rosa", "Branco"],
                "6":  ["Rosa", "Branco", "Roxo"],
                "8":  ["Branco", "Roxo"],
                "10": ["Rosa", "Roxo"],
                "12": ["Rosa"],
            },
        },
        {
            id: 5, referencia: "JK-005", nome: "Sandália Infantil", preco: 34.90,
            categoria: "Calçados", imagem: ImagemCalcado1, destaque: true,
            descricao: "Sandália infantil resistente e confortável, perfeita para o verão.",
            variantes: {
                "24": ["Dourado", "Rosa"],
                "26": ["Dourado", "Prata", "Rosa"],
                "28": ["Prata", "Rosa"],
                "30": ["Dourado"],
            },
        },
        {
            id: 6, referencia: "JK-006", nome: "Tênis Colorido", preco: 69.90,
            categoria: "Calçados", imagem: ImagemCalcado2, destaque: true,
            descricao: "Tênis colorido com solado macio, ideal para brincar e se movimentar.",
            variantes: {
                "26": ["Branco"],
                "28": ["Branco", "Preto"],
                "30": ["Branco", "Preto", "Azul"],
                "32": ["Preto", "Azul"],
                "34": ["Azul"],
            },
        },
    ])

    function adicionarProduto(produto){
        setProdutos((prev) => [...prev, produto]);
    }

    function removerProduto(id){
        setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    }

    function editarProduto(id, dadosNovos){
        setProdutos((prev) => prev.map((produto) => produto.id === id ? dadosNovos : produto));
    }

    function toggleDestaque(id){
        setProdutos((prev) => prev.map((produto) =>
            produto.id === id ? { ...produto, destaque: !produto.destaque } : produto
        ));
    }

    return (
        <ProdutoContext.Provider value={{produtos, adicionarProduto, removerProduto, editarProduto, toggleDestaque}}>
            {children}
        </ProdutoContext.Provider>
    )
}

export function useProduto(){
    return useContext(ProdutoContext)
}

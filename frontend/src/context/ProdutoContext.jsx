import { createContext, useContext, useState } from "react";
import ImagemMasculino1 from '../assets/ImagesMascBanner.jpeg';
import ImagemMasculino2 from '../assets/ImagesMasc2Banner.jpeg';
import ImagemFeminino1 from '../assets/ImagesFeminBanner.jpeg';
import ImagemFeminino2 from '../assets/ImagesFemin2Banner.jpeg';
import ImagemCalcado1 from '../assets/Calcado1Banner.jpeg';
import ImagemCalcado2 from '../assets/Calcados2Banner.jpeg';

const ProdutoContext = createContext();

export function ProdutoProvider({children}){
    const [produtos, setProdutos] = useState( [
        { id: 1, referencia: "JK-001", nome: "Camiseta Esportiva", preco: 39.90, categoria: "Masculino", imagem: ImagemMasculino1, tamanhos: ["2", "4", "6", "8", "10"],    cores: ["Azul", "Branco", "Cinza"],         descricao: "Camiseta leve em algodão, ideal para o dia a dia dos garotos.", destaque: true },
        { id: 2, referencia: "JK-002", nome: "Conjunto Casual",    preco: 59.90, categoria: "Masculino", imagem: ImagemMasculino2, tamanhos: ["4", "6", "8", "10", "12"],   cores: ["Preto", "Azul Marinho", "Cáqui"],  descricao: "Conjunto com camiseta e bermuda, perfeito para passeios e brincadeiras.", destaque: true },
        { id: 3, referencia: "JK-003", nome: "Vestido Floral",     preco: 49.90, categoria: "Feminino",  imagem: ImagemFeminino1,  tamanhos: ["2", "4", "6", "8"],          cores: ["Rosa", "Lilás", "Amarelo"],        descricao: "Vestido floral leve e encantador, ideal para ocasiões especiais.", destaque: true },
        { id: 4, referencia: "JK-004", nome: "Conjunto Rosa",      preco: 54.90, categoria: "Feminino",  imagem: ImagemFeminino2,  tamanhos: ["4", "6", "8", "10", "12"],   cores: ["Rosa", "Branco", "Roxo"],          descricao: "Conjunto com blusa e calça, confortável e estiloso para o cotidiano.", destaque: true },
        { id: 5, referencia: "JK-005", nome: "Sandália Infantil",  preco: 34.90, categoria: "Calçados",  imagem: ImagemCalcado1,   tamanhos: ["24", "26", "28", "30"],      cores: ["Dourado", "Prata", "Rosa"],        descricao: "Sandália infantil resistente e confortável, perfeita para o verão.", destaque: true },
        { id: 6, referencia: "JK-006", nome: "Tênis Colorido",     preco: 69.90, categoria: "Calçados",  imagem: ImagemCalcado2,   tamanhos: ["26", "28", "30", "32", "34"], cores: ["Branco", "Preto", "Azul"],        descricao: "Tênis colorido com solado macio, ideal para brincar e se movimentar.", destaque: true },
    ])
    function adicionarProduto(produto){
        setProdutos((prev) => [...prev, produto]);
    }

    function removerProduto(id){
        setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    }

    function editarProduto(id, dadosNovos){
        setProdutos((prev) => prev.map((produto) => produto.id === id ? dadosNovos: produto
    ));
    }
     function toggleDestaque(id){
        setProdutos((prev) => prev.map((produto) => produto.id === id ?{ ...produto, destaque: !produto.destaque} : produto
    ))
    }

    return (
        <ProdutoContext.Provider value = {{produtos, adicionarProduto, removerProduto, editarProduto, toggleDestaque}}>
            {children}
        </ProdutoContext.Provider>
    )

}


export function useProduto(){
    return useContext(ProdutoContext)
}


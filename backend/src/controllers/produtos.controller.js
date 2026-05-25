import * as produtosService from "../services/produtos.service.js";

export async function listarProdutos(req, res, next) {
  try {
    const produtos = await produtosService.listarTodos();
    res.json(produtos);
  } catch (error) {
    next(error);
  }
}

export async function buscarProdutoPorId(req, res, next) {
  try {
    const { id } = req.params;
    const produto = await produtosService.buscarPorId(id);
    if (!produto) {
      return res.status(404).json({ error: "Produto nao encontrado" });
    }
    res.json(produto);
  } catch (error) {
    next(error);
  }
}

export async function criarProduto(req, res, next) {
  try {
    const { referencia, nome, preco, categoria, imagem, variantes, descricao } = req.body;
    if (!referencia || !nome || preco == null || !categoria || !imagem || !variantes || !descricao) {
      return res.status(400).json({
        error: "Campos obrigatorios: referencia, nome, preco, categoria, imagem, variantes, descricao",
      });
    }
    const novoProduto = await produtosService.criar(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    next(error);
  }
}

export async function atualizarProduto(req, res, next) {
  try {
    const { id } = req.params;
    const produtoAtualizado = await produtosService.atualizar(id, req.body);
    if (!produtoAtualizado) {
      return res.status(404).json({ error: "Produto nao encontrado" });
    }
    res.json(produtoAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarProduto(req, res, next) {
  try {
    const { id } = req.params;
    const deletou = await produtosService.deletar(id);
    if (!deletou) {
      return res.status(404).json({ error: "Produto nao encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

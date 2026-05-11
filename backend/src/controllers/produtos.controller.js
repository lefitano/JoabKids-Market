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
    res.json(produto);
  } catch (error) {
    next(error);
  }
}

export async function criarProduto(req, res, next) {
  try {
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
    res.json(produtoAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarProduto(req, res, next) {
  try {
    const { id } = req.params;
    await produtosService.deletar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

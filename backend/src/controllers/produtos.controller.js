import * as produtosService from "../services/produtos.service.js";

export async function listarProdutos(req, res, next) {
  try {
    const produtos = await produtosService.listarTodos();
    res.json(produtos);
  } catch (error) {
    next(error);
  }
}

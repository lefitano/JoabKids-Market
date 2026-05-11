import * as pedidosService from "../services/pedidos.service.js";

export async function listarPedidos(req, res, next) {
  try {
    const pedidos = await pedidosService.listarTodos();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
}

export async function buscarPedidoPorId(req, res, next) {
  try {
    const { id } = req.params;
    const pedido = await pedidosService.buscarPorId(id);
    res.json(pedido);
  } catch (error) {
    next(error);
  }
}

export async function criarPedido(req, res, next) {
  try {
    const novoPedido = await pedidosService.criar(req.body);
    res.status(201).json(novoPedido);
  } catch (error) {
    next(error);
  }
}

export async function atualizarPedido(req, res, next) {
  try {
    const { id } = req.params;
    const pedidoAtualizado = await pedidosService.atualizar(id, req.body);
    res.json(pedidoAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarPedido(req, res, next) {
  try {
    const { id } = req.params;
    await pedidosService.deletar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

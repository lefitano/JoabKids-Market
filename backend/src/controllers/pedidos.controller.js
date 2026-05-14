import * as pedidosService from "../services/pedidos.service.js";

export async function listarPedidos(req, res, next) {
  try {
    const pedidos = await pedidosService.listarPorUsuario(req.user.uid);
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
}

export async function buscarPedidoPorId(req, res, next) {
  try {
    const { id } = req.params;
    const pedido = await pedidosService.buscarPorId(id);
    if (!pedido) {
      return res.status(404).json({ error: "Pedido nao encontrado" });
    }
    if (pedido.userId !== req.user.uid) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    res.json(pedido);
  } catch (error) {
    next(error);
  }
}

export async function criarPedido(req, res, next) {
  try {
    const { itens, total } = req.body;
    if (!Array.isArray(itens) || itens.length === 0 || total == null) {
      return res.status(400).json({
        error: "Campos obrigatorios: itens (array nao vazio), total",
      });
    }
    const novoPedido = await pedidosService.criar({
      ...req.body,
      userId: req.user.uid,
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    next(error);
  }
}

export async function atualizarPedido(req, res, next) {
  try {
    const { id } = req.params;
    const existente = await pedidosService.buscarPorId(id);
    if (!existente) {
      return res.status(404).json({ error: "Pedido nao encontrado" });
    }
    if (existente.userId !== req.user.uid) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    const pedidoAtualizado = await pedidosService.atualizar(id, req.body);
    res.json(pedidoAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarPedido(req, res, next) {
  try {
    const { id } = req.params;
    const existente = await pedidosService.buscarPorId(id);
    if (!existente) {
      return res.status(404).json({ error: "Pedido nao encontrado" });
    }
    if (existente.userId !== req.user.uid) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    await pedidosService.deletar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

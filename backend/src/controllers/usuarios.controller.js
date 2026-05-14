import * as usuariosService from "../services/usuarios.service.js";

export async function cadastrarUsuario(req, res, next) {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "Campo obrigatorio: uid" });
    }
    const novoUsuario = await usuariosService.cadastrar(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    next(error);
  }
}

export async function loginUsuario(req, res, next) {
  try {
    const { email, senha } = req.body;
    const resultado = await usuariosService.login(email, senha);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

export async function buscarUsuarioPorId(req, res, next) {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.buscarPorId(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario nao encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
}

export async function atualizarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuariosService.atualizar(id, req.body);
    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuario nao encontrado" });
    }
    res.json(usuarioAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const deletou = await usuariosService.deletar(id);
    if (!deletou) {
      return res.status(404).json({ error: "Usuario nao encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

import * as usuariosService from "../services/usuarios.service.js";

export async function cadastrarUsuario(req, res, next) {
  try {
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
    res.json(usuario);
  } catch (error) {
    next(error);
  }
}

export async function atualizarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuariosService.atualizar(id, req.body);
    res.json(usuarioAtualizado);
  } catch (error) {
    next(error);
  }
}

export async function deletarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    await usuariosService.deletar(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

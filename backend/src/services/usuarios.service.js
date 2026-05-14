import admin from "firebase-admin";

const COLECAO = "usuarios";

export async function cadastrar(dados) {
  const { uid, ...perfil } = dados;
  // usa o uid do Firebase Auth como id do documento
  await admin.firestore().collection(COLECAO).doc(uid).set({
    ...perfil,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const doc = await admin.firestore().collection(COLECAO).doc(uid).get();
  return { id: doc.id, ...doc.data() };
}

export async function login(email, senha) {
  // login real e feito pelo Firebase Auth no frontend
  return { message: "Login deve ser feito pelo Firebase Auth no frontend" };
}

export async function buscarPorId(id) {
  const doc = await admin.firestore().collection(COLECAO).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function atualizar(id, dados) {
  const ref = admin.firestore().collection(COLECAO).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;

  await ref.update({
    ...dados,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const atualizado = await ref.get();
  return { id: atualizado.id, ...atualizado.data() };
}

export async function deletar(id) {
  const ref = admin.firestore().collection(COLECAO).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;

  await ref.delete();
  return true;
}

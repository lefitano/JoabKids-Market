import admin from "firebase-admin";

const COLECAO = "pedidos";

export async function listarPorUsuario(userId) {
  const snapshot = await admin
    .firestore()
    .collection(COLECAO)
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function buscarPorId(id) {
  const doc = await admin.firestore().collection(COLECAO).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function criar(dados) {
  const ref = await admin.firestore().collection(COLECAO).add({
    ...dados,
    status: dados.status || "pendente",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  const doc = await ref.get();
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

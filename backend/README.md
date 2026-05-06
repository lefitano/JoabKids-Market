# Joab Kids Market - Backend

API REST do e-commerce Joab Kids, construída com Node.js + Express e Firebase Admin SDK.

## Estrutura

```
backend/
├── src/
│   ├── config/         # Configurações (Firebase, etc.)
│   ├── controllers/    # Lógica das rotas (recebe req/res)
│   ├── routes/         # Definição dos endpoints
│   ├── services/       # Regras de negócio e acesso ao banco
│   ├── middlewares/    # Middlewares (erros, autenticação, etc.)
│   ├── app.js          # Configuração do Express
│   └── server.js       # Inicialização do servidor
├── .env.example        # Variáveis de ambiente de exemplo
└── package.json
```

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e ajuste os valores.

3. Coloque o arquivo de credenciais do Firebase (`serviceAccountKey.json`) na raiz do `backend/`.

4. Inicie em modo desenvolvimento:
   ```bash
   npm run dev
   ```

   Ou em produção:
   ```bash
   npm start
   ```

A API ficará em `http://localhost:3000`.

## Endpoints iniciais

- `GET /` - Mensagem de boas-vindas
- `GET /api/produtos` - Exemplo de rota (placeholder)

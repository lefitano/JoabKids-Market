# Joab Kids — Documentação de Funcionamento do Site

## Visão Geral

O site da Joab Kids é uma vitrine digital de roupas e calçados infantis.
Ele é dividido em duas áreas distintas: a **área pública**, acessível por qualquer visitante,
e a **área administrativa**, restrita ao dono da loja.

---

## Área Pública

### Quem acessa
Qualquer pessoa que abrir o site. Não é necessário cadastro nem login.

### Navegação (Header)
| Botão | Destino | Descrição |
|---|---|---|
| Página Inicial | `/` | Banner e seções da Home |
| Catálogo | `/catalogo` | Grade de produtos com filtros |
| Carrinho | `/carrinho` | Itens selecionados e finalização |

> O botão **Admin não aparece no Header público**. O acesso ao painel administrativo
> é feito diretamente pela URL `/admin`, conhecida apenas pelo dono da loja.
> Essa decisão evita expor a existência do painel para visitantes comuns
> e torna a navegação mais limpa e profissional.

### Páginas disponíveis

#### Home (`/`)
- Banner com carrossel de imagens
- Seção de categorias: Masculino, Feminino, Calçados
- Seção de diferenciais da loja

#### Catálogo (`/catalogo`)
- Filtros por categoria: Todos, Masculino, Feminino, Calçados
- Grade de cards de produtos
- Cada card exibe: imagem, categoria, nome e preço
- Botão "Ver produto" leva à página de detalhes

#### Produto (`/produto`)
- Imagem do produto
- Seletor de tamanho
- Seletor de cor
- Seletor de quantidade
- Botão "Adicionar ao carrinho"
- Card de especificações

#### Carrinho (`/carrinho`)
- Lista de itens adicionados
- Formulário de endereço de entrega
- Total da compra
- Botão "Finalizar pelo WhatsApp" — envia mensagem formatada ao lojista

---

## Área Administrativa

### Quem acessa
Somente o dono da loja, através de credenciais fixas definidas no sistema.

### Como acessar

O painel administrativo **não possui link visível no site**. O acesso é feito
digitando diretamente o endereço `/admin` na barra do navegador:

```
https://seusite.com/admin
```

Essa abordagem é intencional: evita que visitantes comuns saibam da existência
do painel e tenta o acesso por curiosidade.

### Fluxo de acesso

```
Admin digita a URL /admin no navegador
            │
            ▼
    Página /admin exibe tela de login
    ┌──────────────────────────────┐
    │       🔒 Área do Admin       │
    │                              │
    │  Email:  [_______________]   │
    │  Senha:  [_______________]   │
    │                              │
    │       [ Entrar ]             │
    └──────────────────────────────┘
            │
    Credenciais corretas?
            │
     Sim ───┼─── Não
            │         │
            │         ▼
            │   Exibe mensagem de erro
            │
            ▼
    Painel administrativo liberado
```

### Painel Administrativo

Após o login bem-sucedido, o administrador vê uma navbar interna com três opções:

```
┌─────────────────────────────────────────────────┐
│  Painel Admin  │ + Novo Produto │ ✏ Editar │ 🗑  │
└─────────────────────────────────────────────────┘
│                                                 │
│            [conteúdo da aba ativa]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Aba — Novo Produto
Formulário para cadastrar um produto no catálogo:
- Nome do produto
- Preço
- Categoria (Masculino / Feminino / Calçados)
- Tamanhos disponíveis
- Cores disponíveis
- Descrição
- Imagem

#### Aba — Editar / Estoque
- Tabela com todos os produtos cadastrados
- Cada linha tem um botão "Editar"
- Ao clicar, o formulário é preenchido com os dados do produto
- O administrador altera o que quiser e salva

#### Aba — Remover
- Tabela com todos os produtos cadastrados
- Cada linha tem um botão "Remover"
- Confirmação antes de excluir definitivamente

---

## Gerenciamento de Dados — ProdutosContext

Os produtos do catálogo deixam de ser um array fixo no código
e passam a ser gerenciados por um **Contexto React** (`ProdutosContext.jsx`),
acessível tanto pelo Catálogo quanto pelo Painel Admin.

| Função do Contexto | O que faz |
|---|---|
| `produtos` | Retorna a lista atual de produtos |
| `adicionarProduto` | Adiciona um novo produto à lista |
| `editarProduto` | Atualiza os dados de um produto pelo ID |
| `removerProduto` | Remove um produto da lista pelo ID |

O `Catalogo.jsx` passa a **ler** do contexto.
O `Admin.jsx` **lê e escreve** no contexto.

---

## Arquivos a Criar ou Alterar

| Arquivo | Ação | Motivo |
|---|---|---|
| `src/context/ProdutosContext.jsx` | Criar | Centralizar os dados dos produtos |
| `src/pages/Admin.jsx` | Implementar | Tela de login + painel de gestão |
| `src/css/Admin.css` | Criar | Estilização do painel administrativo |
| `src/pages/Catalogo.jsx` | Alterar | Ler produtos do contexto em vez do array fixo |
| `src/App.jsx` | Alterar | Adicionar rota `/admin`, remover rotas de login e cadastro de clientes |
| `src/components/Header.jsx` | Alterar | Remover botões "Entrar", "Cadastrar" e "Admin" — navbar pública fica apenas com Home, Catálogo e Carrinho |
| `src/pages/Login.jsx` | Remover | Substituído pela tela de login dentro do Admin |
| `src/pages/Cadastro.jsx` | Remover | Não necessário — admin tem credenciais fixas |
| `src/css/Login.css` | Remover | CSS do arquivo removido |
| `src/css/Cadastro.css` | Remover | CSS do arquivo removido |

---

## Observação Acadêmica

A proteção por credenciais fixas no frontend **não representa segurança real**,
pois qualquer pessoa com acesso ao código pode ver as credenciais.
Para um ambiente de produção, o painel administrativo exigiria autenticação
via backend com token JWT ou similar.

Para fins acadêmicos, essa abordagem é válida e demonstra os conceitos de:
controle de estado com `useState`, renderização condicional, Context API e separação de responsabilidades entre páginas.

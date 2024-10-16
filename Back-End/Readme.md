# Estrutura do Backend e Integração com o Frontend

O seu backend é construído usando o framework Express e possui várias rotas organizadas para lidar com categorias, filmes, avaliações e usuários. Vamos detalhar cada controlador, suas rotas, descrições e como você pode utilizá-las no frontend.

## Link do Deploy 
https://movieopinions-backend.onrender.com

## 1. CategoryController

- **Rota: `GET /categories`**
  - **Descrição:** Retorna todas as categorias disponíveis.
  - **Uso no Frontend:** Chame essa rota para popular um dropdown ou lista de categorias que o usuário pode escolher ao adicionar ou filtrar filmes.

- **Rota: `GET /categories/:id`**
  - **Descrição:** Retorna uma categoria específica pelo ID.
  - **Uso no Frontend:** Útil para exibir detalhes de uma categoria ou mostrar filmes filtrados por essa categoria.

## 2. MovieController

- **Rota: `GET /movies`**
  - **Descrição:** Retorna todos os filmes com suas respectivas categorias.
  - **Uso no Frontend:** Use essa rota para exibir uma lista de filmes em uma página inicial ou em um catálogo.

- **Rota: `GET /movies/:id`**
  - **Descrição:** Retorna um filme específico pelo ID.
  - **Uso no Frontend:** Esta rota pode ser usada para exibir uma página de detalhes do filme, mostrando informações como título, descrição, categoria e outros detalhes.

## 3. ReviewController

- **Rota: `POST /reviews/:movieId`**
  - **Descrição:** Cria uma nova avaliação para um filme especificado.
  - **Uso no Frontend:** Um formulário onde os usuários podem enviar suas avaliações para um filme específico.

- **Rota: `GET /reviews`**
  - **Descrição:** Retorna várias avaliações (pode ser filtrado por filme).
  - **Uso no Frontend:** Para mostrar avaliações de um filme em sua página de detalhes.

- **Rota: `GET /reviews/:id`**
  - **Descrição:** Retorna uma avaliação específica pelo ID.
  - **Uso no Frontend:** Útil para exibir detalhes de uma avaliação específica.

- **Rota: `PATCH /reviews/:id`**
  - **Descrição:** Atualiza uma avaliação existente.
  - **Uso no Frontend:** Permite que os usuários editem suas avaliações.

- **Rota: `DELETE /reviews/:id`**
  - **Descrição:** Exclui uma avaliação pelo ID.
  - **Uso no Frontend:** Chamado quando um usuário decide excluir sua avaliação.

## 4. UserController

- **Rota: `POST /users/register`**
  - **Descrição:** Registra um novo usuário.
  - **Uso no Frontend:** O formulário de registro deve enviar os dados para esta rota.

- **Rota: `POST /users/login`**
  - **Descrição:** Realiza o login de um usuário.
  - **Uso no Frontend:** O formulário de login deve enviar as credenciais para esta rota.

- **Rota: `GET /users/profile`**
  - **Descrição:** Retorna as informações do perfil do usuário autenticado.
  - **Uso no Frontend:** Mostre informações do perfil do usuário após o login.

## Como Integrar com o Frontend

Ao desenvolver o frontend, use uma biblioteca ou framework como **React**, **Angular** ou **Vue.js** para gerenciar o estado da aplicação e as interações com a API. Aqui estão algumas dicas:

1. **Configuração de um Cliente HTTP:** Use uma biblioteca como **Axios** ou **Fetch API** para fazer chamadas HTTP às rotas do backend.

2. **Gerenciamento de Estado:** Use **Context API** ou uma biblioteca como **Redux** para gerenciar dados globais (informações do usuário e filmes).

3. **Manipulação de Dados:** Após obter os dados das rotas, armazene-os em estado e renderize-os em componentes. Por exemplo, use `GET /categories` para renderizar categorias em um dropdown.

4. **Formulários:** Utilize formulários controlados para capturar dados de entrada do usuário e envie-os para as rotas apropriadas.

5. **Rotas do Frontend:** Configure as rotas do aplicativo frontend (usando **React Router** ou similar) para corresponder às páginas que deseja exibir.

## Exemplo de chamada de API com Axios

```javascript
import axios from 'axios';

// Obtendo todas as categorias
async function fetchCategories() {
  try {
    const response = await axios.get('/categories');
    return response.data; // Retorna todas as categorias
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

// Enviando uma nova avaliação
async function createReview(movieId, reviewData) {
  try {
    const response = await axios.post(`/reviews/${movieId}`, reviewData);
    return response.data; // Retorna a nova avaliação criada
  } catch (error) {
    console.error('Error creating review:', error);
  }
}

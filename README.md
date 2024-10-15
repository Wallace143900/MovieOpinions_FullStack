# Documentação do Backend

## Estrutura do Projeto

O backend é desenvolvido com **Node.js** e **Express**, utilizando o **TypeScript** para garantir um código tipado e seguro. A estrutura do projeto é organizada em várias camadas, incluindo controladores, serviços e middleware, que trabalham em conjunto para fornecer uma API RESTful robusta.

## Controladores

### CategoryController

Responsável pelas operações relacionadas a categorias:

- `getCategoryById(req: Request, res: Response)`: Retorna uma categoria específica pelo seu ID.
- `getAllCategories(req: Request, res: Response)`: Retorna todas as categorias.

### MovieController

Gerencia as operações relacionadas a filmes:

- `getAllMovies(req: Request, res: Response)`: Retorna todos os filmes com suas respectivas categorias.
- `getMovieById(req: Request, res: Response)`: Retorna um filme específico pelo seu ID.

### ReviewController

Controla as avaliações dos filmes:

- `create(req: Request, res: Response)`: Cria uma nova avaliação para um filme.
- `findMany(req: Request, res: Response)`: Retorna várias avaliações com base em parâmetros de consulta.
- `findOne(req: Request, res: Response)`: Retorna uma avaliação específica pelo seu ID.
- `update(req: Request, res: Response)`: Atualiza uma avaliação existente.
- `delete(req: Request, res: Response)`: Remove uma avaliação pelo seu ID.

### UserController

Gerencia operações de usuário:

- `register(req: Request, res: Response)`: Registra um novo usuário.
- `login(req: Request, res: Response)`: Realiza o login de um usuário.
- `getUser(req: Request, res: Response)`: Retorna os detalhes de um usuário específico.

## Middleware

### HandleErrors

Um middleware global para lidar com erros:

- Trata erros personalizados da classe `AppError`.
- Lida com erros de validação de dados usando `Zod`.
- Retorna mensagens de erro apropriadas para diferentes tipos de falhas.

### IsEmailRegistered

Verifica se o email já está registrado antes de criar um novo usuário.

### IsReviewIdValid

Valida se o ID da avaliação é um número positivo e se a avaliação existe.

### VerifyToken

Valida o token JWT fornecido nas requisições para garantir que o usuário esteja autenticado.

### AddUserIdToRequest

Adiciona o ID do usuário ao corpo da requisição para facilitar o gerenciamento de avaliações.

### ValidateBody

Valida o corpo da requisição com base em um esquema definido usando `Zod`.

## Esquemas de Validação

Os esquemas de validação são definidos usando `Zod`, garantindo que os dados recebidos estejam no formato esperado:

- **categorySchema**: Define a estrutura das categorias.
- **movieSchema**: Define a estrutura dos filmes.
- **reviewSchema**: Define a estrutura das avaliações.
- **userRegisterBodySchema**: Define a estrutura dos dados necessários para o registro de um usuário.

## Configuração do Banco de Dados

O projeto utiliza **Prisma** como ORM para facilitar a interação com o banco de dados. As operações de CRUD são implementadas nos serviços correspondentes, garantindo uma separação clara entre a lógica de negócios e a camada de persistência de dados.

## Conclusão

Este backend fornece uma API RESTful que permite o gerenciamento eficiente de categorias, filmes, avaliações e usuários. A utilização de boas práticas de programação e a estrutura organizada do código garantem a escalabilidade e a manutenibilidade do sistema.

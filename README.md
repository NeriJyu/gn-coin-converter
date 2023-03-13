# Conversor de moedas

## Comandos para rodar

```
  npm install
  cp .env.example .env
  npm run dev
```

## Urls

- [Produção](https://gn-coin-converter.onrender.com)
- [Local](http://localhost:8091)

## Testes

```
  npm test
```

## Rotas do projeto

- GET: /api-docs - Swagger da aplicação.

- POST: /users - Cria usuário com o campo 'name' opcional, 'email' obrigatório e único, 'password' obrigatório.

```
  body: {
  "name": "Gustavo Neri",
  "email": "gustavoneri20@hotmail.com",
  "password": "ABC123def456"
  }
```

- POST: /auth/login - Realiza o login, necessário pegar o token da resposta para usar a rota abaixo, o token expira em 2 horas. Os dois campos para envio são obrigatórios.

```
  body: {
  "email": "gustavoneri20@hotmail.com",
  "password": "ABC123def456"
  }
```

- POST: /exchange-rates/convert - Faz a conversão de 'amount' para a moeda inserida em 'from' para 'to'. Os três campos são obrigatórios e é necessário enviar o token de login como autorização Bearer Token.

```
  body: {
  "amount": "50",
  "from": "BRL",
  "to": "USD"
  }
```

- GET: /transactions - Lista as transações realizadas pelo usuário informado. O campo 'user_id' é obrigatório.

```
  query params: {
  "user_id": 1
  }
```

## Sobre o projeto

Essa API tem como objeto realizar a conversão entre dois valores e salvar essas informações em um banco de dados.

Utilizei SQLite pois é um banco fácil de se usar em aplicações mais simples e é possível salvar seus dados no projeto, não senti a necessidade usar nenhum ORM nesse projeto.

Fiz a documentação utilizando o Swagger pela facilidade de sua utilização e pela vantagem de ser fácil de usar seu ambiente visual.

Optei por realizar testes utilizando o Jest pela facilidade de sua configuração e é fácil de se aprender.

Separei o projeto nessas camadas porque apenas olhar uma vez para o projeto já é possível entender todas as camadas além de ser fácil a implementação de novas features.

# Conversor de moedas

Você deverá implementar uma API Rest que seja capaz de realizar a conversão entre duas moedas
utilizando taxas de conversões atualizadas de um serviço externo.

Para realização da conversão é necessário o ID do usuário que deseja realizar a conversão.

A API deverá registrar cada transação de conversão com todas as informações relacionadas e também
disponibilizar um endpoint para consulta das transações realizadas por um usuário.

O projeto deverá ser feito em Node.js com TypeScript.

1. Deve ser possível realizar a conversão entre 4 moedas no mínimo (BRL, USD, EUR, JPY);
1. As taxas de conversão devem ser obtidas de [https://api.exchangeratesapi.io/latest?base=EUR]
   (Usar a API Free - Tem limitação de requisiões, e apenas conversão com base na moeda EUR);
1. As transações de conversão devem ser persistidas no banco de dados (embedded) contendo:
   - ID do usuário;
   - Moeda origem;
   - Valor origem;
   - Moeda destino;
   - Taxa de conversão utilizada;
   - Data/Hora UTC;
1. Uma transação com sucesso deve retornar:
   - ID da transação
   - ID do usuário;
   - Moeda origem;
   - Valor origem;
   - Moeda destino;
   - Valor destino;
   - Taxa de conversão utilizada;
   - Data/Hora UTC;
1. Os casos de falha devem retornar com status code pertinente e descrição no corpo;
1. Deverá existir um endpoint para listagem de todas as transações realizadas por usuário;
1. Deve haver uma cobertura satisfatória de testes;
1. Deve-se adicionar a esse arquivo explicações sobre como rodar a aplicação, e uma apresentação sobre o
   projeto: propósito, features, motivação das principais escolhas de tecnologias, e separação das camadas;
1. Todo o código deve ser em inglês;
1. Disponibilizar o código apenas nesse repositório, sem nenhuma cópia pública, para evitar plágio;

## Itens desejáveis

- Logs
- Tratamento de exceções
- Documentação
- Coesão de commits
- Mensagens de commits claras
- Configuração de lint
- Testes unitários
- Testes de integração
- Documentação dos endpoints
- Estar rodando e disponível (Ex: Heroku, ou similar)
- CI/CD

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

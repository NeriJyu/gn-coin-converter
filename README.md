# 💰 Currency Converter

## Commands to Run ⚙️

```bash
  npm install
  cp .env.example .env
  npm run dev
```

## URLs 🔗

- [Production](https://gn-coin-converter.onrender.com) 🌐
- [Local](http://localhost:8091) 🏠

## Tests ✅

```bash
  npm test
```

## Project Routes 🗺️

- GET: /api-docs - Application Swagger. 📖

- POST: /users - Creates a user with an optional 'name' field, a mandatory and unique 'email' field, and a mandatory 'password' field. 👤

```json
  body: {
    "name": "Gustavo Neri",
    "email": "gustavoneri20@hotmail.com",
    "password": "ABC123def456"
  }
```

- POST: /auth/login - Performs login, it is necessary to get the token from the response to use the route below. The token expires in 2 hours. Both fields are mandatory. 🔑

```json
  body: {
    "email": "gustavoneri20@hotmail.com",
    "password": "ABC123def456"
  }
```

- POST: /exchange-rates/convert - Converts 'amount' from the currency entered in 'from' to 'to'. All three fields are mandatory, and it is necessary to send the login token as a Bearer Token authorization. 🔄

```json
  body: {
    "amount": "50",
    "from": "BRL",
    "to": "USD"
  }
```

- GET: /transactions - Lists the transactions performed by the informed user. The 'user_id' field is mandatory. 🧾

```json
  query params: {
    "user_id": 1
  }
```

## About the Project 💡

This API aims to perform the conversion between two values and save this information in a database. 🏦

I used SQLite because it is an easy database to use in simpler applications, and it is possible to save its data within the project. I didn't use any ORM in this project. 🛠️

I did the documentation using Swagger due to its ease of use and the advantage of its user-friendly visual environment. ✍️

I chose to perform tests using Jest due to its easy configuration and learning curve. 🧪

I separated the project into these layers because just looking at the project once makes it possible to understand all the layers, in addition to making it easy to implement new features. 🧱
```

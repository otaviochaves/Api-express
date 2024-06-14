# API-Express

Esta é uma API criada com Express e TypeScript, seguindo padrões de Use Case e Factory Pattern. O projeto utiliza MySQL como banco de dados e está containerizado com Docker. Para testes unitários, foi utilizado o Vitest.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

- Node.js (v14 ou superior)
- Docker
- MySQL

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/meu-projeto-api.git
   cd meu-projeto-api
2. Instale as dependências:
   ```sh
   npm install
   ## Configuração

1. Copie o arquivo de exemplo `.env` e configure as variáveis de ambiente:

    ```sh
    DB_USER=
    DB_SCHEMA=
    DB_PASSWORD=
    DB_HOST=
    JWT_SECRET:

    ```
## Executando a Aplicação
## Usando Docker
1. Construa e inicie os containers:
    ```sh
    docker-compose up --build
## Usando Node.js
1. Inicie o servidor de desenvolvimento:
    ```sh
    npm run start:dev
2. A API estará disponível em http://localhost:3000.
## Testes
1. Para rodar os testes unitários:
   ```sh
    npm run test
## Tecnologias Utilizadas
-  Express
- TypeScript
- MySQL
- Docker
- Vitest

# Star Wars GraphQL

This simple Star Wars API GraphQL wrapper with cache.

## Used technologies

- 🎁 **Repository:** standard Git repository
- 🌈 **Framework:** nest.js
- 🛠️ **Tools:** prisma orm, graphql
- 💎 **Others:** docker and docker-compose

## How to run to development

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Install [Node.js](https://nodejs.org/en/download/).
3. Clone the repository.
4. Get and run database: `docker run --name swapi-gql-db -p 5432:5432 -d -e -e POSTGRES_PASSWORD="passw123" postgres:13.1-alpine`
5. Type and run: `npm install && npm run start` in the root directory.
6. Open `http://localhost:3000/graphql` in your browser to see the GraphQL playground.

## How to run to production

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Clone the repository.
3. Type and run: `docker-compose build -d` in the root directory.
4. Type and run: `docker-compose up -d` in the root directory.
5. Open `http://localhost:3000/graphql` in your browser to see the GraphQL playground.

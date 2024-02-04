# Star Wars GraphQL

This simple Star Wars API GraphQL wrapper with cache.

## Purpose
This application was created as a "home recruitment task" to the Polish company based in Cracow - [Dev and Deliver](https://www.gowork.pl/opinie_czytaj,21584258). 

- Feedback from the company: `we don't want you!`
- My feedback after recruitment process: `don't waste your time to the recruitment process!`

## Used technologies

- 🎁 **Repository:** standard Git repository
- 🌈 **Framework:** nest.js
- 🛠️ **Tools:** prisma orm, graphql
- 💎 **Others:** docker and docker-compose, cqrs, postgresql

## GraphQL API

This application uses GraphQL. You can find the GraphQL playground at `http://localhost:3000/graphql`.
Currently, the following queries are available:

### Basic queries

- `film(id: number)` - returns a film by id
- `allFilms(page?: number)` - returns all films, with optional pagination
- `planet(id: number)` - returns a planet by id
- `allPlanets(page?: number)` - returns all planets, with optional pagination
- `species(id: number)` - returns a species by id
- `allSpecies(page?: number)` - returns all species, with optional pagination
- `starship(id: number)` - returns a starship by id
- `allStarship(page?: number)` - returns all starship, with optional pagination
- `vehicle(id: number)` - returns a vehicle by id
- `allVehicles(page?: number)` - returns all vehicles, with optional pagination

### Additional queries

- `uniqueWords` - returns table of pairs (word-frequency) separated by `\n\r` characters, pairs based on the opening crawl of all films,
- `mostOftenName` - returns the most common name in the opening crawl of all films.

### Usage example

```graphql
query {
  film(id: 1) {
    title
    // rest fields
  }
}
```

## Tests

To run tests type and run: `npm run test` in the root directory. The app contains external API tests, 22 tests in total.

Result:

```bash
Test Suites: 6 passed, 6 total
Tests:       22 passed, 22 total
Snapshots:   0 total
Time:        39.145 s, estimated 44 s
```

## How to run in development mode

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Install [Node.js](https://nodejs.org/en/download/).
3. Clone the repository.
4. Get and run database: `docker run --name swapi-gql-db -p 5432:5432 -d -e -e POSTGRES_PASSWORD="passw123" postgres:13.1-alpine`
5. Type and run: `npm install` in the root directory.
6. Generate the database schema: `npx prisma db push`
7. Type and run: `npm run start` in the root directory.
8. Open `http://localhost:3000/graphql` in your browser to see the GraphQL playground.

## How to run in production mode

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Clone the repository.
3. Type and run: `docker-compose build -d` in the root directory.
4. Type and run: `docker-compose up -d` in the root directory.
5. Open `http://localhost:3000/graphql` in your browser to see the GraphQL playground.

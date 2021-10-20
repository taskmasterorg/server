# taskmaster - server

Welcome to the backend of taskmaster.

## tech

1. Node.js
2. TypeScript
3. PostgreSQL
4. Redis

## API

The documentation can be found [here](./docs/API.md)

## setup

1. You need to create a database in PostgreSQL with the name `taskmaster`.
2. You need to make a `.env` file based on [.env.example](./.env.example).

## build and run

```bash
$ npm run build
# before proceeding, ensure that your Redis server is turned on
$ npm run start
```

## contributing

1. Pull requests are always appreciated. However, it would be nicer if a discussion related to your PR is initiated first, in the issues tab.
2. Commit messages should be prefixed with the category of service they provide, for eg: (`feat:`, `test:`, `chore:`, `docs:`, `refactor:`).

## license

[MIT](./LICENSE)

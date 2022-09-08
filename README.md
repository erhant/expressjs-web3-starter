# Express Wallet Backend

A generic backend with Redis, Prisma ORM (to PgSQL) and Ethers setup. It also has a signature-based authorization middleware, that maps a common signature to a public key.

## Setup

You need to have the following:

- A Redis server running
- A PostgreSQL server running
- A gRPC URL and ChainID

The connection information for these are stored in `.env`. See an example file under [environments](./environments/.env.local).

## Usage

Just run `npm install` and then `npm start` to start the server. An environment file `.env` is required as follows:

```bash
PORT=<the port to listen>
```

## Testing

Start the backend in a terminal with `npm run start:test`, and in another run `npm test` to execute unit tests. You can skip some tests with `.skip` if wanted, as linter will not be happy with the code when you comment stuff out. Note that Jest also sets `NODE_ENV` variable to be `test` when during testing.

## Structure

The entry point is [`app.ts`](./src/app.ts). The other files are structured as follows:

- [clients](./src/clients/): API setups and accessors.
- [config](./src/configurations/): configurations, mostly overwritten by environment variables.
- [constants](./src/constants/): non-configuration constants, whether it is a string literal used around or some parameter.
- [controllers](./src/controllers/): final entry-points for each endpoint. We expect the responses to be made from within this file.
- [interfaces](./src/interfaces/): custom TypeScript interfaces.
- [middlewares](./src/middlewares/): Express middlewares, such as validation.
- [routes](./src/routes/): Express routes, which define the endpoint URLs.
- [tests](./src/tests/): Jest unit-test files.
- [utilities](./src/utilities/): general utility files.
- [validators](./src/validators/): Joi validator schemes for endpoints. Note that we can have non-endpoint schemas here too, which are used to build up the endpoint schemas.

Within the [tests](./src/tests/) folder, there are also utilities, mock data and isolated scripts.

## Code Style

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

[Google TypeScript](https://github.com/google/gts) code formatting & linting is used as an extension of `eslint` and `prettier`. I have also included my VSCode settings, though you should feel free to change them.

# graphql-api-server

A graphql api server built with Nodejs, apollo-graphql-server, express and postgres.

[![Build Status](https://gitlab.com/dikaeinstein/graphql-api-server/badges/master/build.svg)](https://gitlab.com/dikaeinstein/graphql-api-server)

## Installation

Clone repo to your local machine:

```git
git clone https://github.com/dikaeinstein/graphql-api-server.git
```

**Install dependencies and run locally**<br/>
*Note>> Install yarn if not already installed on local machine: 'npm i -g yarn'*

Then run:

```yarn
yarn install
```

Create .env like the .env.sample file, just replace with your own enviroment variables.

Now start the server:

```yarn
yarn start
yarn start:dev     /* Keep watching files for changes */
```

## Testing

To run tests:

```yarn
yarn test
```

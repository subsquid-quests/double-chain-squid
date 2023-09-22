# Squid tracking USDC transfers across two chains

This [squid](https://docs.subsquid.io/) captures USDC Transfer events on ETH and BSC, stores them in the same database and serves the data over a common GraphQL API.

The Ethereum data ingester ("processor") is located in `src/eth` and similarly the Binance Chain processor can be found in `src/bsc`. The scripts file `commands.json` was updated with the commands `process:eth` and `process:bsc` that run the processors. GraphQL server runs as a separate process started by `sqd serve`. You can also use `sqd run` to run all the services at once.

The squid uses [Subsquid Network](https://docs.subsquid.io/subsquid-network) as its primary data source.

Dependencies: Node.js, Docker, Git.

## Quickstart

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. Clone the repo
git clone https://github.com/subsquid-labs/quest-double-chain-squid
cd quest-double-chain-squid

# 2. Install dependencies
npm ci

# 3. Start containers for the Postgres database and the network query gateway
sqd up

# 4. Build and start the processors
sqd process:eth # then in a separate terminal
sqd process:bsc

# 5. Start the GraphQL server by running in yet another terminal
sqd serve
```
A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).

# About

This is my implementation of a subgraph for the Cronos ERC20 token on mainnet Ethereum. You can view the Cronos smart contract on Etherscan at the link below.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

## Setup

![subgraph studio](subgraph_studio.png)

This subgraph was created by following the [Quick Start](https://thegraph.com/docs/en/quick-start/) tutorial, using Subgraph Studio and the Graph CLI, and then customizing the code. It is up to v0.2.9 now. 

This subgraph has been deployed to Arbitrum one.

## Structure 

From the default template, I removed OwnerTransferred and OwnerDeployed as events from [subgraph.yaml](subgraph.yaml), as entities in [schema.graphql](schema.graphql), and from the mapping file in [src/cro-token.ts](src/cro-token.ts).

I also introduced a number of new entities, other than the default ones.

These entities are: 

- Holder
- DailySale
- Watchlist
- Sampler 

These entities are instantiated in response to qualifying blockchain transactions. They are used to help answer the following types of queries.

Holder creates an entry for every holder of Cronos, and the mapping either increments or decrements their balance. It is intended to show the balance of each Cronos holder.

DailySale creates 'days' numbered based on their distance from the UNIX time start date. This definition of day was chosen because it provides a standard and easily computable reference point. It's meant to show the transactions total & number of sales for each day, defined as a 24 hour block of time counted sequentially from the UNIX time start date.

Watchlist currently shows the sum of all transactions (not counting decimal points) and the last indexed timestamp, through the last indexed transaction. It was originally meant to test if a 'from' or 'to' address belonged to a wallet on a 'watchlist', but since the tests as written fail and every transaction is counted in the 'watchlistWatch' bucket, it currently returns the total sum of all transactions (rounding off all decimal values) and the last indexed block timestamp.

Sampler is meant to 'sample' transactions in every 100th block, and saves that 'sample' transaction for querying. It also gives a rough count of how many samples have been taken until that point. As shown by the name, it's meant to take a snapshot of every 100th block's transactions.

At one point there was an entity called Info, which returned hardcoded information. While I've removed this, it can still be seen in the commit history.

## Mappings

See the 'handleTransfer' function in [src/cro-token.ts](src/cro-token.ts) to see the relevant mapping code.

For each transaction, handleTransfer calls these functions:
- saveTransfer
- updateHolderBalances
- saveDailySale
- watchlistCheck
- saveSampler

When a Transfer event is emitted by the Cronos token contract, those functions activate, and if the right conditions are met, its value is stored.

## Areas for Improvement

I would improve watchlistCheck so it matched addresses.

I would also considered adding a transactions array and a blockchain timestamps array to the Watchlist entity, meaning that every transaction hash and timestamp from one of the addresses in a watchlist would be added to it,  while being mindful of the fact that this could cause a [large array](https://thegraph.com/blog/improve-subgraph-performance-avoiding-large-arrays/) problem. When one watchlist matches everything that isn't feasible, so that one would be removed.

## Example Queries

Example queries can be viewed if you locally run [cronos-graph](https://github.com/julianeon/cronos-graph/tree/main), a Node.js Express app which hits this subgraph. To see the query output, view the homepage.

This [tx query](https://github.com/julianeon/cronos-graph/blob/main/graph_query.js) returns data about a single transaction based on its transaction hash.

Note: my focus has been on cronos (this repo), not cronos-graph. The latter has not been updated to return information about the new entities.

## Endpoints

This information was taken from Subgraph Studio, from my Cronos subgraph. You must supply your own API key.

### Production Query URL (Arbitrum One)

https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

### Development Query URL - Latest Version

https://api.studio.thegraph.com/query/63555/cronos/version/latest

### Development Query URL - Selected Version

https://api.studio.thegraph.com/query/63555/cronos/v0.2.9


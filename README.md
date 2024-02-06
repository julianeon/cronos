# About

This is my implementation of a subgraph for the Cronos ERC20 token on mainnet Ethereum. You can see it on Etherscan at the link below.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

## Setup

![subgraph studio](subgraph_studio.png)

This subgraph was created by following the [Quick Start](https://thegraph.com/docs/en/quick-start/) tutorial, using Subgraph Studio and the Graph CLI, and then customizing the code. It is up to v0.1.9 now. 

This subgraph has been deployed to Arbitrum one.

https://thegraph.com/docs/en/quick-start/

From the default template, I removed OwnerTransferred and OwnerDeployed as events from subgraph.yaml, as entities in schema.graphql, and from the AssemblyScript file in src/cro-token.ts.

At one point I also introduced an entity called Info, which is defined as an entity in [schema.graphql](schema.graphql) and shows the strings it returns in [src/cro-token.ts](src/cro-token.ts). This entity has now been removed because it wasn't sufficiently useful, but it can still be seen in my commit history.

## Example Queries

This [tx query](https://github.com/julianeon/cronos-graph/blob/main/graph_query.js) returns data about a single transaction based on its transaction hash.

It can be viewed live if you locally run [cronos-graph](https://github.com/julianeon/cronos-graph/tree/main), a Node.js Express app which hits this subgraph. To see the query output, view the homepage.

## Endpoints

This information was taken from Subgraph Studio, from my Cronos subgraph. You must supply your own API key.

### Production Query URL (Arbitrum One)

https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

### Development Query URL - Latest Version

https://api.studio.thegraph.com/query/63555/cronos/version/latest

### Development Query URL - Selected Version

https://api.studio.thegraph.com/query/63555/cronos/v0.1.9


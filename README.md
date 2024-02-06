# About

This is my implementation of a subgraph for the Cronos ERC20 token on mainnet Ethereum. You can see it on Etherscan at the link below.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

# Setup

![subgraph studio](subgraph_studio.png)

This subgraph was created by following the [Quick Start](https://thegraph.com/docs/en/quick-start/) tutorial, using Subgraph Studio and the Graph CLI, specifying the Cronos smart token address on Ethereum as the address.

https://thegraph.com/docs/en/quick-start/

I made some changes from the defaults: I removed OwnerTransferred and OwnerDeployed as events from subgraph.yaml, as entities in schema.graphql, and from the AssemblyScript file in src/cro-token.ts.

I deployed the subgraph to Arbitrum One after bridging over a small amount of Ethereum (~$6) to enable this.

After that, I introduced a new entity called Info, which is defined as an entity in [schema.graphql](schema.graphql) and shows the strings it returns in [src/cro-token.ts](src/cro-token.ts).

The subgraph can be queried on Arbitrum for transaction data. For the Info query, use the Development Query URL. 

https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

This [tx query](https://github.com/julianeon/cronos-graph/blob/main/graph_query.js) returns data about a single transaction based on its transaction hash, and this [info query](https://github.com/julianeon/cronos-graph/blob/main/info_query.js) returns Info data. 

Both queries can be viewed live, with their output as HTML, if you locally run [cronos-graph](https://github.com/julianeon/cronos-graph/tree/main), a Node.js Express app which hits this subgraph. To see the query output, view the homepage, /data.html or /info.html.

# Details

These details were taken from Subgraph Studio, from my Cronos subgraph. You must supply your own API key.

## Production Query URL (Arbitrum One)

https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

## Development Query URL - Latest Version

https://api.studio.thegraph.com/query/63555/cronos/version/latest

## Development Query URL - Selected Version

https://api.studio.thegraph.com/query/63555/cronos/v0.0.1

# Update

The original query is here, for an example transaction.

https://github.com/julianeon/cronos-graph/blob/main/graph_query.js

I added a new entity, Info, which can be queried using the query shown here. 

https://github.com/julianeon/cronos-graph/blob/main/info_query.js





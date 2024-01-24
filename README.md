# About

This is my implementation of a subgraph for a typical ERC20 token - in this case, the Cronos token.

You can see the smart contract address for the Cronos token on mainnet Etherscan at the link below.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

# Setup

![subgraph studio](subgraph_studio.png)

This subgraph was created by following the [Quick Start](https://thegraph.com/docs/en/quick-start/) tutorial, using Subgraph Studio and the Graph CLI, specifying the Cronos smart token address on Ethereum as the address.

https://thegraph.com/docs/en/quick-start/

I made some changes from the defaults: I removed OwnerTransferred and OwnerDeployed as events from subgraph.yaml, as entities in schema.graphql, and from the AssemblyScript file in src/cro-token.ts.

I deployed the subgraph to Arbitrum One after bridging over a small amount of Ethereum (~$6) to enable this.

After that, I introduced a new entity called Info.

The subgraph is now available to query on Arbitrum at the URL below. Note: you must sign up for and supply your own API key.

https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

This [tx query](https://github.com/julianeon/cronos-graph/blob/main/graph_query.js) returns data about a single transaction based on its transaction hash, and this [info query](https://github.com/julianeon/cronos-graph/blob/main/info_query.js) returns hardcoded data. 

Both queries can be viewed live, with their output as HTML, if you locally run [cronos-graph](https://github.com/julianeon/cronos-graph/tree/main), a Node.js Express app which hits this subgraph. To see the query output, view the homepage, /data.html or /info.html.

# Details

These details were taken from Subgraph Studio, from my Cronos subgraph, from my deployment of this repo on the Arbitrum network.

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





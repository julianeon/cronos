# About

This is my implementation of a subgraph for a typical ERC20 token - in this case, the Cronos token.

You can see the smart contract address for the Cronos token on mainnet Etherscan at the link below.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

# Setup

This subgraph was created by following the [Quick Start](https://thegraph.com/docs/en/quick-start/) tutorial, using Subgraph Studio and the Graph CLI, specifying the Cronos smart token address on Ethereum as the address.

https://thegraph.com/docs/en/quick-start/

I made some changes from the defaults: I removed OwnerTransferred and OwnerDeployed as events from the subgraph, as entities in the schema, and from the AssemblyScript (ts) file.

I deployed the subgraph to Arbitrum One after bridging over a small amount of Ethereum (~$6) to enable this.

The subgraph is now available to query on Arbitrum at the address below. Note: you must sign up for and supply your own API key.

https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL

[This](https://github.com/julianeon/cronos-graph/blob/main/graph_query.js) is a GrapQL query that returned data from this endpoint. It is taken from [this repo](https://github.com/julianeon/cronos-graph/tree/main) showing a Node.js Express app displaying Cronos transfer data, using this endpoint. 



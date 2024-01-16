# About

This is my implementation of a subgraph for a typical ERC20 token - in this case one called Cronos token.

You can see the smart contract address on Etherscan here.

https://etherscan.io/address/0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b#code

# Setup

This was created by following the Quick Start tutorial, specifying the Cronos smart token address on Ethereum as the address.

https://thegraph.com/docs/en/quick-start/

I made some changes from the defaults: I removed OwnerTransferred and OwnerDeployed from the subgraph, as entities in the schema, and from the AssemblyScript (ts) file.

Then I deployed it. It is now available to query on Arbitrum at this address. Note: you must sign up for and supply your own API key.

https://gateway-arbitrum.network.thegraph.com/api/${API_KEY}/subgraphs/id/6HzdSVrye3kxbwRmAZtDyWENGQQnTHnEucjm5Gen4NsL





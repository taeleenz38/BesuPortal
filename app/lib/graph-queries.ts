import { useQuery, gql } from "urql";

export const RequestQuery = gql`
  query FetchRequests {
    requestedForMints {
      quantity
      id
      blockTimestamp
      blockNumber
      seller
      requestId
      uri
    }
  }
`;

export const GetERC20List = gql`
  query GetERC20List {
    erc20ContractDeployeds {
      id
      erc20Token
      tokenName
      tokenSymbol
      tokenDecimal
      transactionHash
    }
  }
`;

export const GetERC1155List = gql`
  query getERC1155List {
    erc1155ContractDeployeds {
      baseUri
      blockNumber
      erc1155Token
      id
      metaDataUri
      tokenName
      tokenSymbol
    }
  }
`;

export const GetUserERC1155TokenBalanceList = gql`
  query getUserERC1155TokenBalanceList($owner: String) {
    userTokenBalances(where: { owner: $owner }) {
      id
      owner
      tokenId
      tokenName
      metaDataUri
      contractAddress
      balance
      tokenSymbol
    }
  }
`;

export const GetMyQuery = gql`
  query getMyQuery {
    tokenDeployeds(orderBy: blockTimestamp, orderDirection: desc) {
      id
      tokenAddress
      tokenName
      tokenSymbol
      tokenType
      tokenDecimal
      metaDataUri
      blockTimestamp
    }
  }
`;

export const getListedTokens = gql`
  query getListedTokens($tokenId: String, $address: String) {
    marketItemListeds(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { tokenId: $tokenId, erc1155Address: $address, quantity_gt: 0 }
    ) {
      id
      listingId
      quantity
      seller
      tokenId
      unitPrice
      erc20Address
      erc20TokenName
      erc1155Address
    }
  }
`;

export const GetUserTokenBalanceList = gql`
  query getUserTokenBalanceList($owner: String) {
    userTokenBalances(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { owner: $owner, balance_gt: 0 }
    ) {
      id
      owner
      tokenId
      tokenName
      metaDataUri
      contractAddress
      balance
      tokenSymbol
    }

    userERC20TokenBalances(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { owner: $owner, balance_gt: 0 }
    ) {
      id
      owner
      tokenName
      tokenSymbol
      tokenDecimal
      tokenVersion
      contractAddress
      balance
    }
  }
`;

export const GetMarketPlaceUserTokenList = gql`
  query getMarketPlaceUserTokenList {
    marketPlaceItems(
      orderBy: blockTimestamp
      orderDirection: desc
      where: { listingCounter_gt: 0 }
    ) {
      id
      tokenAddress
      tokenId
      tokenName
      tokenSymbol
      metaDataUri
      listingCounter
      blockTimestamp
      owner
    }
  }
`;

export const GetMetaDataURI = gql`
  query getMetaDataURI($tokenAddress: String) {
    tokenDeployeds(where: { tokenAddress: $tokenAddress }) {
      metaDataUri
    }
  }
`;

export const GetERC20Balances = gql`
  query getERC20Balances($contractAddress: String, $owner: String) {
    userERC20TokenBalances(
      where: { contractAddress: $contractAddress, owner: $owner }
    ) {
      balance
    }
  }
`;

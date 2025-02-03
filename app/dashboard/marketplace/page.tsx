"use client"
import { NextPage } from "next";
import { GetMarketPlaceUserTokenList } from "@/app/lib/graph-queries";
import { useQuery } from "urql";
import { CardContainerMW } from "@/app/components/CardContainerMW";
import ClipLoader from "react-spinners/ClipLoader";

interface nft {
  name: string | any;
  image: string;
  tokenId: string;
  value: number;
  ownedBy: string;
  location: string;
}

type MarketPlaceItem = {
  id: string;
  owner: string;
  tokenAddress: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  metaDataUri: string;
  listingCounter: number;
};

const Marketplace: NextPage = () => {
  const [marketPlaceItemsResult, reexecuteQuery] = useQuery({
    query: GetMarketPlaceUserTokenList,
  });

  console.log("marketPlaceItemsResult-- > ", marketPlaceItemsResult);

  const userERC1155TokenBalanceList =
    (marketPlaceItemsResult?.data
      ?.marketPlaceItems as Array<MarketPlaceItem>) ?? [];

  return (
    <>
      {marketPlaceItemsResult.fetching ? (
        <div className="flex justify-center pt-2">
          <ClipLoader color="#808080" size={35} speedMultiplier={0.8} />
        </div>
      ) : (
        <CardContainerMW items={userERC1155TokenBalanceList} />
      )}
    </>
  );
};

export default Marketplace;

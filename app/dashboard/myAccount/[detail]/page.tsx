"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  GetERC20List,
  GetMetaDataURI,
  getListedTokens,
} from "@/app/lib/graph-queries";
import { useQuery } from "urql";
import { ListComponent } from "@/app/components/ListComponent";
import { ListedBuyComponent } from "@/app/components/ListedBuyComponent";
import { loadNft, saveNft } from "@/app/api/nftDetail";
import {
  UseConvertAmountFromBlockChain,
  UseGetERC20Decimal,
} from "@/app/hooks/utilHooks";
import ClipLoader from "react-spinners/ClipLoader";

interface INftCardProps {
  name: string;
  value: number;
  buyer: boolean;
  image: string;
  _tokenId: string;
  tokenSymbol: string;
  contractAddress: string;
}
type Token = {
  tokenName: string;
  tokenSymbol: string;
  erc20Token: `0x${string}`;
  tokenDecimal: number;
};

type ListedToken = {
  id: number;
  listingId: number;
  quantity: number;
  seller: `0x${string}`;
  tokenId: number;
  unitPrice: number;
  erc20Address: `0x${string}`;
  erc1155Address: `0x${string}`;
  erc20TokenName: string;
  owner: `0x${string}`;
};
const Detail = () => {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isListingsOpen, setIsListingsOpen] = useState(true);
  const router = useRouter();
  const [parentHeight, setParentHeight] = useState<number | undefined>(
    undefined
  );
  const [parentWidth, setParentWidth] = useState<number | undefined>(undefined);
  const parentRef = useRef<HTMLDivElement>(null);
  const [nft, setNft] = useState<INftCardProps>();
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<
    { trait_type: string; value: string }[]
  >([]);
  const [name, setName] = useState("");
  const contractAddress = process.env.MARKET_PLACE;
  const [result, reexecuteQuery] = useQuery({
    query: GetERC20List,
  });
  const [listedResults, executeQuery] = useQuery({
    query: getListedTokens,
    variables: { tokenId: nft?._tokenId, address: nft?.contractAddress },
  });
  const tokens = (result?.data?.erc20ContractDeployeds as Array<Token>) ?? [];
  const lsitedTokens =
    (listedResults?.data?.marketItemListeds as Array<ListedToken>) ?? [];

  const [metaDataURIResult, executeMetaQuery] = useQuery({
    query: GetMetaDataURI,
    variables: { tokenAddress: nft?.contractAddress },
  });
  const metaDataURIObj =
    (metaDataURIResult?.data?.tokenDeployeds as Array<any>) ?? [];

  const metaDataURI = metaDataURIObj[0]?.metaDataUri;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadNft();
        console.log("Details_Page", data);
        data ? setNft(data) : console.log("Error! NFT Cannot Be Loaded");
        if (data) {
          fetch(data.image)
            .then((response) => response.json())
            .then((data) => {
              const extractedImageURL = data.image;
              setImage(extractedImageURL);
              setDescription(data.description);
              setAttributes(data.attributes);
              setName(data.name);
              console.log("NFT Data", data);
            })
            .catch((error) => {
              console.error("Error fetching metadata:", error);
            });
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };
    loadData();
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const Details_tableData = [
    {
      label: "Contract Address",
      value: nft?.contractAddress ? shortenAddress(nft.contractAddress) : "",
    },
    { label: "Contract Name", value: nft?.name },
    { label: "Token ID", value: nft?._tokenId },
    { label: "Token Standard", value: "ERC-1155" },
    { label: "Network", value: "Sepolia" },
  ];

  function manageOnClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const url = `/manage/ERC1155?tokenId=${nft?.contractAddress}&tokenType=ERC1155&metaDataURI=${metaDataURI}&tokenSymbol=${nft?.tokenSymbol}`;
    router.push(url);
  }

  const refresh_ListingTable = () => {
    setTimeout(async () => {
      executeQuery({ requestPolicy: "network-only" });
    }, 15000);
  };

  const getFormattedUnitPrice: any = (
    unitPrice: number,
    erc20Address: `0x${string}`
  ) => {
    console.log("tokens", tokens);
    const decimal = tokens.filter((token) => {
      if (token.erc20Token === erc20Address) {
        return token.tokenDecimal;
      }
      console.log("token", token);
    });

    const formattedValue = UseConvertAmountFromBlockChain({
      amount: unitPrice,
      decimal: decimal[0]?.tokenDecimal,
    });
    return formattedValue;
  };

  return (
    <div className="pl-[450px] pr-[100px] mt-20">
      <div className="flex w-full">
        <div className="flex flex-col items-center lg:col-span-2 md:col-span-2 sm:col-span-1 gap-1 p-8 border bg-slate-50 shadow-lg rounded-lg">
          <div className="flex items-center justify-center">
            <Image
              src={image}
              alt="nft_image"
              className="object-fill rounded-lg border shadow-md mb-2"
              width={650}
              height={650}
            />
          </div>
          <div className="w-full flex-col gap-2">
            <div className="bg-white border rounded-lg my-2 py-3 flex flex-col items-center shadow-md">
              <h2 className="text-lg font-bold">Description</h2>
              <h3 className="text-left break-words">{description}</h3>
            </div>

            <div className="my-4 grid grid-cols-2 sm:grid-cols-2 gap-3">
              {attributes.map((row, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-white p-3 flex flex-col justify-center items-center shadow-md"
                >
                  <h3 className="h3 mb-2 text-center">{row.trait_type}</h3>
                  <p className="text-sm text-center">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center ml-20">
          <div className="bg-slate-50 border p-14 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{name} </h1>
            <div className="bg-white rounded-lg border-2 p-4 w-full">
              <table className="table lg:table-lg w-full">
                <tbody>
                  {Details_tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        <h3 className="text-left">{row.label}</h3>
                      </td>
                      <td className="p-3">
                        {row.label === "Contract Address" ? (
                          <a
                            href={`https://etherscan.io/address/${nft?.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-500"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <h3 className="text-left">{row.value}</h3>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h1 className="text-2xl font-bold mt-8 mb-4">Listings</h1>
            <div className="flex flex-col w-full gap-4 rounded-xl">
              {listedResults.fetching ? (
                <div className="flex justify-center pt-2">
                  <ClipLoader color="#808080" size={35} speedMultiplier={0.8} />
                </div>
              ) : lsitedTokens.length !== 0 ? (
                <div className="flex border rounded-lg">
                  <div className="border rounded-lg p-4 bg-white">
                    <table className="table w-full divide-y divide-border-[255,255,255,0.8]">
                      <thead className=" bg-white">
                        <tr>
                          {[
                            { label: "Amount" },
                            { label: "Currency" },
                            { label: "Unit Price" },
                            { label: "Seller" },
                            { label: "" },
                          ].map((item, index) => (
                            <td key={index} className="py-4">
                              <h3 className="font-medium text-center">
                                {item.label}
                              </h3>
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {lsitedTokens?.map((listedToken, index) => (
                          <tr key={index}>
                            <td className="p-4">
                              <h3 className="">{listedToken.quantity}</h3>
                            </td>
                            <td className="p-4">
                              <h3 className="">{listedToken.erc20TokenName}</h3>
                            </td>
                            <td className="p-4">
                              <h3 className="">
                                {getFormattedUnitPrice(
                                  listedToken.unitPrice,
                                  listedToken.erc20Address
                                )}
                              </h3>
                            </td>
                            <td className="p-4">
                              <h3 className="">
                                <a
                                  href={`https://sepolia.etherscan.io/address/${listedToken.seller}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className=" text-left text-blue-400 hover:text-blue-500"
                                >
                                  {shortenAddress(listedToken.seller)}
                                </a>{" "}
                              </h3>
                            </td>
                            <td className="p-4">
                              <button className="bg-[#9571f6] border-none px-5 py-2 rounded-lg text-sm text-white hover:text-[#efefef] hover:bg-[#8a69df]">
                                BUY
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center pt-2">
                  <span className="h3">No Listed Items</span>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-8">
              <button className="bg-[#9571f6] border-none px-5 py-2 rounded-lg text-sm text-white hover:text-[#efefef] hover:bg-[#8a69df] w-1/4 mr-10 shadow-md">
                LIST
              </button>
              <button className="bg-[#9571f6] border-none px-5 py-2 rounded-lg text-sm text-white hover:text-[#efefef] hover:bg-[#8a69df] w-1/4 shadow-md">
                MANAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;

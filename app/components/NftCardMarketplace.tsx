"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { saveNft } from "@/app/api/nftDetail";
import Image from "next/image";

interface INftCardProps {
  name: string;
  value: number;
  buyer: boolean;
  image: string;
  _tokenId: string;
  tokenSymbol: string;
  contractAddress: string;
  owner: string;
}

export default function NftCardMarketplace(props: INftCardProps) {
  const metadataURL = props.image;
  const [imageURL, setImageURL] = useState("");
  const [metaData, setMetaData] = useState(Object);
  //const description = metaData?.description.toString().length() > 100 ? metaData.description.substring(0,100).concat("...") : metaData.description

  useEffect(() => {
    fetch(metadataURL)
      .then((response) => response.json())
      .then((data) => {
        // Extract the image URL from the metadata
        const extractedImageURL = data.image;
        const metaData = data;
        setImageURL(extractedImageURL);
        setMetaData(metaData);
      })
      .catch((error) => {
        console.error("Error fetching metadata:", error);
      });
  }, [metadataURL]);

  const [tokenId, setTokenId] = useState(props._tokenId);
  const router = useRouter();
  const onClickButton: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const nft = props;
    const isSaved = await saveNft(nft);

    isSaved
      ? router.push(`/dashboard/myAccount/detail?owner=${props.owner}`)
      : alert("Error!! NFT Has Not Been Saved!");
  };

  const onClickImage: MouseEventHandler<HTMLImageElement> = async (event) => {
    event.preventDefault();
    const nft = props;
    const isSaved = await saveNft(nft);

    isSaved
      ? router.push(`/dashboard/myAccount/detail?owner=${props.owner}`)
      : alert("Error!! NFT Has Not Been Saved!");
  };
  return (
    <div>
      <div className="flex flex-row pt-3 pr-3">
        <div className="ribbon rounded-sm bg-[#8080806e] px-3">
          <p className="h3 text-sm font-semibold text-white">
            {props.tokenSymbol}
          </p>
        </div>
      </div>
      <div className="card rounded-xl rounded-tl-none shadow-lg px-7 pb-7">
        <div className="flex flex-col items-center text-center rounded-xl flex-1">
          <div className="card-actions mb-3 mt-2 flex flex-col">
            <div className="py-2">
              <p className="h3 font-normal items-center">{metaData.name}</p>
            </div>
          </div>
          <Image
            src={imageURL}
            alt="Nft image"
            className="h-[172px] w-[200px] cursor-pointer object-cover rounded-xl shadow-xl"
            style={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}
            onClick={onClickImage}
            width={200}
            height={172}
          />
          <div>
            <button
              className="bg-primary shadow-md rounded-lg py-1 mt-8 w-28 text-white hover:bg-[#8a69df] hover:text-[#efefef]"
              onClick={onClickButton}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

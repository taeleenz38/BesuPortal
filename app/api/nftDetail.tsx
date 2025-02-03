import { useState } from "react";
interface INftCardProps {
  name: string;
  value: number;
  buyer: boolean;
  image: string;
  _tokenId: string;
  tokenSymbol: string;
  contractAddress: string;
}

let data: INftCardProps = {
  name: "",
  value: 0,
  buyer: false,
  image: "",
  _tokenId: "",
  tokenSymbol: "",
  contractAddress: "",
};

export const loadNft = async () => {
  const storedData = localStorage.getItem("nftData");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return null;
  }
};

export const saveNft = (nft: INftCardProps) => {
  if (nft) {
    localStorage.setItem("nftData", JSON.stringify(nft));
    return true;
  } else {
    return false;
  }
};

"use client";
import React, { useEffect, useState } from "react";
import NftCardMarketplace from "@/app/components/NftCardMarketplace";

interface PaginatedItem {
  name: string;
  image: string;
  tokenId: string;
  value: number;
  ownedBy: string;
  location: string;
}

type MarketPlaceItem = {
  id: string;
  tokenAddress: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  metaDataUri: string;
  listingCounter: number;
  owner: string;
};

interface MarketPlaceItemProps {
  items: MarketPlaceItem[];
}

export const CardContainerMW = ({ items }: MarketPlaceItemProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MarketPlaceItem[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredList = items.filter(
      (item) =>
        item.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filteredList);
  }, [searchQuery, items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="xl:pl-[450px] xl:pr-[100px] mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Marketplace</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="font-light border rounded-lg text-center w-36 p-1 shadow-md"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-11/12 mx-auto border rounded-lg shadow-md bg-white p-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1">
            {currentItems.map((item, index) => (
              <div key={index} className="carousel-item p-3">
                <NftCardMarketplace
                  name={item.tokenName}
                  value={0}
                  buyer={false}
                  image={item.metaDataUri}
                  _tokenId={item.tokenId}
                  tokenSymbol={item.tokenSymbol}
                  contractAddress={item.tokenAddress}
                  owner={item.owner}
                />
              </div>
            ))}
          </div>
        </div>
        {currentItems.length > 0 && (
          <div className="pt-4 pb-1 gap-2 flex justify-center w-full">
            <button
              className="btn-navigation-sm pb-1 text-base w-24"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {"<<<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                className="btn-navigation-sm text-sm w-8"
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn-navigation-sm pb-1 text-base w-24"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {">>>"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

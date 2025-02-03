import { useState, useEffect } from "react";
import NftCard from "@/app/components/organisms/NftCard";

interface nft {
  name: string;
  value: number;
  buyer: boolean;
  image: string;
  _tokenId: string;
  contractAddress: string;
}

type UserERC1155TokenBalance = {
  id: string;
  owner: string;
  tokenId: string;
  tokenName: string;
  metaDataUri: string;
  contractAddress: string;
  balance: number;
  tokenSymbol: string;
};

interface Props {
  item: UserERC1155TokenBalance[];
  title: string;
}

const DashboardCarousel = (props: Props) => {
  const [nfts, setNfts] = useState<UserERC1155TokenBalance[]>(props.item);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nfts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(nfts.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (props.item.length) {
      setNfts(props.item);
    } else {
      console.log("No NFTs");
    }
  }, [props.item]);

  return (
    <div className="flow-div p-6 w-full h-full">
      <div className="flex justify-center">
        {currentItems.length == 0 && (
          <p className="h3 text-center mt-4">No tokens found</p>
        )}
        {currentItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-1">
            {currentItems.map((nft, index) => (
              <div key={index} className="carousel-item p-3">
                <NftCard
                  name={nft.tokenName}
                  value={nft.balance}
                  buyer={false}
                  image={nft.metaDataUri}
                  _tokenId={nft.tokenId}
                  tokenSymbol={nft.tokenSymbol}
                  contractAddress={nft.contractAddress}
                  owner={nft.owner}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination controls */}
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
  );
};

export default DashboardCarousel;

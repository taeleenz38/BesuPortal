"use client";
import { useEffect, useState, useMemo } from "react";
import {
  GetUserERC1155TokenBalanceList,
  GetUserTokenBalanceList,
} from "@/app/lib/graph-queries";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { useAccount } from "wagmi";
import DashboardCarousel from "@/app/components/organisms/MyAccount/DashboardCarousel";
import DashboardTable from "@/app/components/organisms/MyAccount/DashboardTable";
import ClipLoader from "react-spinners/ClipLoader";

interface IDashBoardProps {
  name: string;
  value: number;
  buyer: boolean;
  image: string;
  _tokenId: string;
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

type UserERC20TokenBalance = {
  id: string;
  owner: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  contractAddress: string;
  balance: number;
};

const MyAccount = () => {
  const [showERC1155, setShowERC1155] = useState(true);
  const owner = process.env.NEXT_PUBLIC_USER_WALLET_ADDRESS as `0x${string}`;
  const [userTokenBalanceResult, reexecuteQuery] = useQuery({
    query: GetUserTokenBalanceList,
    variables: { owner },
  });

  const userERC1155TokenBalanceList = useMemo(() => {
    return (
      (userTokenBalanceResult?.data
        ?.userTokenBalances as Array<UserERC1155TokenBalance>) ?? []
    );
  }, [userTokenBalanceResult?.data?.userTokenBalances]);

  const userERC20TokenBalanceList = useMemo(() => {
    return (
      (userTokenBalanceResult?.data
        ?.userERC20TokenBalances as Array<UserERC20TokenBalance>) ?? []
    );
  }, [userTokenBalanceResult?.data?.userERC20TokenBalances]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokenList, setFilteredTokenList] = useState<
    UserERC1155TokenBalance[] | UserERC20TokenBalance[]
  >([]);

  const handleToggle = () => {
    setShowERC1155((prevValue) => !prevValue);
    setSearchQuery("");
  };

  const handleClickERC20 = (token: UserERC20TokenBalance) => {};

  useEffect(() => {
    if (showERC1155) {
      const filteredList = userERC1155TokenBalanceList.filter(
        (token) =>
          token.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTokenList(filteredList);
    } else {
      const filteredList = userERC20TokenBalanceList.filter(
        (token) =>
          token.tokenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTokenList(filteredList);
    }
  }, [
    searchQuery,
    showERC1155,
    userERC1155TokenBalanceList,
    userERC20TokenBalanceList,
  ]);

  return (
    <div className="flex flex-col xl:pl-[450px] xl:pr-[100px] mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Account</h1>
      <div className="mx-auto w-full">
        <div className="flex justify-center items-center mb-3 px-3 w-full">
          <div className="flex items-center rounded-lg mt-2">
            <div className="flex items-center gap-1 gap-x-2 p-2 text-md shadow-md font-light bg-white rounded-lg mb-4">
              <div className="w-24">
                <button
                  className={`btn btn-sm btn-ghost border-none flex items-center
                  rounded-lg tracking-wide text-[#808080] w-24 justify-center ${
                    showERC1155
                      ? `btn btn-sm bg-[#9571f6] border-none flex items-center justify-center
                        w-24 rounded-lg tracking-wide text-white hover:text-[#efefef] hover:bg-[#8a69df] p-1`
                      : ""
                  }`}
                  onClick={handleToggle}
                >
                  ERC1155
                </button>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="border rounded-lg text-center w-24 p-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="w-24">
                <button
                  className={`btn btn-sm btn-ghost border-none flex items-center
                   rounded-lg tracking-wide text-[#808080] w-24 justify-center ${
                     !showERC1155
                       ? `btn btn-sm bg-[#9571f6] border-none flex items-center justify-center
                     w-24 rounded-lg tracking-wide text-white hover:text-[#efefef] hover:bg-[#8a69df] p-1`
                       : ""
                   }`}
                  onClick={handleToggle}
                >
                  ERC20
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-11/12 mx-auto border rounded-lg shadow-md bg-white`}
        >
          {userTokenBalanceResult.fetching ? (
            <div className="flex justify-center pt-2">
              <ClipLoader color="#808080" size={35} speedMultiplier={0.8} />
            </div>
          ) : showERC1155 ? (
            <div>
              {filteredTokenList.length === 0 ? (
                <p className="h3 text-center py-6">No ERC1155 tokens found</p>
              ) : (
                <div className="items-center text-center sm:text-left">
                  <DashboardCarousel
                    title="ERC1155"
                    item={filteredTokenList as UserERC1155TokenBalance[]}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              {filteredTokenList.length === 0 ? (
                <p className="h3 text-center py-6">No ERC20 tokens found</p>
              ) : (
                <DashboardTable
                  title="ERC20"
                  item={filteredTokenList as UserERC20TokenBalance[]}
                  onClick={handleClickERC20}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

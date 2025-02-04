import React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "next/link";

const WalletBook = () => {
  const tableData = [
    {
      nickname: "Stablecoin Wallet",
      blockchain: "Besu",
      address: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      status: "Active",
      addedDate: "08/24/2023",
    },
  ];

  return (
    <div className="bg-[#F9F9FC] text-left px-8 py-4">
      <div className="flex text-[#8A849C] font-bold p-6">
        <div className="w-3/12">NICKNAME</div>
        <div className="w-2/12">BLOCKCHAIN</div>
        <div className="w-5/12">WALLET ADDRESS</div>
        <div className="w-2/12">STATUS</div>
      </div>
      {tableData.map((item, index) => (
        <div
          className="flex items-center bg-white mb-4 p-6 font-medium text-primary rounded-2xl shadow-md"
          key={index}
        >
          <div className="w-3/12">
            <div className="flex items-center w-full">
              <AccountBalanceWalletIcon />
              <div className="flex flex-col ml-4">
                <p>{item.nickname}</p>
              </div>
            </div>
          </div>
          <div className="w-2/12">{item.blockchain}</div>
          <div className="w-5/12 text-[#8A849C]">
            {item.address} <ContentCopyIcon />
          </div>
          <div className="w-1/12">
            {item.status}
            <div className="text-[#8A849C]">Added {item.addedDate}</div>
          </div>
          <div className="w-1/12">
            <Link href="/dashboard/walletAddress/walletDetails">
              <ArrowForwardIosIcon />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletBook;

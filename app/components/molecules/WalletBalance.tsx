import React from "react";

interface WalletBalanceProps {
  balance: string;
  currency: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balance, currency }) => {
  return (
    <div className="flex flex-col bg-white w-full xl:w-80 px-5 py-3 border-[1px] mb-6 xl:mb-0 rounded-xl shadow-sm">
      <p className="text-[#697077] md:text-xl mb-1">TOTAL BALANCE</p>
      <div className="flex justify-between items-center">
        <div className="font-bold text-3xl">{balance}</div>
        <div className="text-md border-[1px] bg-[#F2F4F8] rounded-full px-2 py-1">{currency}</div>
      </div>
    </div>
  );
};

export default WalletBalance;

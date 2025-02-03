import React, { useState } from "react";
import Heading3 from "../../atoms/Heading3";
import TextInputIcon from "../../molecules/TextInputIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Step3 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Review withdraw details</h2>
      <p className="mb-6">Make sure the details of the withdraw are correct.</p>
      <div className="flex flex-col text-base w-[65%] p-3 text-left mx-auto border-2 rounded-xl">
        <div className="flex justify-between items-center w-full pb-3 border-b-2">
          <p className="text-left font-bold w-1/2">Wallet Address</p>
          <p className="w-1/2 overflow-auto">0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14</p>
        </div>
        <div className="flex justify-between items-center w-full py-3 border-b-2">
          <p className="text-left font-bold w-1/2">Recipient</p>
          <p className="w-1/2">Stablecoin Wallet</p>
        </div>
        <div className="flex justify-between items-center w-full py-3 border-b-2">
          <p className="text-left font-bold w-1/2">Amount</p>
          <p className="w-1/2">500 AUDC</p>
        </div>
        <div className="flex justify-between items-center w-full pt-3">
          <p className="text-left font-bold w-1/2">Fees</p>
          <p className="w-1/2">0.00 AUDC</p>
        </div>
      </div>
    </div>
  );
};

export default Step3;

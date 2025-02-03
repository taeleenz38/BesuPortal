import React, { useState } from "react";
import Heading3 from "../../atoms/Heading3";
import TextInputIcon from "../../molecules/TextInputIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Step3 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Review redeem details</h2>
      <p className="mb-6">Make sure the details of the redeem are correct.</p>
      <div className="flex flex-col text-base w-[65%] p-3 text-left mx-auto border-2 rounded-xl">
        <div className="flex justify-between items-center w-full pb-3 border-b-2">
          <p className="text-left font-bold w-1/2">Bank Account</p>
          <p className="w-1/2">Australia Independent Bank ****03</p>
        </div>
        <div className="flex justify-between items-center w-full py-3 border-b-2">
          <p className="text-left font-bold w-1/2">Recipient</p>
          <p className="w-1/2">AIB-AUD</p>
        </div>
        <div className="flex justify-between items-center w-full py-3 border-b-2">
          <p className="text-left font-bold w-1/2">Amount</p>
          <p className="w-1/2">200 AUDC</p>
        </div>
        <div className="flex justify-between items-center w-full pt-3">
          <p className="text-left font-bold w-1/2">Transfer Method</p>
          <p className="w-1/2">Bank Wire</p>
        </div>
      </div>
    </div>
  );
};

export default Step3;

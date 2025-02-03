import React from "react";
import OptionInput from "../../atoms/OptionInput";
import TextInput from "../../atoms/TextInput";

const Step2 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Select the amount you would like to send on the Ethereum blockchain
      </h2>
      <TextInput labelId="amount" labelText="Amount" type="number" />
      <div className="text-primary w-full text-base text-center mt-3">
        2000 AUDC Available.
      </div>
      <div className="w-2/3 mx-auto mt-6 text-base">
        <div className="w-full flex justify-between">
          <p className="font-medium text-[#4e4762] text-base">Fee</p>
          <p className="text-[#4e4762] text-base">-0.00</p>
        </div>
        <div className="w-full text-left text-[#4e4762] mt-1 pb-4 border-b-[1px]">
          You will not be charged on-chain fees for this transaction.
        </div>
        <div className="w-full flex justify-between pt-4">
          <p className="font-medium text-[#4e4762] text-base">Total Transferred</p>
          <p className="font-medium text-[#4e4762] text-base">500.00 AUDC</p>
        </div>
      </div>
    </div>
  );
};

export default Step2;

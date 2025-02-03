import React from "react";
import OptionInput from "../../atoms/OptionInput";

const Step2 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Select the bank you will transfer from
      </h2>
      <p className="mb-6">Select the bank account from which you will transfer funds:</p>
      <OptionInput
        labelText="Bank accounts"
        options={[
          { value: "AIB-AUD", label: "AIB-AUD" },
          { value: "NSB-USD", label: "NSB-USD" },
        ]}
      />
      <p className="mt-6">
        <b>Important Disclaimer:</b> ALOGO is not a bank; your ALOGO Mint account is
        not a bank account, and any funds are not insured by the Federal Deposit
        Insurance Corporation, the Securities Investor Protection Corporation or
        by any US or foreign government agency, insurance fund, person or
        entity.
      </p>
      <button className="text-primary w-full text-right mt-4">
        Add New Bank Account
      </button>
    </div>
  );
};

export default Step2;

import React from "react";
import OptionInput from "../../atoms/OptionInput";

const Step2 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Select the recipient of this redeem
      </h2>
      <p className="mb-6">Select a bank account to which you will redeem funds:</p>
      <OptionInput
        labelText="Bank accounts"
        options={[
          { value: "AIB-AUD", label: "AIB-AUD" },
          { value: "NSB-USD", label: "NSB-USD" },
        ]}
      />
      <button className="text-primary w-full text-right mt-4">
        Add New Bank Account
      </button>
    </div>
  );
};

export default Step2;

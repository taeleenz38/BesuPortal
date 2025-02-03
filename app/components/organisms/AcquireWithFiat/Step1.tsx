import React from "react";
import Heading3 from "../../atoms/Heading3";
import OptionInput from "../../atoms/OptionInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Confirm the currency you wish to deposit
      </h2>
      <p className="mb-6">Deposit AUD if you wish to mint AUDC.</p>
      <OptionInput
        labelText="Currency"
        options={[
          { value: "AUD", label: "AUD" },
          { value: "USD", label: "USD" },
          { value: "GBP", label: "GBP" },
        ]}
      />
      <OptionInput
        labelText="Amount"
        options={[
          { value: "100", label: "100" },
          { value: "250", label: "250" },
          { value: "500", label: "500" },
          { value: "1000", label: "1000" },
        ]}
      />
    </div>
  );
};

export default Step1;

import React from "react";
import InputLabel from "../../atoms/InputLabel";
import TextInput from "../../atoms/TextInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Select the amount to redeem</h2>
      <p className="mb-6">
        Enter the AUD amount that you wish to redeem with your AUDC balance.
      </p>
      <TextInput labelId="amount" labelText="Amount" type="number" />
      <div className="text-primary w-full text-base text-left mt-3">
        2000 AUDC Available.
      </div>
    </div>
  );
};

export default Step1;

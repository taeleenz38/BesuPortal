import React from "react";
import OptionInput from "../../atoms/OptionInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Who does this address belong to?
      </h2>
      <p className="mb-6">
        Select whether the address belongs to your business or someone else.
      </p>
      <OptionInput
        labelText="My Business / Someone Else"
        options={[
          { value: "My Business", label: "My Business" },
          { value: "Someone Else", label: "Someone Else" },
        ]}
      />
    </div>
  );
};

export default Step1;

import React from "react";
import OptionInput from "../../atoms/OptionInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Bank account location</h2>
      <p className="mb-6">
        Please tell us where your bank account is domiciled.
      </p>
      <OptionInput
        labelText="Bank Country"
        options={[{ value: "AU", label: "Australia" }]}
      />
      <div className="mt-2">
        <OptionInput
          labelText="Bank City"
          options={[
            { value: "Melbourne", label: "Melbourne" },
            { value: "Sydney", label: "Sydney" },
            { value: "Brisbane", label: "Brisbane" },
          ]}
        />
      </div>
    </div>
  );
};

export default Step1;

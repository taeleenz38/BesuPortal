import React from "react";
import Heading3 from "../../atoms/Heading3";
import OptionInput from "../../atoms/OptionInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Confirm the AUDC Chain
      </h2>
      <p className="mb-6">ALOGO supports transfer of AUDC across the following networks:</p>
      <OptionInput
        labelText="Network"
        options={[
          { value: "Ethereum", label: "Ethereum" },
          { value: "Polygon", label: "Polygon" }
        ]}
      />
    </div>
  );
};

export default Step1;

import React from "react";
import Heading3 from "../../atoms/Heading3";
import OptionInput from "../../atoms/OptionInput";

const Step1 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Select the recipient of this transfer
      </h2>
      <p className="mb-6">
        Select a wallet address to which you will transfer funds to. Newly added
        addresses will be enabled after 24 hours.
      </p>
      <OptionInput
        labelText="Wallet Network"
        options={[
          { value: "Ethereum", label: "Ethereum" },
          { value: "Polygon", label: "Polygon" },
        ]}
      />
      <OptionInput
        labelText="Wallet Address"
        options={[
          {
            value: "0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14 ",
            label: "0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14 ",
          },
          {
            value: "0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14",
            label: "0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14 (Polygon L2)",
          },
        ]}
      />
      <button className="text-primary w-full text-right mt-4 text-base">
        Add New Wallet Address
      </button>
      <div className=" text-gray-500 text-right mt-2 text-base">
        New addresses will be enabled after 24 hours.
      </div>
    </div>
  );
};

export default Step1;

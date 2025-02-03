import React from "react";
import OptionInput from "../../atoms/OptionInput";
import TextInput from "../../atoms/TextInput";

const Step2 = () => {
  return (
    <div className=" w-2/3 mx-auto">
      <h2 className="text-4xl text-center font-bold mb-8">
        Add wallet address to your address book
      </h2>
      <p className="text-center mb-6">
        Please provide the details of your wallet address
      </p>
      <p>Select Blockchain</p>
      <div className="mb-4">
        <OptionInput
          labelText="Blockchain"
          options={[
            { value: "ETH", label: "ETH" },
            { value: "SOL", label: "SOL" },
            { value: "AVAX", label: "AVAX" },
          ]}
        />
      </div>
      <p>Wallet address</p>
      <div className="mb-4">
        <TextInput
          labelText="Wallet Address"
          labelId="Wallet Address"
          type="text"
        />
      </div>{" "}
      <p>Wallet nickname</p>
      <div className="mb-6">
        <TextInput
          labelText="Wallet Nickname"
          labelId="Wallet Nickname"
          type="text"
        />
      </div>{" "}
      <p>
        <b>Important:</b> You will have to wait 24 hours to use this new
        address.{" "}
      </p>
    </div>
  );
};

export default Step2;

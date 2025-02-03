import React from "react";
import OptionInput from "../../atoms/OptionInput";
import TextInput from "../../atoms/TextInput";

const Step2 = () => {
  return (
    <div className=" w-2/3 mx-auto">
      <h2 className="text-4xl text-center font-bold mb-8">
        Bank account information
      </h2>
      <p>Bank Name</p>
      <div className="mb-4">
        <TextInput labelText="Bank Name" labelId="Bank Name" type="text" />
      </div>
      <p>Nickname</p>
      <div className="mb-4">
        <TextInput labelText="Nickname" labelId="Nickname" type="text" />
      </div>{" "}
      <p>BSB</p>
      <div className="mb-4">
        <TextInput labelText="BSB" labelId="BSB" type="text" />
      </div>{" "}
      <p>Account Number</p>
      <div className="mb-4">
        <TextInput labelText="Account Number" labelId="Account Number" type="text" />
      </div>{" "}
      <p>BIC / SWIFT</p>
      <div className="mb-4">
        <TextInput labelText="BIC / SWIFT" labelId="BIC / SWIFT" type="text" />
      </div>
    </div>
  );
};

export default Step2;

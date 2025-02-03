import React from "react";
import Heading3 from "../../atoms/Heading3";
import TextInputIcon from "../../molecules/TextInputIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckboxWithLabel from "../../molecules/CheckboxWithLabel";

const Step3 = () => {
  return (
    <div className="w-2/3 mx-auto">
      <h2 className="text-4xl text-center font-bold mb-8">
        Beneficiary bank account details
      </h2>
      <p className="mb-6 text-center">
        <b>Important:</b> The details you provide below must match the details
        on your bank account statement, otherwise transfers for this account may
        be rejected. 
      </p>
      <p>Bank Account Holder</p>
      <TextInputIcon
        labelId="Bank Address"
        labelText="Bank Address"
        type="text"
        icon={<ContentCopyIcon />}
        value=" "
      />
      <p className="mt-4">Company Address</p>
      <TextInputIcon
        labelId="Company Address"
        labelText="Company Address"
        type="text"
        icon={<ContentCopyIcon />}
        value=" "
      />
      <div className="flex justify-between">
        <div className="w-[49%]">
          <TextInputIcon
            labelId="City"
            labelText="City"
            type="text"
            icon={<ContentCopyIcon />}
            value=" "
          />
        </div>
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Country"
            labelText="Country"
            type="text"
            icon={<ContentCopyIcon />}
            value=" "
          />
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Zip Code"
            labelText="Zip Code"
            type="text"
            icon={<ContentCopyIcon />}
            value=" "
          />
        </div>
        <div className="w-[49%]">
          <TextInputIcon
            labelId="State"
            labelText="State"
            type="text"
            icon={<ContentCopyIcon />}
            value=" "
          />
        </div>
      </div>
      <CheckboxWithLabel labelText="This bank account belongs to my organisation." />
    </div>
  );
};

export default Step3;

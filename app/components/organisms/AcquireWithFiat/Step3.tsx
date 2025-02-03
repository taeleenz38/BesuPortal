import React, { useState } from "react";
import Heading3 from "../../atoms/Heading3";
import TextInputIcon from "../../molecules/TextInputIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Step3 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">
        Beneficiary bank account details
      </h2>
      <p className="mb-6">
        This will be acquired by your bank to complete the wire transfer.
      </p>
      <div className="flex justify-between">
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Beneficiary BSB Number"
            labelText="Beneficiary BSB Number"
            type="text"
            icon={<ContentCopyIcon />}
            value="048442"
          />
        </div>
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Beneficiary Account Number"
            labelText="Beneficiary Account Number"
            type="text"
            icon={<ContentCopyIcon />}
            value="993732351"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Beneficiary Account Currency"
            labelText="Beneficiary Account Currency"
            type="text"
            icon={<ContentCopyIcon />}
            value="AUD"
          />
        </div>
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Beneficiary Name"
            labelText="Beneficiary Name"
            type="text"
            icon={<ContentCopyIcon />}
            value="ALOGO"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[49%]">
          <TextInputIcon
            labelId="Bank Name"
            labelText="Bank Name"
            type="text"
            icon={<ContentCopyIcon />}
            value="National Security Bank"
          />
        </div>
        <div className="w-[49%]">
          <TextInputIcon
            labelId="SWIFT/BIC Code"
            labelText="SWIFT/BIC Code"
            type="text"
            icon={<ContentCopyIcon />}
            value="CTBAAU2S"
          />
        </div>
      </div>
      <TextInputIcon
        labelId="Bank Address"
        labelText="Bank Address"
        type="text"
        icon={<ContentCopyIcon />}
        value="201 Sussex St, Sydney NSW 2000, Australia"
      />
      <TextInputIcon
        labelId="Tracking Reference Number"
        labelText="Tracking Reference Number"
        type="text"
        icon={<ContentCopyIcon />}
        value="T512940SX0"
      />
    </div>
  );
};

export default Step3;

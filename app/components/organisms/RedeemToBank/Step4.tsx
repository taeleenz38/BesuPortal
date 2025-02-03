import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextInputIcon from "../../molecules/TextInputIcon";

const Step4 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Enter authentication code</h2>
      <p className="mb-10">Enter the 6-digit code displayed in your app.</p>
      <TextInputIcon
        labelId="OTP"
        labelText="OTP"
        type="text"
        icon={<ContentCopyIcon />}
        value=""
      />
    </div>
  );
};

export default Step4;

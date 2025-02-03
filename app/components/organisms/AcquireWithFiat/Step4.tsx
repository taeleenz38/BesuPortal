import React from "react";
import AcquireStep4Card from "../../molecules/AcquireStep4Card";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PaidIcon from "@mui/icons-material/Paid";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Step4 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Transfer your funds</h2>
      <p className="mb-10">
        This information will be required by your bank to complete the wire
        transfer.
      </p>
      <div className="flex mb-10 justify-between">
        <div className="w-[45%]">
          <AcquireStep4Card
            icon={<SwapHorizIcon />}
            heading="Initiate a transfer"
            text="If you haven't already, please initiate a funds transfer to the bank account details listed on the previous steps."
          />
        </div>
        <div className="w-[45%]">
          <AcquireStep4Card
            icon={<PaidIcon />}
            heading="Receive stablecoins"
            text="Once we receive the funds, we will add the corresponding amount of stablecoins to your account."
          />
        </div>
      </div>
      <AcquireStep4Card
        icon={<WarningAmberIcon />}
        heading="Important Disclosure"
        text="If you fail to include the correct Reference ID, we will be unable to identify your transfer, your funds may be returned and we may charge you a penalty fee."
      />
    </div>
  );
};

export default Step4;

import React from "react";
import OptionInput from "../../atoms/OptionInput";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Image from "next/image";

const Step2 = () => {
  return (
    <div className="text-center w-2/3 mx-auto">
      <h2 className="text-4xl font-bold mb-8">Ethereum Wallet</h2>
      <p className="mb-6">
        To transfer AUDC from an external Ethereum wallet, use the Ethereum
        address provided here. Copy and paste to ensure accuracy.
      </p>
      <div className="flex justify-between w-full mt-8">
        <div className="flex flex-col">
          <div className="flex flex-col mb-5">
            <h5 className="text-[#4e4762] text-left font-bold">
              Your Wallet Address
            </h5>
            <p className="text-[#4e4762] text-base text-left">
              Use the Ethereum address provided here to receive AUDC.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#4e4762] text-left font-bold mb-2">
              Copy and paste
            </p>
            <div className="text-[#4e4762] text-base px-3 py-2 border-[2px] rounded-xl">
              <span className="mr-4">
                0xe0e3D4141D7FC3697AD469b4ED5b149D30b7069B
              </span>
              <span>
                <ContentCopyIcon />
              </span>
            </div>
          </div>
        </div>
        <Image
          src="/images/QRCODE.png"
          alt="QRCODE"
          width={130}
          height={130}
          className=""
        />
      </div>
    </div>
  );
};

export default Step2;

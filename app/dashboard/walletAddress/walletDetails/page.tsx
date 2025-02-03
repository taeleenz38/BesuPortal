import React from "react";
import Heading2 from "@/app/components/atoms/Heading2";
import Link from "next/link";
import ButtonLeftIcon from "@/app/components/molecules/ButtonLeftIcon";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import WalletDetailsTable from "@/app/components/organisms/WalletDetailsTable";
import WalletTransactionHistory from "@/app/components/organisms/WalletTransactionHistory";
import { transactions } from "@/app/components/organisms/WalletTransactionData";

const WalletDetails = () => {
  return (
    <div className="pl-[450px] pr-[100px] mt-10">
      <div className="flex justify-between items-start mb-16">
        <Heading2 text="Wallet Address Details: Stablecoin Wallet" />
        <div className="flex">
          <div className="w-44 mr-5">
            <Button
              className="bg-white text-primary text-xl capitalize font-medium h-14 hover:bg-primary hover:text-white"
              variant="contained"
              fullWidth
            >
              Edit
            </Button>
          </div>
          <div className="w-44">
            <ButtonLeftIcon text="Deposit" startIcon={<LoginIcon />} />
          </div>
        </div>
      </div>
      <WalletDetailsTable />
      <WalletTransactionHistory transactions={transactions} />
      <p className="mt-16">
        To remove or update a wallet address, contact us via our{" "}
        <Link href="#" className=" underline">
          support page
        </Link>
        .
      </p>
    </div>
  );
};

export default WalletDetails;

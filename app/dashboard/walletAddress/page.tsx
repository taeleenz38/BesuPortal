"use client";
import Heading2 from "@/app/components/atoms/Heading2";
import React, { useState } from "react";
import Link from "next/link";
import ButtonLeftIcon from "@/app/components/molecules/ButtonLeftIcon";
import AddIcon from "@mui/icons-material/Add";
import WalletBook from "@/app/components/organisms/WalletBook";
import AddWalletForm from "@/app/components/organisms/AddWalletForm";
import OpacityFilter from "@/app/components/atoms/OpacityFilter";

const WalletAddress = () => {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen((prevFormOpen) => !prevFormOpen);
  };
  return (
    <div className="pl-[450px] pr-[100px] mt-10">
      {formOpen && <AddWalletForm toggleForm={toggleForm} />}
      {formOpen && <OpacityFilter />}
      <Heading2 text="Wallet Address Book" />
      <div className="flex justify-between items-end mb-24">
        <div>
          <p className="mb-2">
            To remove or update a wallet address, contact us via our{" "}
            <Link href="#" className=" underline">
              support page
            </Link>
            .
          </p>
          <p>
            Please be aware that only wallets provided by Alogo are valid for
            transactions on the platform.
          </p>
        </div>
        <div className="flex gap-6">
          {/* <div className="w-44" onClick={toggleForm}>
          <ButtonLeftIcon text="Add Wallet" startIcon={<AddIcon />} />
        </div> */}
          <button
            className="bg-[#8A69DF] hover:bg-[#9476E1] duration-100 font-medium rounded-3xl px-5 text-white text-md"
            onClick={toggleForm}
          >
            Add Wallet
          </button>
          <w3m-button />
        </div>
      </div>
      <WalletBook />
    </div>
  );
};

export default WalletAddress;

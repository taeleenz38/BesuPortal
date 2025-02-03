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
        <p>
          To remove or update a wallet address, contact us via our{" "}
          <Link href="#" className=" underline">
            support page
          </Link>
          .
        </p>
        <div className="w-44" onClick={toggleForm}>
          <ButtonLeftIcon text="Add Wallet" startIcon={<AddIcon />} />
        </div>
      </div>
      <WalletBook />
    </div>
  );
};

export default WalletAddress;

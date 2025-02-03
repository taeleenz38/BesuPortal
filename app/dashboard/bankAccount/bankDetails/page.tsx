"use client"
import Heading2 from "@/app/components/atoms/Heading2";
import Link from "next/link";
import ButtonLeftIcon from "@/app/components/molecules/ButtonLeftIcon";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import BankDetailsTable from "@/app/components/organisms/BankDetailsTable";
import React, { useState } from "react";
import AcquireForm from "@/app/components/organisms/AcquireForm";
import OpacityFilter from "@/app/components/atoms/OpacityFilter";

const BankDetails = () => {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen((prevFormOpen) => !prevFormOpen);
  };

  return (
    <div className="pl-[525px] pr-[175px] mt-10">
      {formOpen && <AcquireForm toggleForm={toggleForm} />}
      {formOpen && <OpacityFilter />}
      <div className="flex justify-between items-start mb-16">
        <Heading2 text="Bank Details: ANZ Banking PTY LTD" />
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
          <div className="w-44" onClick={toggleForm}>
            <ButtonLeftIcon text="Acquire" startIcon={<LoginIcon />} />
          </div>
        </div>
      </div>
      <BankDetailsTable />
      <p className="mt-16">
        To remove or update a bank account, contact us via our{" "}
        <Link href="#" className=" underline">
          support page
        </Link>
        .
      </p>
    </div>
  );
};

export default BankDetails;

"use client"
import React, { useState } from "react";
import Heading2 from "../../components/atoms/Heading2";
import Link from "next/link";
import ButtonLeftIcon from "../../components/molecules/ButtonLeftIcon";
import AddIcon from "@mui/icons-material/Add";
import BankAccountsTable from "@/app/components/organisms/BankAccountsTable";
import AddBankForm from "@/app/components/organisms/AddBankForm";
import OpacityFilter from "@/app/components/atoms/OpacityFilter";

const BankAccount = () => {
  const [formOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen((prevFormOpen) => !prevFormOpen);
  };

  return (
    <div className="pl-[450px] pr-[100px] mt-10">
      {formOpen && <AddBankForm toggleForm={toggleForm} />}
      {formOpen && <OpacityFilter />}
      <Heading2 text="Bank Accounts" />
      <div className="flex justify-between items-end mb-24">
        <p>
          To remove or update a bank account, contact us via our{" "}
          <Link href="#" className=" underline">
            support page
          </Link>
          .
        </p>
        <div className="w-44" onClick={toggleForm}>
          <ButtonLeftIcon text="Add Bank" startIcon={<AddIcon />} />
        </div>
      </div>
      <BankAccountsTable />
    </div>
  );
};

export default BankAccount;

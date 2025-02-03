import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const BankAccountsTable = () => {
  const tableData = [
    {
      bankName: "AIB-AUD",
      bankDetails: "Australia Independent Bank",
      type: "Wire",
      accountHolder: "Ted Hansen",
      status: "Active",
      addedDate: "07/28/2023",
    },
    {
      bankName: "NSB-USD",
      bankDetails: "National Security Bank",
      type: "Wire",
      accountHolder: "Ted Hansen",
      status: "Active",
      addedDate: "02/12/2024",
    },
  ];

  return (
    <div className="bg-[#F9F9FC] text-left px-8 py-4">
      <div className="flex text-[#8A849C] font-bold p-6">
        <div className="w-4/12">BANK NAME</div>
        <div className="w-2/12">TYPE</div>
        <div className="w-3/12">ACCOUNT HOLDER</div>
        <div className="w-3/12">STATUS</div>
      </div>
      {tableData.map((item, index) => (
        <div
          className="flex items-center bg-white mb-4 p-6 font-medium text-primary rounded-2xl shadow-md"
          key={index}
        >
          <div className="w-4/12">
            <div className="flex items-center w-full">
              <AccountBalanceIcon />
              <div className="flex flex-col ml-4">
                <p>{item.bankName}</p>
                <p className="text-[#8A849C]">{item.bankDetails}</p>
              </div>
            </div>
          </div>
          <div className="w-2/12">{item.type}</div>
          <div className="w-3/12">{item.accountHolder}</div>
          <div className="w-2/12">
            {item.status}
            <div className="text-[#8A849C]">Added {item.addedDate}</div>
          </div>
          <div className="w-1/12">
            <Link href="/dashboard/bankAccount/bankDetails">
              <ArrowForwardIosIcon />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankAccountsTable;

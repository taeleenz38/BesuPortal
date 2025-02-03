import React from "react";

const BankDetailsTable = () => {
  return (
    <div className="bg-white w-full px-20 py-10 rounded-xl shadow-sm">
      <div className="font-bold py-4 mb-4 border-b-[1px] text-xl w-7/12">
        Bank account information
      </div>
      <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
        <div className="col-span-1 font-medium">Bank Name</div>
        <div className="col-span-2">
          Australia International Banking Limited
        </div>
      </div>
      <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
        <div className="col-span-1 font-medium">Account Holder Address</div>
        <div className="col-span-2">1102/81 Abeckett St, Melbourne, VIC 3000</div>
      </div>
      <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
        <div className="col-span-1 font-medium">Account Holder Name</div>
        <div className="col-span-2">Ted Hansen</div>
      </div>
      <div className="grid grid-cols-3 pl-4 w-7/12 mb-4">
        <div className="col-span-1 font-medium">Bank Linked On</div>
        <div className="col-span-2">07/28/2023</div>
      </div>
    </div>
  );
};

export default BankDetailsTable;

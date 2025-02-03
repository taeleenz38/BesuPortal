import Heading2 from "@/app/components/atoms/Heading2";
import React from "react";

const request = () => {
  return (
    <div className="pl-[450px] pr-[100px] mt-10">
      <Heading2 text="Request Details" />
      <div className="bg-white w-full px-20 py-10 rounded-xl shadow-sm mt-10">
        <div className="font-bold py-4 mb-4 border-b-[1px] text-xl w-7/12">
          Request: Acquire 500 AUDC with fiat (AUD)
        </div>
        <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
          <div className="col-span-1 font-medium">User</div>
          <div className="col-span-2">Ted Hansen</div>
        </div>
        <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
          <div className="col-span-1 font-medium">Bank Account Name</div>
          <div className="col-span-2">AIB-AUD (Australia Independent Bank)</div>
        </div>
        <div className="grid grid-cols-3 pl-4 w-7/12 pb-14 mb-4 border-b-[1px]">
          <div className="col-span-1 font-medium">Bank Account Details</div>
          <div className="col-span-2">393422-676964455</div>
        </div>
        <div className="grid grid-cols-3 pl-4 w-7/12 mb-4">
          <div className="col-span-1 font-medium">Wallet Address</div>
          <div className="col-span-2">
            0x866BA0c6B77f1137F5650d73C0c4aD557F2fbC14
          </div>
        </div>
      </div>
    </div>
  );
};

export default request;

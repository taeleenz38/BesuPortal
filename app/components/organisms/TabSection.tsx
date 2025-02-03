import React, { useState } from "react";
import ButtonLeftIcon from "../molecules/ButtonLeftIcon";
import ButtonLeftIcon2 from "../molecules/ButtonLeftIcon2";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import WalletBalance from "../molecules/WalletBalance";
import AcquireForm from "./AcquireForm";
import DepositForm from "./DepositForm";
import RedeemForm from "./RedeemForm";
import WithdrawForm from "./WithdrawForm";
import OpacityFilter from "../atoms/OpacityFilter";

interface TabSectionProps {
  balance: string;
  currency: string;
}

const TabSection: React.FC<TabSectionProps> = ({ balance, currency }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [depositFormOpen, setDepositFormOpen] = useState(false);
  const [redeemFormOpen, setRedeemFormOpen] = useState(false);
  const [withdrawFormOpen, setWithdrawFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen((prevFormOpen) => !prevFormOpen);
  };

  const toggleDepositForm = () => {
    setDepositFormOpen((prevDepositFormOpen) => !prevDepositFormOpen);
  };

  const toggleRedeemForm = () => {
    setRedeemFormOpen((prevRedeemFormOpen) => !prevRedeemFormOpen);
  };

  const toggleWithdrawForm = () => {
    setWithdrawFormOpen((prevWithdrawFormOpen) => !prevWithdrawFormOpen);
  };

  return (
    <div className="flex flex-col xl:flex-row justify-between xl:items-center w-full">
      {formOpen && <AcquireForm toggleForm={toggleForm} />}
      {formOpen && <OpacityFilter />}
      {depositFormOpen && <DepositForm toggleDepositForm={toggleDepositForm} />}
      {depositFormOpen && <OpacityFilter />}
      {redeemFormOpen && <RedeemForm toggleRedeemForm={toggleRedeemForm} />}
      {redeemFormOpen && <OpacityFilter />}
      {withdrawFormOpen && (
        <WithdrawForm toggleWithdrawForm={toggleWithdrawForm} />
      )}
      {withdrawFormOpen && <OpacityFilter />}
      <WalletBalance balance={balance} currency={currency} />
      <div className="hidden md:flex md:w-[100%] xl:w-[75%] justify-start xl:justify-end">
        <div className="md:w-[24%] xl:w-[20%] mr-3" onClick={toggleForm}>
          <ButtonLeftIcon startIcon={<LoginIcon />} text="Acquire" />
        </div>
        <div className="md:w-[24%] xl:w-[20%] mr-6" onClick={toggleDepositForm}>
          <ButtonLeftIcon startIcon={<LoginIcon />} text="Deposit" />
        </div>
        <div className="md:w-[24%] xl:w-[20%] mr-3" onClick={toggleRedeemForm}>
          <ButtonLeftIcon2 startIcon={<LogoutIcon />} text="Redeem" />
        </div>
        <div className="md:w-[24%] xl:w-[20%]" onClick={toggleWithdrawForm}>
          <ButtonLeftIcon2 startIcon={<LogoutIcon />} text="Withdraw" />
        </div>
      </div>
      <div className="flex flex-col w-[100%] md:hidden justify-start">
        <div className="flex justify-around">
          <div className="w-[46%]" onClick={toggleForm}>
            <ButtonLeftIcon startIcon={<LoginIcon />} text="Acquire" />
          </div>
          <div
            className="w-[46%]"
            onClick={toggleDepositForm}
          >
            <ButtonLeftIcon startIcon={<LoginIcon />} text="Deposit" />
          </div>
        </div>
        <div className="flex justify-around mt-3">
          <div
            className="w-[46%]"
            onClick={toggleRedeemForm}
          >
            <ButtonLeftIcon2 startIcon={<LogoutIcon />} text="Redeem" />
          </div>
          <div className="w-[46%]" onClick={toggleWithdrawForm}>
            <ButtonLeftIcon2 startIcon={<LogoutIcon />} text="Withdraw" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;

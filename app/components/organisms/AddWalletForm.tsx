"use client";
import React, { useState } from "react";
import OptionInput from "../atoms/OptionInput";
import { MobileStepper, Button } from "@mui/material";
import "./AcquireWithFiat/Stepper.css";
import TextInput from "../atoms/TextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddWalletFormProps {
  toggleForm: () => void; // Assuming toggleForm is a function with no arguments and returns void
}

const AddWalletForm: React.FC<AddWalletFormProps> = ({ toggleForm }) => {
  const handleSubmit = async () => {
    toast.success(
      "Request submitted successfully - please wait up to 24 hours to receive an email with your wallet details.",
      {
        className: "custom-toast",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="bg-white p-6 w-[1000px] fixed top-[20%] left-[50%] rounded-3xl z-30 ml-[-500px]">
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={toggleForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center w-2/3 mx-auto">
        <h2 className="text-4xl font-bold mb-8">New Wallet Details</h2>
        <p className="mb-6">Please fill in the details for your new wallet.</p>
        <OptionInput
          labelText="Network"
          options={[
            { value: "Besu", label: "Besu" },
            { value: "Ethereum", label: "Ethereum" },
          ]}
        />
        <div className="mt-2">
          <TextInput
            labelId="filled-basic"
            labelText="Wallet Nickname"
            type="text"
          />
        </div>
        <Button
          size="medium"
          className="font-semibold text-lg mt-4"
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default AddWalletForm;

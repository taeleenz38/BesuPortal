"use client";
import React, { useState } from "react";
import Step1 from "./WithdrawOnChain/Step1";
import Step2 from "./WithdrawOnChain/Step2";
import Step3 from "./WithdrawOnChain/Step3";
import Step4 from "./WithdrawOnChain/Step4";

import { MobileStepper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./AcquireWithFiat/Stepper.css";

interface WithdrawFormProps {
  toggleWithdrawForm: () => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ toggleWithdrawForm }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 4;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    toggleWithdrawForm();
  };

  const getStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 w-[1000px] text-lg fixed top-[20%] left-[50%] rounded-3xl z-30 ml-[-500px]">
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={toggleWithdrawForm}
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
      <div className="mb-10">{getStepContent(activeStep)}</div>
      <div className="w-5/6 mx-auto text-primary">
        <MobileStepper
          steps={totalSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="medium"
              className="font-bold text-lg"
              onClick={activeStep === totalSteps - 1 ? handleDone : handleNext}
            >
              {activeStep === totalSteps - 1 ? "Done" : "Next"}
            </Button>
          }
          backButton={
            <Button
              size="medium"
              className="font-bold text-lg"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
          variant="dots"
        />
      </div>
    </div>
  );
};

export default WithdrawForm;

"use client";
import React, { useState } from "react";
import Step1 from "./AddWallet/Step1";
import Step2 from "./AddWallet/Step2";
import Step3 from "./AddWallet/Step3";
import { MobileStepper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./AcquireWithFiat/Stepper.css";

interface AddBankFormProps {
  toggleForm: () => void; // Assuming toggleForm is a function with no arguments and returns void
}

const AcquireForm: React.FC<AddBankFormProps> = ({ toggleForm }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    toggleForm(); // Call the toggleForm function to close the form
  };

  const getStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };
  

  return (
    <div className="bg-white p-6 w-[1000px] fixed top-[20%] left-[50%] rounded-3xl z-30 ml-[-500px]">
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

export default AcquireForm;

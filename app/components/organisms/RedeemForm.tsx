"use client";
import React, { useState } from "react";
import Step1 from "./RedeemToBank/Step1";
import Step2 from "./RedeemToBank/Step2";
import Step3 from "./RedeemToBank/Step3";
import Step4 from "./RedeemToBank/Step4";

import { MobileStepper, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./AcquireWithFiat/Stepper.css";


interface RedeemFormProps {
  toggleRedeemForm: () => void;
}

const RedeemForm: React.FC<RedeemFormProps> = ({ toggleRedeemForm }) => {
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
    toggleRedeemForm();
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

export default RedeemForm;

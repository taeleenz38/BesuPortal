import React, { ReactNode } from "react";
import Button from "@mui/material/Button";

interface ButtonRightIconProps {
  endIcon: ReactNode;
  text: string;
}

const ButtonRightIcon: React.FC<ButtonRightIconProps> = ({ text, endIcon }) => {
  return (
    <Button
      className="bg-primary capitalize text-xl font-medium h-14 hover:bg-[white] hover:text-primary"
      variant="contained"
      endIcon={endIcon}
      fullWidth
    >
      {text}
    </Button>
  );
};

export default ButtonRightIcon;

import React from "react";
import Button from "@mui/material/Button";


interface ButtonNoIconProps {
  text: string;
}

const ButtonNoIcon: React.FC<ButtonNoIconProps> = ({ text }) => {
  return (
    <Button
      className="bg-primary text-xl capitalize font-medium h-14 hover:bg-[white] hover:text-primary"
      variant="contained"
      fullWidth
    >
      {text}
    </Button>
  );
};

export default ButtonNoIcon;

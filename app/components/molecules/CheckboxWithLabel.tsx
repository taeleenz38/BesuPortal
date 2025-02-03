import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface CheckboxProps {
  labelText: string;
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({ labelText }) => {
  return <FormControlLabel required control={<Checkbox />} label={labelText} />;
};

export default CheckboxWithLabel;

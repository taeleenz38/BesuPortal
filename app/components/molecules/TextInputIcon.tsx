import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface TextInputIconProps {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  icon: ReactNode;
}

const TextInputIcon: React.FC<TextInputIconProps> = ({
  labelText,
  labelId,
  type,
  icon,
  value
}) => {
  return (
    <TextField
      id={labelId}
      label={labelText}
      type={type}
      fullWidth
      margin="normal"
      variant="filled"
      defaultValue={value}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  );
};

export default TextInputIcon;

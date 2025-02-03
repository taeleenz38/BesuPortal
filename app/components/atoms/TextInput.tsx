import React from "react";
import TextField from "@mui/material/TextField";

interface TextInputProps {
  labelText: string;
  labelId: string;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({ labelText, labelId, type }) => {
  return (
    <TextField
      id={labelId}
      label={labelText}
      type={type}
      fullWidth
      margin="dense"
      variant="filled"
    />
  );
};

export default TextInput;

"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface OptionInputProps {
  labelText: string;
  options: { value: string; label: string }[];
}

const OptionInput: React.FC<OptionInputProps> = ({ labelText, options }) => {
  const [item, setItem] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value);
  };

  return (
    <FormControl fullWidth margin="dense" variant="filled">
      <InputLabel id="demo-simple-select-filled-label">{labelText}</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={item}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionInput;

import React from "react";

interface InputLabelProps {
  text: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ text }) => {
  return <p className="text-md mt-4">{text}</p>;
};

export default InputLabel;

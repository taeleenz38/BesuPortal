import React from "react";

interface Heading2Props {
  text: string;
}

const Heading2: React.FC<Heading2Props> = ({ text }) => {
  return <h2 className="text-4xl lg:text-5xl font-bold mb-6">{text}</h2>;
};

export default Heading2;


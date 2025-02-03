import React, { ReactNode } from "react";

interface AcquireStep4CardProps {
  icon: ReactNode;
  heading: string;
  text: string;
}

const AcquireStep4Card: React.FC<AcquireStep4CardProps> = ({
  icon,
  heading,
  text,
}) => {
  return <div className="flex flex-col justify-center items-center text-[#4E4762]">
    {icon}
    <p className="font-bold text-lg ">{heading}</p>
    <p>{text}</p>
  </div>;
};

export default AcquireStep4Card;

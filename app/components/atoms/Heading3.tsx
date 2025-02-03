import React from 'react'

interface Heading3Props {
    text: string;
  }
  
  const Heading3: React.FC<Heading3Props> = ({ text }) => {
    return <h2 className="text-2xl xl:text-4xl font-bold mt-6 xl:mt-12">{text}</h2>;
  };

export default Heading3
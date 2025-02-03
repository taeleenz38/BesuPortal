import React from "react";
import SignUpForm from "../organisms/SignUpForm";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="xl:grid xl:grid-cols-2 gap-0 p-0 m-0 text-black">
      <div className="relative h-60 xl:h-screen">
        <Image src="/images/LOGO.png" alt="logo" objectFit="cover" fill />
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;

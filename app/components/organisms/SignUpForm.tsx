import React from "react";
import TextInput from "../atoms/TextInput";
import Heading2 from "../atoms/Heading2";
import InputLabel from "../atoms/InputLabel";
import ButtonNoIcon from "../atoms/ButtonNoIcon";
import CheckboxWithLabel from "../molecules/CheckboxWithLabel";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import OptionInput from "../atoms/OptionInput";

const SignUpForm = () => {
  return (
    <div className="px-8 xl:px-28 mb-8 xl:my-auto">
      <div className="mt-8 xl:mt-0">
        <Heading2 text="Sign Up" />
      </div>
      <div className="flex justify-between m-0">
        <div className="w-[49%]">
          <InputLabel text="First Name" />
          <TextInput
            labelId="filled-basic"
            labelText="First Name"
            type="text"
          />
        </div>
        <div className="w-[49%]">
          <InputLabel text="Last Name" />
          <TextInput labelId="filled-basic" labelText="Last Name" type="text" />
        </div>
      </div>
      <InputLabel text="Business Name" />
      <TextInput labelId="filled-basic" labelText="Business Name" type="text" />
      <InputLabel text="Work Email" />
      <TextInput labelId="filled-basic" labelText="Work Email" type="email" />
      <InputLabel text="Country" />
      <OptionInput
        labelText="Country"
        options={[
          { value: "AU", label: "Australia" },
          { value: "UK", label: "United Kingdom" },
          { value: "USA", label: "United States" },
        ]}
      />
      <InputLabel text="Password" />
      <TextInput
        labelId="filled-password-input"
        labelText="Password"
        type="password"
      />
      <div className="my-4">
        <CheckboxWithLabel labelText="I agree to the User Agreement, Privacy Policy, Acceptable Use Policy, Cookie Policy, E-Sign Consent and Risk Factors" />
      </div>
      <Link href="/dashboard">
        <ButtonNoIcon text="Create Account" />
      </Link>
      <Divider className="my-10 xl:my-14"></Divider>
      <Link className="text-primary" href="/">
        Already have an account? Sign In here
      </Link>
    </div>
  );
};

export default SignUpForm;

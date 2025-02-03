import Link from "next/link";
import Heading2 from "../atoms/Heading2";
import PingOneSignInButton from "../auth/PingOneSignIn";

const SignInForm = () => {
  return (
    <div className="px-8 lg:px-28 my-auto">
      <div className="mt-8 lg:mt-0">
        <Heading2 text="Sign In" />
      </div>
      {/* <InputLabel text="Email Address" />
      <TextInput
        labelId="filled-basic"
        labelText="Email Address"
        type="email"
      />
      <InputLabel text="Password" />
      <TextInput
        labelId="filled-password-input"
        labelText="Password"
        type="password"
      /> */}
      <PingOneSignInButton /> 
      <div className="flex justify-between items-center my-3 lg:my-4">
        {/* <CheckboxWithLabel labelText="Remember me" /> */}
        <Link href="#" className="text-primary">
          Forgot Password?
        </Link>
      </div>

      {/* <Divider className="my-10 lg:my-20"></Divider>
      <Link className="text-primary" href="/signup">
        Do not have an account? Sign Up here
      </Link> */}
    </div>
  );
};

export default SignInForm;

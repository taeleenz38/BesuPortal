import { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

export const FormInputWrapper = (props: Props) => {
  return (
    <div className="flex flex-col w-full ">
      <label className="label">
        <span className="labels">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
};

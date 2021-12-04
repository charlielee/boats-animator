import { ReactNode } from "react";

interface InputLabelProps {
  inputId: string;
  children: ReactNode;
}

const InputLabel = ({ inputId, children }: InputLabelProps): JSX.Element => {
  return <label htmlFor={inputId}>{children}</label>;
};

export default InputLabel;

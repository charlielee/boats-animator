import { ReactNode } from "react";

interface InputLabelProps {
  children: ReactNode;
}

const InputLabel = ({ children }: InputLabelProps): JSX.Element => {
  return <label>{children}</label>;
};

export default InputLabel;

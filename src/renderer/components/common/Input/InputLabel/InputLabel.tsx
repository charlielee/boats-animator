import { ReactNode } from "react";
import "./InputLabel.css";

interface InputLabelProps {
  inputId: string;
  children: ReactNode;
}

const InputLabel = ({ inputId, children }: InputLabelProps): JSX.Element => {
  return (
    <label className="input-label" htmlFor={inputId}>
      {children}
    </label>
  );
};

export default InputLabel;

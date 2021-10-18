import { ReactNode } from "react";
import "./ButtonGroup.css";

interface ButtonGroupProps {
  children: ReactNode;
}

const ButtonGroup = ({ children }: ButtonGroupProps): JSX.Element => {
  return <div className="button-group">{children}</div>;
};

export default ButtonGroup;

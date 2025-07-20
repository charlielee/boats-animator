import classNames from "classnames";
import { ReactNode } from "react";
import "./InputGroup.css";

interface InputGroupProps {
  children: ReactNode;
  row?: boolean;
  noGap?: boolean;
  noMargin?: boolean;
}

const InputGroup = ({ children, row, noGap = false, noMargin = false }: InputGroupProps) => {
  return (
    <div
      className={classNames("input-group", {
        "input-group--row": row,
        "input-group--no-gap": noGap,
        "input-group--no-margin": noMargin,
      })}
    >
      {children}
    </div>
  );
};

export default InputGroup;

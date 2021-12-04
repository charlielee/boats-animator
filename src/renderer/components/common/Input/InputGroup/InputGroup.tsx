import classNames from "classnames";
import { ReactNode } from "react";
import "./InputGroup.css";

interface InputGroupProps {
  children: ReactNode;
  row?: boolean;
}

const InputGroup = ({ children, row }: InputGroupProps): JSX.Element => {
  return (
    <div className={classNames("input-group", { "input-group--row": row })}>
      {children}
    </div>
  );
};

export default InputGroup;

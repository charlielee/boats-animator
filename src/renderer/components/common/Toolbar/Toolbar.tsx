import classNames from "classnames";
import { ReactNode } from "react";
import "./Toolbar.css";

interface ToolbarProps {
  children: ReactNode;

  borderBottom?: boolean;
}

const Toolbar = ({ children, borderBottom }: ToolbarProps): JSX.Element => {
  return (
    <div
      className={classNames("toolbar", {
        "toolbar--border-bottom": borderBottom,
      })}
    >
      {children}
    </div>
  );
};

export default Toolbar;

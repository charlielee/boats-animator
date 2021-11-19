import classNames from "classnames";
import { ReactNode } from "react";
import "./Toolbar.css";

interface ToolbarProps {
  children: ReactNode;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const Toolbar = ({
  children,
  borderTop,
  borderBottom,
}: ToolbarProps): JSX.Element => {
  return (
    <div
      className={classNames("toolbar", {
        "toolbar--border-top": borderTop,
        "toolbar--border-bottom": borderBottom,
      })}
    >
      {children}
    </div>
  );
};

export default Toolbar;

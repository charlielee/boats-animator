import classNames from "classnames";
import { ReactNode } from "react";
import "./Toolbar.css";

interface ToolbarProps {
  children?: ReactNode;
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
}

const Toolbar = ({ children, borderTop, borderBottom, className }: ToolbarProps) => {
  return (
    <div
      className={classNames("toolbar", className, {
        "toolbar--border-top": borderTop,
        "toolbar--border-bottom": borderBottom,
      })}
    >
      {children}
    </div>
  );
};

export default Toolbar;

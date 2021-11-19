import classNames from "classnames";
import { ReactNode } from "react";
import "./ToolbarItem.css";

export enum ToolbarItemAlign {
  LEFT,
  CENTER,
  RIGHT,
}

interface ToolbarItemProps {
  align: ToolbarItemAlign;
  children: ReactNode;
  stretch?: boolean;
}

const ToolbarItem = ({
  align,
  children,
  stretch,
}: ToolbarItemProps): JSX.Element => {
  return (
    <div
      className={classNames("toolbar-item", {
        "toolbar-item--stretch": stretch,
        "toolbar-item--center": align === ToolbarItemAlign.CENTER,
        "toolbar-item--right": align === ToolbarItemAlign.RIGHT,
      })}
    >
      {children}
    </div>
  );
};

export default ToolbarItem;

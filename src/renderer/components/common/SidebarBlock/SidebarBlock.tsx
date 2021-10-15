import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactNode } from "react";
import "./SidebarBlock.css";

interface SidebarBlockProps {
  title: string;
  titleIcon: IconProp;
  flex?: boolean;
  children: ReactNode;
}

const SidebarBlock = ({
  title,
  titleIcon,
  flex,
  children,
}: SidebarBlockProps): JSX.Element => {
  return (
    <div
      className={classNames("sidebar-block", { "sidebar-block--flex": flex })}
    >
      <h2 className="sidebar-block__title">
        <FontAwesomeIcon
          className="sidebar-block__title-icon"
          icon={titleIcon}
        />
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SidebarBlock;

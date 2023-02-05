import classNames from "classnames";
import { ReactNode } from "react";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./SidebarBlock.css";

interface SidebarBlockProps {
  title: string;
  titleIcon: IconName;
  flex?: boolean;
  children: ReactNode;
}

const SidebarBlock = ({ title, titleIcon, flex, children }: SidebarBlockProps): JSX.Element => {
  return (
    <div className={classNames("sidebar-block", { "sidebar-block--flex": flex })}>
      <h2 className="sidebar-block__title">
        <Icon name={titleIcon} className="sidebar-block__title-icon" />
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SidebarBlock;

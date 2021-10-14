import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import "./SidebarBlock.css";

interface SidebarBlockProps {
  title: string;
  titleIcon: IconProp;
  children: ReactNode;
}

const SidebarBlock = ({
  title,
  titleIcon,
  children,
}: SidebarBlockProps): JSX.Element => {
  return (
    <div className="sidebar-block">
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

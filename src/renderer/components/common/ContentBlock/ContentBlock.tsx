import classNames from "classnames";
import { ReactNode } from "react";
import Icon from "../Icon/Icon";
import IconName from "../Icon/IconName";
import "./ContentBlock.css";

interface ContentBlockProps {
  className?: string;
  title?: string;
  titleIcon?: IconName;
  flex?: boolean;
  children: ReactNode;
}

const ContentBlock = ({
  className,
  title,
  titleIcon,
  flex,
  children,
}: ContentBlockProps): JSX.Element => {
  return (
    <div
      className={classNames("content-block", className, {
        "content-block--flex": flex,
      })}
    >
      {title !== undefined && (
        <h2>
          {titleIcon !== undefined && (
            <Icon name={titleIcon} className="content-block__title-icon" />
          )}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default ContentBlock;

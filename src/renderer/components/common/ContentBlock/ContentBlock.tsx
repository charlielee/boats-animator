import classNames from "classnames";
import { ReactNode } from "react";
import "./ContentBlock.css";

interface ContentBlockProps {
  title?: string;
  flex?: boolean;
  children: ReactNode;
}

const ContentBlock = ({
  title,
  flex,
  children,
}: ContentBlockProps): JSX.Element => {
  return (
    <div
      className={classNames("content-block", { "content-block--flex": flex })}
    >
      {title !== undefined && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default ContentBlock;

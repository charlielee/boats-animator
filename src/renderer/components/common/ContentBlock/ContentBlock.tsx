import { ReactNode } from "react";
import "./ContentBlock.css";

interface ContentBlockProps {
  children: ReactNode;
}

const ContentBlock = ({ children }: ContentBlockProps): JSX.Element => {
  return <div className="content-block">{children}</div>;
};

export default ContentBlock;

import { ReactNode } from "react";
import "./Content.css";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <div className="content">{children}</div>;
};

export default Content;

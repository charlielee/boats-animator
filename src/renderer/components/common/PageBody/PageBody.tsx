import { ReactNode } from "react";
import "./PageBody.css";

interface PageBodyProps {
  children: ReactNode;
}

const PageBody = ({ children }: PageBodyProps) => {
  return <main className="page-body">{children}</main>;
};

export default PageBody;

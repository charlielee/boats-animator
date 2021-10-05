import { ReactFragment } from "react";
import "./Page.css";

interface PageProps {
  children: ReactFragment;
}

const Page = ({ children }: PageProps): JSX.Element => {
  return <div className="page">{children}</div>;
};

export default Page;

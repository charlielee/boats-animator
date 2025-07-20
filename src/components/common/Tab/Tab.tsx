import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <div>{children}</div>;
};

export default Tab;

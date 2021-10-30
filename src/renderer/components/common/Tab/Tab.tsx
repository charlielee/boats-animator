import { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
}

const Tab = ({ children }: TabProps): JSX.Element => {
  return <div>{children}</div>;
};

export default Tab;

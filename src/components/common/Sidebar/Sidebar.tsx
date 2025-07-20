import { ReactNode } from "react";
import "./Sidebar.css";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return <aside className="sidebar">{children}</aside>;
};

export default Sidebar;

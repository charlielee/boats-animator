import { ReactNode } from "react";
import "./PageFooter.css";

interface PageFooterProps {
  children: ReactNode;
}

const PageFooter = ({ children }: PageFooterProps): JSX.Element => {
  return (
    <footer className="page-footer">
      <ul className="page-footer__list">{children}</ul>
    </footer>
  );
};

export default PageFooter;

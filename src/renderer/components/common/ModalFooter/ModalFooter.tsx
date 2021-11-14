import { ReactNode } from "react";
import "./ModalFooter.css";

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps): JSX.Element => {
  return <div className="modal-footer">{children}</div>;
};

export default ModalFooter;

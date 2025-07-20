import { ReactNode } from "react";

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className="modal-footer">{children}</div>;
};

export default ModalFooter;

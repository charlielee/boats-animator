import { ReactNode } from "react";
import "./ModalBody.css";

interface ModalBodyProps {
  children: ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="modal-body">{children}</div>;
};

export default ModalBody;

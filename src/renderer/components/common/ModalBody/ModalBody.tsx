import { ReactNode } from "react";
import "./ModalBody.css";

interface ModalBodyProps {
  children: ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps): JSX.Element => {
  return <div className="modal-body">{children}</div>;
};

export default ModalBody;

import { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps): JSX.Element => {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  );
};

export default Modal;

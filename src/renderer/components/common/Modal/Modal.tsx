import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import IconName from "../Icon/IconName";
import IconButton from "../IconButton/IconButton";
import "./Modal.css";

interface ModalProps {
  children: ReactNode;
  onClose?: PageRoute;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="modal" role="dialog">
      <div className="modal__content">
        {onClose !== undefined && (
          <IconButton
            className="modal__close-button"
            title="Close"
            onClick={onClose}
            icon={IconName.CLOSE}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;

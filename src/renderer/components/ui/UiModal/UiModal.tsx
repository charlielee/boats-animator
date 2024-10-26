import { Modal } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";

interface UiModalProps {
  title: string;
  onClose?: PageRoute;
  children: ReactNode;
}

export const UiModal = ({ title, onClose, children }: UiModalProps) => {
  const navigate = useNavigate();
  const handleClose = () => (typeof onClose === "string" ? navigate(onClose) : undefined);

  return (
    <Modal title={title} onClose={handleClose} opened centered size="lg" closeButtonProps={{}}>
      {children}
    </Modal>
  );
};

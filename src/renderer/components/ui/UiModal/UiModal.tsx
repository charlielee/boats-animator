import { Modal } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";
import { useDelayedClose } from "../hooks/useDelayedClose";

interface UiModalProps {
  title: string;
  onClose?: PageRoute;
  children: ReactNode;
}

export const UiModal = ({ title, onClose, children }: UiModalProps) => {
  const { opened, duration, handleClose } = useDelayedClose({ onClose });

  return (
    <Modal
      title={title}
      onClose={handleClose}
      opened={opened}
      centered
      size="lg"
      transitionProps={{ duration }}
    >
      {children}
    </Modal>
  );
};

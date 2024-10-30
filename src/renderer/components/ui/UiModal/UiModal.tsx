import { Modal } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
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
      opened={opened}
      onClose={handleClose}
      transitionProps={{ duration }}
      centered
      size="lg"
    >
      {children}
    </Modal>
  );
};

import { Modal, Title } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { useDelayedClose } from "../hooks/useDelayedClose";

interface UiModalProps {
  title: string;
  onClose?: PageRoute;
  children: ReactNode;
}

export const UiModal = ({ title, onClose, children }: UiModalProps) => {
  const preventCloseProps =
    onClose === undefined
      ? { closeOnClickOutside: false, closeOnEscape: false, withCloseButton: false }
      : {};
  const { opened, duration, handleClose } = useDelayedClose({ onClose });

  return (
    <Modal
      title={
        <Title order={2} size="h3">
          {title}
        </Title>
      }
      opened={opened}
      onClose={handleClose}
      transitionProps={{ duration }}
      centered
      size="lg"
      {...preventCloseProps}
    >
      {children}
    </Modal>
  );
};

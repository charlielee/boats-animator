import { Modal, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { useDelayedClose } from "../hooks/useDelayedClose";

interface UiModalProps {
  title: string;
  onClose?: PageRoute;
  children: ReactNode;
}

export const UiModal = ({ title, onClose, children }: UiModalProps) => {
  const theme = useMantineTheme();
  const preventCloseProps =
    onClose === undefined
      ? { closeOnClickOutside: false, closeOnEscape: false, withCloseButton: false }
      : {};
  const { opened, duration, handleClose } = useDelayedClose({ onClose });

  return (
    <Modal
      title={title}
      styles={{ title: { ...theme.headings, ...theme.headings?.sizes.h3 } }}
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

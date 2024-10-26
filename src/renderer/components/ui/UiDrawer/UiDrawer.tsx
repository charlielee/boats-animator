import { Drawer } from "@mantine/core";
import { ReactNode } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import { useDelayedClose } from "../hooks/useDelayedClose";

interface UiDrawerProps {
  title: string;
  onClose?: PageRoute;
  children: ReactNode;
}

export const UiDrawer = ({ title, onClose, children }: UiDrawerProps) => {
  const { opened, duration, handleClose } = useDelayedClose({ onClose });

  return (
    <Drawer title={title} opened={opened} onClose={handleClose} transitionProps={{ duration }}>
      {children}
    </Drawer>
  );
};

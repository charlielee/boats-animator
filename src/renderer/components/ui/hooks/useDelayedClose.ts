import { useDisclosure } from "@mantine/hooks";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface UseDelayedCloseProps {
  onClose?: (() => void) | PageRoute;
}

interface UseDelayedCloseResponse {
  opened: boolean;
  duration: number;
  handleClose: () => void;
}

export const useDelayedClose = ({ onClose }: UseDelayedCloseProps): UseDelayedCloseResponse => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const duration = 250;

  const handleClose = () => {
    close();
    setTimeout(() => (typeof onClose === "string" ? navigate(onClose) : onClose?.()), duration);
  };

  useEffect(() => {
    open();
  }, [open]);

  return { opened, duration, handleClose };
};

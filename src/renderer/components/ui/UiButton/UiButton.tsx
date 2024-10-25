import { Button } from "@mantine/core";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface UiButtonProps {
  icon?: IconName;
  onClick?: (() => void) | PageRoute;
  disabled?: boolean;
  children?: ReactNode;
}

export const UiButton = ({ icon, onClick, disabled = false, children }: UiButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick?.());

  return (
    <Button
      leftSection={icon !== undefined && <Icon name={icon} />}
      variant="filled"
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

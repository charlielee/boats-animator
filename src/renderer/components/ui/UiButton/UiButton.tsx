import { Button } from "@mantine/core";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiButtonProps {
  icon?: IconName;
  onClick?: (() => void) | PageRoute;
  disabled?: boolean;
  semanticColor?: SemanticColor;
  children?: ReactNode;
}

export const UiButton = ({
  icon,
  onClick,
  disabled = false,
  semanticColor = SemanticColor.SECONDARY,
  children,
}: UiButtonProps) => {
  const navigate = useNavigate();
  const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick?.());

  return (
    <Button
      leftSection={icon !== undefined && <Icon name={icon} />}
      variant="filled"
      disabled={disabled}
      onClick={handleClick}
      color={semanticColor}
    >
      {children}
    </Button>
  );
};

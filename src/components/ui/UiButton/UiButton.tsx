import { Button } from "@mantine/core";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { useNavigate } from "react-router-dom";
import { forwardRef, ReactNode } from "react";
import { SemanticColor } from "../Theme/SemanticColor";
import { PageRoute } from "../../../services/PageRoute";

interface UiButtonProps {
  icon?: IconName;
  onClick?: (() => void) | PageRoute;
  disabled?: boolean;
  semanticColor?: SemanticColor;
  inToolbar?: boolean;
  inList?: boolean;
  children?: ReactNode;
}

export const UiButton = forwardRef<HTMLButtonElement, UiButtonProps>(
  (
    {
      icon,
      onClick,
      disabled = false,
      semanticColor = SemanticColor.SECONDARY,
      inToolbar = false,
      inList = false,
      children,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick?.());

    return (
      <Button
        leftSection={icon !== undefined && <Icon name={icon} />}
        variant={inToolbar ? "outline" : "filled"}
        disabled={disabled}
        onClick={handleClick}
        color={semanticColor}
        ref={ref}
        size={inList ? "xs" : "sm"}
      >
        {children}
      </Button>
    );
  }
);

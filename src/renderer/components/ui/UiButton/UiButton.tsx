import { Button } from "@mantine/core";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { PageRoute } from "../../../../common/PageRoute";
import { useNavigate } from "react-router-dom";
import { forwardRef, ReactNode } from "react";
import { SemanticColor } from "../Theme/SemanticColor";

interface UiButtonProps {
  icon?: IconName;
  onClick?: (() => void) | PageRoute;
  disabled?: boolean;
  semanticColor?: SemanticColor;
  inToolbar?: boolean;
  inTable?: boolean;
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
      inTable = false,
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
        size={inTable ? "xs" : "sm"}
      >
        {children}
      </Button>
    );
  }
);

import { ActionIcon, ActionIconProps, Box, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Icon from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../Theme/SemanticColor";
import "./UiActionIcon.css";

interface UiActionIconProps {
  icon: IconName;
  onClick?: (() => void) | PageRoute;
  open?: boolean;
  active?: boolean;
  children: string;
  captureButton?: boolean;
}

export const UiActionIcon = ({
  icon = IconName.ERROR,
  onClick,
  open = false,
  active = false,
  children,
  captureButton = false,
}: UiActionIconProps) => {
  const navigate = useNavigate();
  const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick?.());

  const openProps: ActionIconProps = open ? { variant: "filled" } : {};

  return (
    <Tooltip label={active ? `${children} (active)` : children}>
      <ActionIcon
        variant="subtle"
        color={SemanticColor.SECONDARY}
        onClick={handleClick}
        aria-label={children}
        size={captureButton ? "3rem" : "lg"}
        {...openProps}
      >
        <Icon name={icon} size={captureButton ? "3rem" : "1.5rem"} />
        {active && <Box className="ui-action-icon__active-indicator"></Box>}
      </ActionIcon>
    </Tooltip>
  );
};

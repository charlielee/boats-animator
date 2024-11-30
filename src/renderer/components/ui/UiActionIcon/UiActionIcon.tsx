import { ActionIcon, ActionIconProps, Box, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import Icon, { IconProps } from "../../common/Icon/Icon";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../Theme/SemanticColor";
import "./UiActionIcon.css";
import { forwardRef } from "react";

export const enum UiActionIconRole {
  CAPTURE = "CAPTURE",
  TOOLBAR_TAB = "TOOLBAR_TAB",
  DEFAULT = "DEFAULT",
}

interface UiActionIconProps {
  icon: IconName;
  onClick?: (() => void) | PageRoute;
  open?: boolean;
  active?: boolean;
  children: string;
  role?: UiActionIconRole;
}

export const UiActionIcon = forwardRef<HTMLButtonElement, UiActionIconProps>(
  (
    {
      icon = IconName.ERROR,
      onClick,
      open = false,
      active = false,
      children,
      role = UiActionIconRole.DEFAULT,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const handleClick = () => (typeof onClick === "string" ? navigate(onClick) : onClick?.());

    const openProps: ActionIconProps = open ? { variant: "filled" } : {};

    const roleProps: [ActionIconProps, Partial<IconProps>] = (() => {
      switch (role) {
        case UiActionIconRole.CAPTURE:
          return [{ size: "3rem" }, { size: "3rem" }];
        case UiActionIconRole.TOOLBAR_TAB:
          return [
            { size: "3.75rem", style: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } },
            { size: "1.5rem" },
          ];
        case UiActionIconRole.DEFAULT:
          return [{ size: "lg" }, { size: "1.5rem" }];
      }
    })();

    return (
      <Tooltip label={active ? `${children} (active)` : children}>
        <ActionIcon
          variant="subtle"
          color={SemanticColor.SECONDARY}
          onClick={handleClick}
          aria-label={children}
          {...roleProps[0]}
          {...openProps}
          ref={ref}
        >
          <Icon name={icon} {...roleProps[1]} />
          {active && <Box className="ui-action-icon__active-indicator"></Box>}
        </ActionIcon>
      </Tooltip>
    );
  }
);

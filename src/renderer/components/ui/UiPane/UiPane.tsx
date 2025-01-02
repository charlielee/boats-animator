import { Card, Title } from "@mantine/core";
import classNames from "classnames";
import { ReactNode } from "react";
import IconName from "../../common/Icon/IconName";
import { UiActionIcon, UiActionIconRole } from "../UiActionIcon/UiActionIcon";
import { UiPaneSection } from "../UiPaneSection/UiPaneSection";
import { UiSwitch } from "../UiSwitch/UiSwitch";
import "./UiPane.css";

interface UiPaneProps {
  title: string;
  showReset: boolean;
  onReset: () => void;
  showTitleToggle?: boolean;
  titleToggle?: boolean;
  onTitleToggle?: (newValue: boolean) => void;
  className?: string;
  children: ReactNode;
}

export const UiPane = ({
  title,
  showReset,
  onReset,
  showTitleToggle = false,
  titleToggle = true,
  onTitleToggle,
  className,
  children,
}: UiPaneProps) => (
  <Card className={classNames("ui-pane", className)} radius={0}>
    <UiPaneSection>
      <header className="ui-pane__header">
        <Title order={4}>{title}</Title>
        {showReset && (
          <UiActionIcon
            icon={IconName.PLAY_LOOP}
            onClick={onReset}
            role={UiActionIconRole.RESET_PANE}
          >
            {`Reset ${title}`}
          </UiActionIcon>
        )}
        {showTitleToggle && (
          <UiSwitch checked={titleToggle} onChange={(newValue) => onTitleToggle?.(newValue)} />
        )}
      </header>
    </UiPaneSection>

    {titleToggle && children}
  </Card>
);

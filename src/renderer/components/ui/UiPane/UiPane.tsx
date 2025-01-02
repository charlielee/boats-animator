import { Card, Group, Title } from "@mantine/core";
import { ReactNode } from "react";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../Theme/SemanticColor";
import { UiButton } from "../UiButton/UiButton";
import { UiPaneSection } from "../UiPaneSection/UiPaneSection";
import { UiSwitch } from "../UiSwitch/UiSwitch";
import "./UiPane.css";
import classNames from "classnames";

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
  <Card className={classNames("overlay-tab-pane-base__box", className)} radius={0}>
    <UiPaneSection>
      <Group justify="space-between" pt="xs">
        <Title order={4}>{title}</Title>
        {showTitleToggle && (
          <UiSwitch checked={titleToggle} onChange={(newValue) => onTitleToggle?.(newValue)} />
        )}
      </Group>
    </UiPaneSection>

    {titleToggle && (
      <>
        {children}

        {showReset && (
          <UiPaneSection>
            <UiButton
              inList
              icon={IconName.PLAY_LOOP}
              semanticColor={SemanticColor.PRIMARY}
              onClick={onReset}
            >
              Reset
            </UiButton>
          </UiPaneSection>
        )}
      </>
    )}
  </Card>
);

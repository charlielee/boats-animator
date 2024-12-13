import { Box, Card, Group, Table, Title } from "@mantine/core";
import { ReactNode } from "react";
import IconName from "../../../common/Icon/IconName";
import { SemanticColor } from "../../../ui/Theme/SemanticColor";
import { UiButton } from "../../../ui/UiButton/UiButton";
import "./OverlayTabPaneBase.css";
import { UiSwitch } from "../../../ui/UiSwitch/UiSwitch";
import { UiPaneSection } from "../../../ui/UiPaneSection/UiPaneSection";

interface OverlayTabPaneBoxProps {
  title: string;
  showReset: boolean;
  onReset: () => void;
  showTitleToggle?: boolean;
  titleToggle?: boolean;
  onTitleToggle?: (newValue: boolean) => void;
  children: ReactNode;
}

export const OverlayTabPaneBase = ({
  title,
  showReset,
  onReset,
  showTitleToggle = false,
  titleToggle = true,
  onTitleToggle,
  children,
}: OverlayTabPaneBoxProps) => (
  <Card className="overlay-tab-pane-base__box" radius={0}>
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

import { Card } from "@mantine/core";
import { ReactNode } from "react";

interface UiPaneSectionProps {
  children: ReactNode;
}

export const UiPaneSection = ({ children }: UiPaneSectionProps) => (
  <Card.Section pb="xs" px="xs">
    {children}
  </Card.Section>
);

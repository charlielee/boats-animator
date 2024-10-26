import { Divider, Group, Paper } from "@mantine/core";
import { ReactNode } from "react";

interface UiModalFooterProps {
  children: ReactNode;
}

export const UiModalFooter = ({ children }: UiModalFooterProps) => (
  <Paper>
    <Divider my="lg" />
    <Group>{children}</Group>
  </Paper>
);

import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { SemanticColor } from "./SemanticColor";
import "./Theme.css";

interface ThemeProps {
  children: ReactNode;
}

const other = {
  border: "calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-default-border)",
};

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  autoContrast: true,
  colors: {
    [SemanticColor.PRIMARY]: DEFAULT_THEME.colors.blue,
    [SemanticColor.SECONDARY]: DEFAULT_THEME.colors.gray,
    [SemanticColor.SUCCESS]: DEFAULT_THEME.colors.green,
    [SemanticColor.DANGER]: DEFAULT_THEME.colors.red,
  },
  primaryColor: SemanticColor.PRIMARY,
  other,
  components: { body: { styles: { backgroundColor: "green" } } },
  scale: 0.925,
});

export type ThemeWithOther = typeof theme & { other: Partial<typeof other> };

export const Theme = ({ children }: ThemeProps) => {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};

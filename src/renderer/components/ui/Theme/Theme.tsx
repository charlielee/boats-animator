import { createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./Theme.css";
import { SemanticColor } from "./SemanticColor";
import { Notifications } from "@mantine/notifications";

interface ThemeProps {
  children: ReactNode;
}

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  autoContrast: true,
  colors: {
    [SemanticColor.PRIMARY]: DEFAULT_THEME.colors.blue,
    [SemanticColor.SECONDARY]: DEFAULT_THEME.colors.dark,
    [SemanticColor.SUCCESS]: DEFAULT_THEME.colors.green,
    [SemanticColor.DANGER]: DEFAULT_THEME.colors.red,
  },
  primaryColor: SemanticColor.PRIMARY,
});

export const Theme = ({ children }: ThemeProps) => {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};

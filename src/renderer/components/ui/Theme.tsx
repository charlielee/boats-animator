import { createTheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";

import "./Theme.css";
import "@mantine/core/styles.css";

interface ThemeProps {
  children: ReactNode;
}

export const Theme = ({ children }: ThemeProps) => {
  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    autoContrast: true,
  });

  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
};

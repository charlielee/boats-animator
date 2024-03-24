import { render as rtlRender } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

interface TestAppProps {
  children: ReactNode;
}

const TestApp = ({ children }: TestAppProps) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

export const renderWithProviders = (ui: any, options?: any) =>
  rtlRender(ui, { wrapper: TestApp, ...options });

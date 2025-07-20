import { render as rtlRender } from "@testing-library/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";

interface TestAppProps {
  children: ReactNode;
}

const TestApp = ({ children }: TestAppProps) => {
  return (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};

export const renderWithProviders = (ui: any, options?: any) =>
  rtlRender(ui, { wrapper: TestApp, ...options });

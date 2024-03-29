import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../testing/TestHelper";
import ProjectSettingsModal from "./ProjectSettingsModal";

const getModal = () => screen.getByRole("dialog");
const modalTitle = () => screen.getByRole("heading");
const chooseFolderButton = () =>
  screen.getByTestId(ProjectSettingsModal.testIds.chooseFolderButton);
const submitButton = () => screen.getByTestId(ProjectSettingsModal.testIds.submitButton);

describe("new project", () => {
  it("should display expected title", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(modalTitle()).toHaveTextContent("New Project");
  });

  it("should display choose folder button", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(chooseFolderButton()).toBeInTheDocument();
  });

  it("should display expected submit button title", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(submitButton()).toHaveTextContent("Create Project");
  });
});

// describe("edit project", () => {
// });

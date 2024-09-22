import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../testing/TestHelper";
import ProjectSettingsModal from "./ProjectSettingsModal";
import { mockGetWorkingDirectory, mockOpenDirectoryDialog } from "../../../testing/mockFileAccess";

const getModal = () => screen.getByRole("dialog");
const modalTitle = () => screen.getByRole("heading");
const nameInput = () => screen.getByTestId(ProjectSettingsModal.testIds.nameInput);
const directoryPathInput = () =>
  screen.queryByTestId(ProjectSettingsModal.testIds.directoryPathInput);
const chooseFolderButton = () =>
  screen.getByTestId(ProjectSettingsModal.testIds.chooseFolderButton);
const submitButton = () => screen.getByTestId(ProjectSettingsModal.testIds.submitButton);

describe("new project", () => {
  it("should display expected title", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(modalTitle()).toHaveTextContent("New Project");
  });

  it("should not show directory path when no working directory", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(directoryPathInput()).not.toBeInTheDocument();
  });

  it("should display choose folder button", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(chooseFolderButton()).toBeInTheDocument();
  });

  it("should display expected submit button title", () => {
    renderWithProviders(<ProjectSettingsModal />);

    expect(submitButton()).toHaveTextContent("Create Project");
  });

  it("should be able to fill in and submit form ", async () => {
    const workingDirectoryName = "dirname";
    const mockedOpenDirectoryDialog = mockOpenDirectoryDialog(workingDirectoryName);
    mockGetWorkingDirectory();

    renderWithProviders(<ProjectSettingsModal />);

    await userEvent.type(nameInput(), "My Movie");

    expect(directoryPathInput()).not.toBeInTheDocument();
    expect(submitButton()).toBeDisabled();

    await userEvent.click(chooseFolderButton());

    expect(mockedOpenDirectoryDialog).toHaveBeenCalledWith("changeWorkingDirectory");
    await waitFor(() =>
      expect(directoryPathInput()).toHaveValue(`./${workingDirectoryName}/My-Movie.bafiles`)
    );
    expect(submitButton()).not.toBeDisabled();

    await userEvent.click(submitButton());

    // test dispatch new project
    // test navigate to animator
  });

  // handle untitled project
  // handle submit
  // handle change working directory cancelled
});

// describe("edit project", () => {
// });

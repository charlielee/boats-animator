import { Stack } from "@mantine/core";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { Project } from "../../../../common/project/Project";
import { DEFAULT_PROJECT_NAME, PROJECT_DIRECTORY_EXTENSION } from "../../../../common/utils";
import { PersistedDirectoriesContext } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContext";
import { ProjectDirectoryIsInsideAnotherProjectError } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesErrors";
import useWorkingDirectory from "../../../hooks/useWorkingDirectory";
import {
  addProject,
  addTake,
  setProjectDirectoryId,
  updateProject,
} from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import { CreateDirectoryAlreadyExistsError } from "../../../services/fileManager/FileErrors";
import {
  formatProjectName,
  makeProject,
  makeProjectDirectoryName,
  makeTake,
} from "../../../services/project/projectBuilder";
import { JSXElementWithTestIds } from "../../../types";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { UiTextInput } from "../../ui/UiTextInput/UiTextInput";

const ProjectSettingsModal = (): JSXElementWithTestIds => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const { changeWorkingDirectory, addProjectDirectory } = useContext(PersistedDirectoriesContext);

  const [projectNameError, setProjectNameError] = useState<string | undefined>(undefined);
  const [directoryError, setDirectoryError] = useState<string | undefined>(undefined);

  const currentProject = useSelector((state: RootState) => state.project.project);
  const [project, setProject] = useState(currentProject ?? makeProject({ name: "" }));
  const workingDirectory = useWorkingDirectory();
  const projectDisplayedName =
    currentProject && project.name === DEFAULT_PROJECT_NAME ? "" : project.name;

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

  const onChangeWorkingDirectory = async () => {
    setDirectoryError(undefined);
    setProjectNameError(undefined);
    await changeWorkingDirectory?.();
  };

  const onSubmitProjectSettings = async () => {
    const formattedProject = { ...project, name: formatProjectName(project.name) };

    if (currentProject) {
      dispatch(updateProject(formattedProject));
      navigate(PageRoute.ANIMATOR);
    } else {
      await newProject(formattedProject);
    }
  };

  const newProject = async (formattedProject: Project) => {
    setDirectoryError(undefined);
    setProjectNameError(undefined);

    try {
      const projectDirectoryEntry = await addProjectDirectory!(formattedProject);
      dispatch(setProjectDirectoryId(projectDirectoryEntry.id));
      dispatch(addProject(formattedProject));
      const take = makeTake({
        shotNumber: 1,
        takeNumber: 1,
        frameRate: 15,
      });
      dispatch(addTake(take));
      navigate(PageRoute.ANIMATOR);
    } catch (e) {
      if (e instanceof CreateDirectoryAlreadyExistsError) {
        return setProjectNameError(
          "Unable to create project as a project already exists with this name. Please rename your project and try again."
        );
      }
      if (e instanceof ProjectDirectoryIsInsideAnotherProjectError) {
        return setDirectoryError(
          `Unable to create project as the selected folder is another .${PROJECT_DIRECTORY_EXTENSION} folder. Please choose a different folder and try again.`
        );
      }

      throw e;
    }
  };

  return (
    <UiModal
      title={currentProject ? "Project Settings" : "New Project"}
      onClose={currentProject ? PageRoute.ANIMATOR : PageRoute.STARTUP}
    >
      <Stack>
        <UiTextInput
          label="Project Name"
          value={projectDisplayedName}
          placeholder="Untitled Movie"
          error={projectNameError}
          onChange={onRenameProject}
        />

        <UiTextInput
          label="Project files will be saved to..."
          value={
            workingDirectory
              ? `./${workingDirectory.friendlyName}/${makeProjectDirectoryName(project)}`
              : undefined
          }
          placeholder="No folder selected"
          readOnly
          error={directoryError}
          rightSection={
            !currentProject && (
              <UiButton
                onClick={onChangeWorkingDirectory}
                semanticColor={workingDirectory ? SemanticColor.SECONDARY : SemanticColor.PRIMARY}
              >
                Choose Folder
              </UiButton>
            )
          }
        />
      </Stack>

      <UiModalFooter>
        <UiButton
          icon={currentProject ? IconName.SAVE : IconName.ADD}
          onClick={onSubmitProjectSettings}
          disabled={!workingDirectory}
          semanticColor={SemanticColor.PRIMARY}
        >
          {currentProject ? "Update Project" : "Create Project"}
        </UiButton>
      </UiModalFooter>
    </UiModal>
  );
};

ProjectSettingsModal.testIds = {
  nameInput: "ProjectSettingsModal.nameInput",
  directoryPathInput: "ProjectSettingsModal.directoryPathInput",
  chooseFolderButton: "ProjectSettingsModal.chooseFolderButton",
  submitButton: "ProjectSettingsModal.submitButton",
};

export default ProjectSettingsModal;

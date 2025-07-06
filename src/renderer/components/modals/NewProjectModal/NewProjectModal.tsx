import { Stack } from "@mantine/core";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import {
  DEFAULT_PROJECT_FRAME_RATE,
  DEFAULT_PROJECT_NAME,
  PROJECT_DIRECTORY_EXTENSION,
} from "../../../../common/utils";
import { PersistedDirectoriesContext } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContext";
import {
  DirectoryAccessPermissionError,
  ProjectDirectoryIsInsideAnotherProjectError,
} from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesErrors";
import useWorkingDirectory from "../../../hooks/useWorkingDirectory";
import { addProject, addTake } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import { CreateDirectoryAlreadyExistsError } from "../../../services/fileManager/FileErrors";
import {
  makeProject,
  makeTake,
  makeUniqueProjectDirectoryNameIfRequired,
} from "../../../services/project/projectBuilder";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { UiTextInput } from "../../ui/UiTextInput/UiTextInput";
import { UiNumberInput } from "../../ui/UiNumberInput/UiNumberInput";
import { UiAlert } from "../../ui/UiAlert/UiAlert";
import * as rLogger from "../../../services/rLogger/rLogger";
import { Project } from "../../../../common/project/Project";

export const NewProjectModal = () => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const workingDirectory = useWorkingDirectory();
  const { checkWorkingDirectoryPermission, changeWorkingDirectory, addProjectDirectory } =
    useContext(PersistedDirectoriesContext);

  const [project, setProject] = useState(
    makeProject({ name: "", projectFrameRate: DEFAULT_PROJECT_FRAME_RATE })
  );

  const [generalError, setGeneralError] = useState<string | undefined>(undefined);
  const [projectNameError, setProjectNameError] = useState<string | undefined>(undefined);
  const [directoryError, setDirectoryError] = useState<string | undefined>(undefined);

  const clearFormErrors = () => {
    setGeneralError(undefined);
    setDirectoryError(undefined);
    setProjectNameError(undefined);
  };

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

  const onChangeWorkingDirectory = async () => {
    clearFormErrors();
    await changeWorkingDirectory?.();
  };

  const onChangeFrameRate = (newFrameRate: number) =>
    setProject((prevState) => makeProject({ ...prevState, projectFrameRate: newFrameRate }));

  const onSubmitNewProject = async () => {
    clearFormErrors();
    const formattedProject: Project = {
      ...project,
      directoryName: makeUniqueProjectDirectoryNameIfRequired(project.directoryName),
    };

    try {
      await checkWorkingDirectoryPermission!();
    } catch (e) {
      if (e instanceof DirectoryAccessPermissionError) {
        return setGeneralError(
          "Unable to create project due to a permission error. Please choose a different folder and try again."
        );
      }
      return setGeneralError(
        "Unable to create project due to an unknown permission error. Please choose a different folder and try again."
      );
    }

    try {
      const projectDirectoryEntry = await addProjectDirectory!(formattedProject);
      dispatch(
        addProject({ project: formattedProject, projectDirectoryId: projectDirectoryEntry.id })
      );
      const take = makeTake({
        shotNumber: 1,
        takeNumber: 1,
        frameRate: formattedProject.projectFrameRate,
      });
      dispatch(addTake(take));
      navigate(PageRoute.ANIMATOR_CAPTURE_SOURCE);
    } catch (e) {
      if (e instanceof CreateDirectoryAlreadyExistsError) {
        rLogger.warn("newProjectModal.projectAlreadyExists", project.directoryName);
        return setProjectNameError(
          "Unable to create project as a project already exists with this name. Please rename your project and try again."
        );
      }
      if (e instanceof ProjectDirectoryIsInsideAnotherProjectError) {
        rLogger.warn("newProjectModal.insideAnotherProject", workingDirectory?.friendlyName);
        return setDirectoryError(
          `Unable to create project as the selected folder is another .${PROJECT_DIRECTORY_EXTENSION} folder. Please choose a different folder and try again.`
        );
      }

      setGeneralError(
        "Unable to create project due to an unexpected error. Please choose a different folder and try again."
      );
      rLogger.error("newProjectModal.unknownError", `${e}`);
    }
  };

  return (
    <UiModal title="New Project" onClose={PageRoute.STARTUP}>
      <Stack>
        <UiAlert title="Error creating project" semanticColor={SemanticColor.DANGER}>
          {generalError}
        </UiAlert>
        <UiTextInput
          label="Project Name"
          value={project.name}
          placeholder={DEFAULT_PROJECT_NAME}
          error={projectNameError}
          onChange={onRenameProject}
        />

        <UiTextInput
          label="Project files will be saved to..."
          value={
            workingDirectory
              ? `./${workingDirectory.friendlyName}/${project.directoryName}`
              : undefined
          }
          placeholder="No folder selected"
          readOnly
          error={directoryError}
          rightSection={
            <UiButton
              onClick={onChangeWorkingDirectory}
              semanticColor={workingDirectory ? SemanticColor.SECONDARY : SemanticColor.PRIMARY}
            >
              Choose Folder
            </UiButton>
          }
        />
        <UiNumberInput
          label="Project Frame Rate"
          value={project.projectFrameRate}
          placeholder={`${DEFAULT_PROJECT_FRAME_RATE.toString(10)} FPS`}
          min={1}
          max={60}
          suffix=" FPS"
          onChange={onChangeFrameRate}
        />
      </Stack>

      <UiModalFooter>
        <UiButton
          icon={IconName.ADD}
          onClick={onSubmitNewProject}
          disabled={!workingDirectory}
          semanticColor={SemanticColor.PRIMARY}
        >
          Create Project
        </UiButton>
      </UiModalFooter>
    </UiModal>
  );
};

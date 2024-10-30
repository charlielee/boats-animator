import { Stack } from "@mantine/core";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { PROJECT_DIRECTORY_EXTENSION } from "../../../../common/utils";
import { PersistedDirectoriesContext } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContext";
import { ProjectDirectoryIsInsideAnotherProjectError } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesErrors";
import useWorkingDirectory from "../../../hooks/useWorkingDirectory";
import { addProject, addTake } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import { CreateDirectoryAlreadyExistsError } from "../../../services/fileManager/FileErrors";
import {
  formatProjectName,
  makeProject,
  makeProjectDirectoryName,
  makeTake,
} from "../../../services/project/projectBuilder";
import IconName from "../../common/Icon/IconName";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import { UiModal } from "../../ui/UiModal/UiModal";
import { UiModalFooter } from "../../ui/UiModalFooter/UiModalFooter";
import { UiTextInput } from "../../ui/UiTextInput/UiTextInput";

export const NewProjectModal = () => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const workingDirectory = useWorkingDirectory();
  const { changeWorkingDirectory, addProjectDirectory } = useContext(PersistedDirectoriesContext);

  const [project, setProject] = useState(makeProject({ name: "" }));
  const [projectNameError, setProjectNameError] = useState<string | undefined>(undefined);
  const [directoryError, setDirectoryError] = useState<string | undefined>(undefined);

  const clearFormErrors = () => {
    setDirectoryError(undefined);
    setProjectNameError(undefined);
  };

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

  const onChangeWorkingDirectory = async () => {
    clearFormErrors();
    await changeWorkingDirectory?.();
  };

  const onSubmitNewProject = async () => {
    clearFormErrors();
    const formattedProject = { ...project, name: formatProjectName(project.name) };

    try {
      const projectDirectoryEntry = await addProjectDirectory!(formattedProject);
      dispatch(
        addProject({ project: formattedProject, projectDirectoryId: projectDirectoryEntry.id })
      );
      const take = makeTake({
        shotNumber: 1,
        takeNumber: 1,
        // TODO should be able to set frame rate from here
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

      // TODO shouldn't just throw here
      throw e;
    }
  };

  return (
    <UiModal title="New Project" onClose={PageRoute.STARTUP}>
      <Stack>
        <UiTextInput
          label="Project Name"
          value={project.name}
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
            <UiButton
              onClick={onChangeWorkingDirectory}
              semanticColor={workingDirectory ? SemanticColor.SECONDARY : SemanticColor.PRIMARY}
            >
              Choose Folder
            </UiButton>
          }
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

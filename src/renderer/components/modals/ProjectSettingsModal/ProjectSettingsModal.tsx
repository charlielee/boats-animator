import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { DEFAULT_PROJECT_NAME, PROJECT_DIRECTORY_EXTENSION } from "../../../../common/utils";
import useWorkingDirectory from "../../../hooks/useWorkingDirectory";
import {
  addProject,
  addTake,
  setProjectDirectoryId,
  updateProject,
} from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import {
  formatProjectName,
  makeProject,
  makeProjectDirectoryName,
  makeTake,
} from "../../../services/project/projectBuilder";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import PageBody from "../../common/PageBody/PageBody";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./ProjectSettingsModal.css";
import { JSXElementWithTestIds } from "../../../types";
import { PersistedDirectoriesContext } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContext";
import { Project } from "../../../../common/project/Project";
import { CreateDirectoryAlreadyExistsError } from "../../../services/fileManager/FileErrors";
import { ProjectDirectoryIsInsideAnotherProjectError } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesErrors";
import { UiButton } from "../../ui/UiButton/UiButton";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiTextInput } from "../../ui/UiTextInput/UiTextInput";
import { Stack } from "@mantine/core";

const ProjectSettingsModal = (): JSXElementWithTestIds => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const { changeWorkingDirectory, addProjectDirectory } = useContext(PersistedDirectoriesContext);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const currentProject = useSelector((state: RootState) => state.project.project);
  const [project, setProject] = useState(currentProject ?? makeProject({ name: "" }));
  const workingDirectory = useWorkingDirectory();
  const projectDisplayedName =
    currentProject && project.name === DEFAULT_PROJECT_NAME ? "" : project.name;

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

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
        return setErrorMessage(
          "Unable to create project as a project already exists with this name. Please rename your project and try again."
        );
      }
      if (e instanceof ProjectDirectoryIsInsideAnotherProjectError) {
        return setErrorMessage(
          `Unable to create project as the selected folder is another .${PROJECT_DIRECTORY_EXTENSION} folder. Please choose a different folder and try again.`
        );
      }

      throw e;
    }
  };

  return (
    <Modal onClose={currentProject ? PageRoute.ANIMATOR : PageRoute.STARTUP_MODAL}>
      <ModalBody>
        <PageBody>
          <Content>
            <ContentBlock title={currentProject ? "Project Settings" : "New Project"}>
              {errorMessage !== undefined && (
                <p className="project-settings-modal__error-message">{errorMessage}</p>
              )}

              <Stack>
                <UiTextInput
                  label="Project Name"
                  value={projectDisplayedName}
                  placeholder="Untitled Movie"
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
                  rightSection={
                    !currentProject && (
                      <UiButton
                        onClick={changeWorkingDirectory}
                        semanticColor={
                          workingDirectory ? SemanticColor.SECONDARY : SemanticColor.PRIMARY
                        }
                      >
                        Choose Folder
                      </UiButton>
                    )
                  }
                />
              </Stack>
            </ContentBlock>
          </Content>
        </PageBody>
      </ModalBody>

      <ModalFooter>
        <Toolbar borderTop>
          <ToolbarItem align={ToolbarItemAlign.LEFT}>
            <UiButton
              icon={currentProject ? IconName.SAVE : IconName.ADD}
              onClick={onSubmitProjectSettings}
              disabled={!workingDirectory}
              semanticColor={SemanticColor.PRIMARY}
            >
              {currentProject ? "Update Project" : "Create Project"}
            </UiButton>
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

ProjectSettingsModal.testIds = {
  nameInput: "ProjectSettingsModal.nameInput",
  directoryPathInput: "ProjectSettingsModal.directoryPathInput",
  chooseFolderButton: "ProjectSettingsModal.chooseFolderButton",
  submitButton: "ProjectSettingsModal.submitButton",
};

export default ProjectSettingsModal;

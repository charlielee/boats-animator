import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { DEFAULT_PROJECT_NAME } from "../../../../common/utils";
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
import Button from "../../common/Button/Button";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import InputGroup from "../../common/Input/InputGroup/InputGroup";
import InputLabel from "../../common/Input/InputLabel/InputLabel";
import InputText from "../../common/Input/InputText/InputText";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import PageBody from "../../common/PageBody/PageBody";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import "./ProjectSettingsModal.css";
import classNames from "classnames";
import { JSXElementWithTestIds } from "../../../types";
import { PersistedDirectoriesContext } from "../../../context/PersistedDirectoriesContext/PersistedDirectoriesContext";
import { Project } from "../../../../common/project/Project";
import { CreateDirectoryAlreadyExistsError } from "../../../services/fileManager/FileErrors";

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
      console.log("b4");
      const projectDirectoryEntry = await addProjectDirectory!(formattedProject);
      console.log("af");
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
        setErrorMessage(
          "Unable to create project as a project already exists with this name. Please rename your project and try again."
        );
      } else {
        throw e;
      }
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
              <InputGroup>
                <InputLabel inputId="projectSettingsName">Project Name</InputLabel>
                <InputText
                  id="projectSettingsName"
                  value={projectDisplayedName}
                  placeholder="Untitled Movie"
                  onChange={onRenameProject}
                  testId={ProjectSettingsModal.testIds.nameInput}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel inputId="projectSettingsDirectoryPath">
                  Project files will be saved to...
                </InputLabel>
                {workingDirectory !== undefined && (
                  <InputText
                    id="projectSettingsDirectoryPath"
                    value={`./${workingDirectory.friendlyName}/${makeProjectDirectoryName(
                      project
                    )}`}
                    placeholder="Untitled Movie"
                    readOnly
                    testId={ProjectSettingsModal.testIds.directoryPathInput}
                  />
                )}
                {!currentProject && (
                  <Button
                    title="Choose Folder"
                    onClick={() => changeWorkingDirectory?.()}
                    className={classNames("project-settings-modal__choose-folder-button", {
                      "project-settings-modal__choose-folder-button--no-working-directory":
                        !workingDirectory,
                    })}
                    testId={ProjectSettingsModal.testIds.chooseFolderButton}
                  />
                )}
              </InputGroup>
            </ContentBlock>
          </Content>
        </PageBody>
      </ModalBody>

      <ModalFooter>
        <Toolbar borderTop>
          <ToolbarItem align={ToolbarItemAlign.LEFT}>
            <Button
              title={currentProject ? "Update Project" : "Create Project"}
              icon={currentProject ? IconName.SAVE : IconName.ADD}
              onClick={onSubmitProjectSettings}
              disabled={!workingDirectory}
              testId={ProjectSettingsModal.testIds.submitButton}
            />
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

import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../../../common/PageRoute";
import { DEFAULT_PROJECT_NAME } from "../../../../common/utils";
import { updateProject } from "../../../redux/slices/projectSlice";
import { RootState } from "../../../redux/store";
import {
  formatProjectName,
  makeProject,
  makeProjectDirectoryPath,
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
import { newProject } from "../../../redux/thunks/projectThunk";

const ProjectSettingsModal = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const { currentProject, defaultWorkingDirectory } = useSelector((state: RootState) => ({
    currentProject: state.project.project,
    defaultWorkingDirectory: state.app.userPreferences.defaultWorkingDirectory,
  }));

  if (defaultWorkingDirectory === undefined) {
    throw "No working directory has been selected";
  }

  const [project, setProject] = useState(
    currentProject ?? makeProject({ name: "", workingDirectory: defaultWorkingDirectory })
  );

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

  const onSubmitProjectSettings = async () => {
    if (currentProject) {
      const name = formatProjectName(project.name);
      dispatch(updateProject({ ...project, name }));
    } else {
      await dispatch(newProject(project));
    }

    navigate(PageRoute.ANIMATOR);
  };

  return (
    <Modal onClose={currentProject ? PageRoute.ANIMATOR : PageRoute.STARTUP_MODAL}>
      <ModalBody>
        <PageBody>
          <Content>
            <ContentBlock title={currentProject ? "Project Settings" : "New Project"}>
              <InputGroup>
                <InputLabel inputId="projectSettingsName">Project Name</InputLabel>
                <InputText
                  id="projectSettingsName"
                  value={project.name === DEFAULT_PROJECT_NAME ? "" : project.name}
                  placeholder="Untitled Movie"
                  onChange={onRenameProject}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel inputId="projectSettingsDirectoryPath">
                  Project files will be saved to...
                </InputLabel>
                <InputText
                  id="projectSettingsDirectoryPath"
                  value={makeProjectDirectoryPath(project)}
                  placeholder="Untitled Movie"
                  disabled
                />
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
            />
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectSettingsModal;

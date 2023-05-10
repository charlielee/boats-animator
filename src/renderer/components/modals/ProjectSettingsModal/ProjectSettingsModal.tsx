import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageRoute } from "../../../../common/PageRoute";
import { RootState } from "../../../redux/store";
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
import {
  makeProjectDirectoryPath,
  makeProjectFileName,
  makeTake,
} from "../../../services/project/projectBuilder";
import { addProject, addTake, updateProject } from "../../../redux/slices/projectSlice";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROJECT_NAME = "Untitled Movie";

const ProjectSettingsModal = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const { currentProject, workingDirectory } = useSelector((state: RootState) => ({
    currentProject: state.project.project,
    workingDirectory: state.app.userPreferences.workingDirectory,
  }));

  const [name, setName] = useState(currentProject?.name ?? DEFAULT_PROJECT_NAME);
  const [fileName, setFileName] = useState(
    currentProject?.fileName ?? makeProjectFileName(DEFAULT_PROJECT_NAME)
  );

  const onRenameProject = (newName: string) => {
    setName(newName === "" ? DEFAULT_PROJECT_NAME : newName);
    setFileName(makeProjectFileName(newName === "" ? DEFAULT_PROJECT_NAME : newName));
  };

  // TODO handle this check elsewhere
  if (workingDirectory === undefined) {
    return <></>;
  }

  const setProject = () => {
    if (currentProject) {
      dispatch(updateProject({ name, fileName }));
    } else {
      dispatch(addProject({ name, fileName }));
      dispatch(
        addTake(
          makeTake({
            workingDirectory,
            shotNumber: 1,
            takeNumber: 1,
            frameRate: 15,
          })
        )
      );
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
                  value={name === DEFAULT_PROJECT_NAME ? "" : name}
                  placeholder="Untitled Movie"
                  onChange={onRenameProject}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel inputId="projectSettingsDirectory">
                  Project files will be saved to...
                </InputLabel>
                <InputText
                  id="projectSettingsDirectory"
                  value={makeProjectDirectoryPath(workingDirectory, fileName)}
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
              onClick={setProject}
            />
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectSettingsModal;

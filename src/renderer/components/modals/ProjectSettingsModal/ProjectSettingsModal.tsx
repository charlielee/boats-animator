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
  makeProjectDirectoryName,
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
import useWorkingDirectory from "../../../hooks/useWorkingDirectory";
import { putOrAddWorkingDirectory } from "../../../services/database/RecentDirectoryEntry";
import { newProject } from "../../../redux/thunks/projectThunk";
import NoWorkingDirectoryError from "../../../redux/thunks/NoWorkingDirectoryError";
import * as rLogger from "../../../services/rLogger/rLogger";

const ProjectSettingsModal = (): JSX.Element => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const currentProject = useSelector((state: RootState) => state.project.project);
  const [project, setProject] = useState(currentProject ?? makeProject({ name: "" }));
  const workingDirectory = useWorkingDirectory();

  const onRenameProject = (newName: string) =>
    setProject((prevState) => makeProject({ ...prevState, name: newName }));

  const changeWorkingDirectory = async () => {
    const workingDirectoryHandle = await window.showDirectoryPicker({
      id: "changeWorkingDirectory",
      mode: "readwrite",
      startIn: "documents",
    });
    await putOrAddWorkingDirectory(workingDirectoryHandle);
  };

  const onSubmitProjectSettings = async () => {
    const formattedProject = { ...project, name: formatProjectName(project.name) };

    if (currentProject) {
      dispatch(updateProject(formattedProject));
    } else {
      try {
        await dispatch(newProject(formattedProject));
      } catch (e) {
        if (e instanceof NoWorkingDirectoryError) {
          // TODO show notification
          // eslint-disable-next-line no-console
          console.info(e.message);
        } else if (e instanceof Error) {
          rLogger.error("projectSettingsModal.newProject.unhandledError", {
            name: e.name,
            message: e.message,
          });
        }
      }
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
                {workingDirectory && (
                  <InputText
                    id="projectSettingsDirectoryPath"
                    value={`./${workingDirectory.friendlyName}/${makeProjectDirectoryName(
                      project
                    )}`}
                    placeholder="Untitled Movie"
                    disabled
                  />
                )}
                <Button title="Choose Folder" onClick={changeWorkingDirectory} />
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

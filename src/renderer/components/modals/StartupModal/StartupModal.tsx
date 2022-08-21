import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { PageRoute } from "../../../../common/PageRoute";
import { changeWorkingDirectory } from "../../../redux/app/thunks";
import { addTake } from "../../../redux/project/actions";
import { RootState } from "../../../redux/store";
import { makeTake } from "../../../services/project/projectBuilder";
import Button from "../../common/Button/Button";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import IconButton from "../../common/IconButton/IconButton";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Toolbar from "../../common/Toolbar/Toolbar";
import ToolbarItem, {
  ToolbarItemAlign,
} from "../../common/ToolbarItem/ToolbarItem";
import NewsFeed from "../NewsFeed/NewsFeed";

const StartupModal = (): JSX.Element => {
  const { workingDirectory } = useSelector(
    (state: RootState) => state.app.userPreferences
  );
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigate = useNavigate();

  const newProject = async () => {
    const directory =
      workingDirectory ?? (await dispatch(changeWorkingDirectory()));

    if (directory !== undefined) {
      dispatch(
        addTake(
          makeTake({
            workingDirectory: directory,
            shotNumber: 1,
            takeNumber: 1,
            frameRate: 15,
          })
        )
      );
      navigate(PageRoute.ANIMATOR);
    }
  };

  return (
    <Modal>
      <ModalBody>
        <Page>
          <PageBody>
            <Content>
              <ContentBlock title="Projects" titleIcon={IconName.PROJECTS}>
                Hi
              </ContentBlock>
            </Content>

            <Sidebar>
              <SidebarBlock title="Connect" titleIcon={IconName.CONNECT}>
                <NewsFeed />
              </SidebarBlock>
            </Sidebar>
          </PageBody>
        </Page>
      </ModalBody>

      <ModalFooter>
        <Toolbar borderTop>
          <ToolbarItem align={ToolbarItemAlign.LEFT}>
            <ButtonGroup>
              <Button
                title="New Project"
                icon={IconName.ADD}
                onClick={newProject}
              />

              <Button
                title="Open Project"
                icon={IconName.FOLDER}
                onClick={() => undefined}
              />
            </ButtonGroup>
          </ToolbarItem>
          <ToolbarItem align={ToolbarItemAlign.RIGHT}>
            <IconButton
              title="Preferences"
              icon={IconName.SETTINGS}
              onClick={PageRoute.PREFERENCES_MODAL}
            />
          </ToolbarItem>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default StartupModal;

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { PageRoute } from "../../../../common/PageRoute";
import { makeTake } from "../../../../common/Project";
import { changeWorkingDirectory } from "../../../redux/app/thunks";
import { addTake } from "../../../redux/project/actions";
import { RootState } from "../../../redux/store";
import Button from "../../common/Button/Button";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Toolbar from "../../common/Toolbar/Toolbar";
import NewsFeed from "../NewsFeed/NewsFeed";

const StartupModal = (): JSX.Element => {
  const { workingDirectory } = useSelector(
    (state: RootState) => state.app.userPreferences
  );
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const history = useHistory();

  const newProject = async () => {
    const directory =
      workingDirectory ?? (await dispatch(changeWorkingDirectory()));

    if (directory !== undefined) {
      dispatch(addTake(makeTake(directory, 1, 1, 15)));
      history.push(PageRoute.ANIMATOR);
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
          <ButtonGroup>
            <Button
              title="New Project"
              icon={IconName.ADD}
              onClick={newProject}
            />

            <Button
              title="Open Project"
              icon={IconName.FOLDER}
              onClick={() => console.log("todo")}
            />
          </ButtonGroup>
        </Toolbar>
      </ModalFooter>
    </Modal>
  );
};

export default StartupModal;

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { PageRoute } from "../../../../common/PageRoute";
import { makeTake } from "../../../../common/Project";
import { addTake } from "../../../redux/project/actions";
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
  const dispatch = useDispatch();
  const history = useHistory();

  const newProject = () => {
    dispatch(
      addTake(makeTake({ shotNumber: 1, takeNumber: 1, frameRate: 15 }))
    );
    history.push(PageRoute.ANIMATOR);
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

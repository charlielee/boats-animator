import { PageRoute } from "../../../../common/PageRoute";
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
              onClick={PageRoute.ANIMATOR}
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

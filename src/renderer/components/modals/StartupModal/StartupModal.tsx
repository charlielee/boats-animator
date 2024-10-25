import { PageRoute } from "../../../../common/PageRoute";
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
import ToolbarItem, { ToolbarItemAlign } from "../../common/ToolbarItem/ToolbarItem";
import NewsFeed from "../NewsFeed/NewsFeed";
import { Group } from "@mantine/core";
import { UiButton } from "../../ui/UiButton/UiButton";

const StartupModal = (): JSX.Element => (
  <Modal>
    <ModalBody>
      <Page>
        <PageBody>
          <Content>
            <ContentBlock title="Projects" flex>
              Welcome to Boats Animator!
            </ContentBlock>
            <ContentBlock>
              <Group>
                <UiButton icon={IconName.ADD} onClick={PageRoute.PROJECT_SETTINGS_MODAL}>
                  New Project
                </UiButton>
                <UiButton icon={IconName.FOLDER}>Open Project</UiButton>
              </Group>
            </ContentBlock>
          </Content>

          <Sidebar>
            <SidebarBlock title="Connect">
              <NewsFeed />
            </SidebarBlock>
          </Sidebar>
        </PageBody>
      </Page>
    </ModalBody>

    <ModalFooter>
      <Toolbar borderTop>
        <ToolbarItem align={ToolbarItemAlign.LEFT}>
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

export default StartupModal;

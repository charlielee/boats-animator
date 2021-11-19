import { useEffect, useState } from "react";
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
import NewsFeed from "../NewsFeed/NewsFeed";

const StartupModal = (): JSX.Element => {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    (async () => {
      const version = await window.preload.ipcToMain.appVersion();
      setAppVersion(version);
    })();
  }, []);

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
      </ModalFooter>
    </Modal>
  );
};

export default StartupModal;

import { useEffect, useState } from "react";
import { PageRoute } from "../../../../common/PageRoute";
import Button from "../../common/Button/Button";
import { ButtonStyle } from "../../common/Button/ButtonStyle";
import ButtonGroup from "../../common/ButtonGroup/ButtonGroup";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Modal from "../../common/Modal/Modal";
import ModalBody from "../../common/ModalBody/ModalBody";
import ModalFooter from "../../common/ModalFooter/ModalFooter";
import ModalHeader from "../../common/ModalHeader/ModalHeader";
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
      <ModalHeader title="Projects" />
      <ModalBody>
        <Content>
          <ContentBlock>
            <ButtonGroup>
              <Button
                title="New Project"
                icon={IconName.ADD}
                style={ButtonStyle.LARGE_ICON}
                onClick={PageRoute.ANIMATOR}
              />

              <Button
                title="Open Project"
                style={ButtonStyle.LARGE_ICON}
                icon={IconName.FOLDER}
                onClick={() => console.log("todo")}
              />
            </ButtonGroup>
          </ContentBlock>
        </Content>

        <Sidebar>
          <SidebarBlock title="Recent News" titleIcon={IconName.NEWS} flex>
            <NewsFeed />
          </SidebarBlock>

          <SidebarBlock title="Connect" titleIcon={IconName.CONNECT}>
            <ButtonGroup>
              <Button
                title="Official Website"
                icon={IconName.WEBSITE}
                style={ButtonStyle.LARGE_ICON}
                onClick={window.preload.openExternal.website}
              />
              <Button
                title="Discord Server"
                icon={IconName.DISCORD}
                style={ButtonStyle.LARGE_ICON}
                onClick={window.preload.openExternal.discord}
              />
            </ButtonGroup>
          </SidebarBlock>
        </Sidebar>
      </ModalBody>

      <ModalFooter>Hi</ModalFooter>
    </Modal>
  );
};

export default StartupModal;

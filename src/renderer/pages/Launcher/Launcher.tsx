import { useEffect, useState } from "react";
import { IpcChannel } from "../../../common/IpcApi";
import { PageRoute } from "../../../common/PageRoute";
import Button from "../../components/common/Button/Button";
import { ButtonStyle } from "../../components/common/Button/ButtonStyle";
import ButtonGroup from "../../components/common/ButtonGroup/ButtonGroup";
import Content from "../../components/common/Content/Content";
import ContentBlock from "../../components/common/ContentBlock/ContentBlock";
import IconName from "../../components/common/Icon/IconName";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";
import PageFooter from "../../components/common/PageFooter/PageFooter";
import PageFooterItem from "../../components/common/PageFooterItem/PageFooterItem";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import SidebarBlock from "../../components/common/SidebarBlock/SidebarBlock";
import NewsFeed from "../../components/launcher/NewsFeed/NewsFeed";

const Launcher = (): JSX.Element => {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    (async () => {
      const version = await window.preload.ipc[IpcChannel.APP_VERSION]();
      setAppVersion(version);
    })();
  }, []);

  return (
    <Page>
      <PageBody>
        <Content>
          <ContentBlock title="Projects" titleIcon={IconName.PROJECTS}>
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
      </PageBody>

      <PageFooter>
        <PageFooterItem value={`Version ${appVersion}`} />
      </PageFooter>
    </Page>
  );
};

export default Launcher;

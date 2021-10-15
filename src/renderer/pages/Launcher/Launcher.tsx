import { PageRoute } from "../../../common/PageRoute";
import Button from "../../components/common/Button/Button";
import { ButtonStyle } from "../../components/common/Button/ButtonStyle";
import ButtonGroup from "../../components/common/ButtonGroup/ButtonGroup";
import Content from "../../components/common/Content/Content";
import ContentBlock from "../../components/common/ContentBlock/ContentBlock";
import Page from "../../components/common/Page/Page";
import PageBody from "../../components/common/PageBody/PageBody";
import PageFooter from "../../components/common/PageFooter/PageFooter";
import PageFooterItem from "../../components/common/PageFooterItem/PageFooterItem";
import Sidebar from "../../components/common/Sidebar/Sidebar";
import SidebarBlock from "../../components/common/SidebarBlock/SidebarBlock";
import NewsFeed from "../../components/launcher/NewsFeed/NewsFeed";

const Launcher = (): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <ContentBlock title="Projects">
            <ButtonGroup>
              <Button
                title="New Project"
                icon="file"
                style={ButtonStyle.LARGE_ICON}
                onClick={PageRoute.ANIMATOR}
              />

              <Button
                title="Open Project"
                style={ButtonStyle.LARGE_ICON}
                icon="folder"
                onClick={() => console.log("todo")}
              />
            </ButtonGroup>
          </ContentBlock>
        </Content>

        <Sidebar>
          <SidebarBlock title="Recent News" titleIcon="newspaper" flex>
            <NewsFeed />
          </SidebarBlock>

          <SidebarBlock title="Connect" titleIcon="share">
            <ButtonGroup>
              <Button
                title="Official Website"
                icon="globe"
                style={ButtonStyle.LARGE_ICON}
                onClick={window.preload.openExternal.website}
              />
              <Button
                title="Discord Server"
                icon={["fab", "discord"]}
                style={ButtonStyle.LARGE_ICON}
                onClick={window.preload.openExternal.discord}
              />
            </ButtonGroup>
          </SidebarBlock>
        </Sidebar>
      </PageBody>

      <PageFooter>
        <PageFooterItem value={`Version ${window.preload.appVersion}`} />
      </PageFooter>
    </Page>
  );
};

export default Launcher;

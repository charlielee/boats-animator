import { Group, Stack } from "@mantine/core";
import { PageRoute } from "../../../../common/PageRoute";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import NewsFeed from "../NewsFeed/NewsFeed";

export const StartupPage = () => (
  <Page>
    <PageBody>
      <Content>
        <ContentBlock title="Welcome to Boats Animator!">
          <Stack justify="stretch" flex={1}>
            <Group>
              <UiButton
                icon={IconName.ADD}
                onClick={PageRoute.STARTUP_NEW_PROJECT_MODAL}
                semanticColor={SemanticColor.PRIMARY}
              >
                New Project
              </UiButton>
              <UiButton icon={IconName.FOLDER}>Open Project</UiButton>
            </Group>
            <UiButton icon={IconName.SETTINGS} onClick={PageRoute.STARTUP_PREFERENCES_MODAL}>
              Preferences
            </UiButton>
          </Stack>
        </ContentBlock>
      </Content>

      <Sidebar>
        <SidebarBlock title="News">
          <NewsFeed />
        </SidebarBlock>
      </Sidebar>
    </PageBody>
  </Page>
);

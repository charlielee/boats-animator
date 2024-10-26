import { Flex, Group, ScrollArea, Stack } from "@mantine/core";
import { PageRoute } from "../../../../common/PageRoute";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import NewsFeed from "../NewsFeed/NewsFeed";

const StartupModal = (): JSX.Element => (
  <Page>
    <PageBody>
      <Content>
        <ContentBlock title="Welcome to Boats Animator!">
          <Stack justify="stretch" flex={1}>
            <Group>
              <UiButton
                icon={IconName.ADD}
                onClick={PageRoute.PROJECT_SETTINGS_MODAL}
                semanticColor={SemanticColor.PRIMARY}
              >
                New Project
              </UiButton>
              <UiButton icon={IconName.FOLDER}>Open Project</UiButton>
            </Group>
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

export default StartupModal;

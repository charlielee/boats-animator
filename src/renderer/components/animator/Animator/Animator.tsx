import { Group, Stack } from "@mantine/core";
import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import { CapturePane } from "../CapturePane/CapturePane";
import { FrameToolbar } from "../FrameToolbar/FrameToolbar";
import { OverlayTabsPane } from "../OverlayTabsPane/OverlayTabsPane";
import { Preview } from "../Preview/Preview";
import { PreviewToolbar } from "../PreviewToolbar/PreviewToolbar";
import { Timeline } from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";

export const Animator = (): JSX.Element => {
  return (
    <Page>
      <TitleToolbar />
      <PageBody>
        <Content>
          <Preview />
          <PreviewToolbar />

          <Group
            gap="xs"
            align="stretch"
            wrap="nowrap"
            style={{ overflow: "hidden", maxWidth: "100%" }}
          >
            <OverlayTabsPane />
            <Stack flex={1} gap={0}>
              <FrameToolbar />
              <Timeline />
            </Stack>
          </Group>
        </Content>

        <CapturePane />
      </PageBody>
    </Page>
  );
};

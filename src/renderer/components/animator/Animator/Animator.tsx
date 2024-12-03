import { Group, Stack } from "@mantine/core";
import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import { CapturePane } from "../CapturePane/CapturePane";
import { FrameToolbar } from "../FrameToolbar/FrameToolbar";
import { OverlayTabsPane } from "../OverlayTabPanes/OverlayTabPanes";
import { Preview } from "../Preview/Preview";
import { PreviewToolbar } from "../PreviewToolbar/PreviewToolbar";
import { Timeline } from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";
import "./Animator.css";

export const Animator = (): JSX.Element => {
  return (
    <Page>
      <TitleToolbar />
      <PageBody>
        <Content>
          <Preview />
          <PreviewToolbar />

          <Group className="animator__overlay-tabs-pane-and-timeline" gap="xs">
            <OverlayTabsPane />
            <Stack flex={1} gap={0} className="animator__frame-toolbar-and-timeline">
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

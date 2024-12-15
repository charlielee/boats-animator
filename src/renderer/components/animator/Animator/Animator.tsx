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
          <Group className="animator__overlay-tabs-pane-and-preview" gap="xs">
            <OverlayTabsPane />

            <Stack flex={1} gap="xs">
              <Preview />
              <PreviewToolbar />
            </Stack>

            <CapturePane />
          </Group>

          <FrameToolbar />
          <Timeline />
        </Content>
      </PageBody>
    </Page>
  );
};

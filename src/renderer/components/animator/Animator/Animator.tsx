import { Group, Stack } from "@mantine/core";
import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import { CapturePane } from "../CapturePane/CapturePane";
import { FrameToolbar } from "../FrameToolbar/FrameToolbar";
import { Preview } from "../Preview/Preview";
import { PreviewToolbar } from "../PreviewToolbar/PreviewToolbar";
import { Timeline } from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";
import "./Animator.css";
import { LeftPanes } from "../LeftPanes/LeftPanes";
import { useEffect } from "react";
import { displayProjectTitle } from "../../../services/project/projectBuilder";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const Animator = () => {
  const project = useSelector((state: RootState) => state.project.project);
  useEffect(() => {
    document.title = project
      ? `${displayProjectTitle(project)} - Boats Animator`
      : "Boats Animator";
  }, [project]);

  return (
    <Page>
      <TitleToolbar />
      <PageBody>
        <Content>
          <div className="animator__overlay-tabs-pane-and-preview">
            <LeftPanes />

            <Stack flex={1} gap="xs">
              <Preview />
              <PreviewToolbar />
            </Stack>

            <CapturePane />
          </div>

          <FrameToolbar />
          <Timeline />
        </Content>
      </PageBody>
    </Page>
  );
};

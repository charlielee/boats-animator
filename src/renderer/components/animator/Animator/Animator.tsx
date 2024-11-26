import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import { AnimationToolbar } from "../AnimationToolbar/AnimationToolbar";
import { CaptureButtonToolbar } from "../CaptureButtonToolbar/CaptureButtonToolbar";
import { CapturePane } from "../CapturePane/CapturePane";
import { Preview } from "../Preview/Preview";
import { Timeline } from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";

export const Animator = (): JSX.Element => {
  return (
    <Page>
      <TitleToolbar />
      <PageBody>
        <Content>
          <Preview />
          <CaptureButtonToolbar />
          <AnimationToolbar />
          <Timeline />
        </Content>

        {/* <Sidebar>
          <CaptureSidebarBlock key="capture" />
        </Sidebar> */}
        <CapturePane />
      </PageBody>
    </Page>
  );
};

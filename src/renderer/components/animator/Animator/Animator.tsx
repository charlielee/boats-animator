import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import { AnimationToolbar } from "../AnimationToolbar/AnimationToolbar";
import { PreviewToolbar } from "../PreviewToolbar/PreviewToolbar";
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
          <PreviewToolbar />
          <AnimationToolbar />
          <Timeline />
        </Content>

        <CapturePane />
      </PageBody>
    </Page>
  );
};

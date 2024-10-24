import { useSelector } from "react-redux";
import CaptureContextProvider from "../../../context/CaptureContext/CaptureContextProvider";
import PlaybackContextProvider from "../../../context/PlaybackContext/PlaybackContextProvider";
import useProjectAndTake from "../../../hooks/useProjectAndTake";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import { AnimationToolbar } from "../AnimationToolbar/AnimationToolbar";
import { CaptureButtonToolbar } from "../CaptureButtonToolbar/CaptureButtonToolbar";
import CaptureSidebarBlock from "../CaptureSidebarBlock/CaptureSidebarBlock";
import { Preview } from "../Preview/Preview";
import StatusToolbar from "../StatusToolbar/StatusToolbar";
import { Timeline } from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";

const Animator = (): JSX.Element => {
  return (
    <Page>
      <TitleToolbar />
      <PageBody>
        <Content>
          <StatusToolbar />
          <Preview />
          <CaptureButtonToolbar />
          <AnimationToolbar />
          <Timeline />
        </Content>

        <Sidebar>
          <CaptureSidebarBlock key="capture" />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

const AnimatorWithProvider = (): JSX.Element => {
  const { take } = useProjectAndTake();
  const selectors = useSelector((state: RootState) => ({
    shortPlayLength: state.app.userPreferences.shortPlayLength,
    playbackSpeed: state.project.playbackSpeed,
  }));

  return (
    <CaptureContextProvider>
      <PlaybackContextProvider take={take} {...selectors}>
        <Animator />
      </PlaybackContextProvider>
    </CaptureContextProvider>
  );
};

export default AnimatorWithProvider;

import { useSelector } from "react-redux";
import { Take } from "../../../../common/project/Take";
import CaptureContextProvider from "../../../context/CaptureContext/CaptureContextProvider";
import PlaybackContextProvider from "../../../context/PlaybackContext/PlaybackContextProvider";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import AnimationToolbarWithContext from "../AnimationToolbar/AnimationToolbar";
import CaptureButtonToolbarWithContext from "../CaptureButtonToolbar/CaptureButtonToolbar";
import CaptureSidebarBlock from "../CaptureSidebarBlock/CaptureSidebarBlock";
import Preview from "../Preview/Preview";
import StatusToolbarWithContext from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";
import TitleToolbar from "../TitleToolbar/TitleToolbar";

interface AnimatorWithProviderProps {
  take: Take;
}

const Animator = ({ take }: AnimatorWithProviderProps): JSX.Element => {
  return (
    <Page>
      <TitleToolbar take={take} />
      <PageBody>
        <Content>
          <StatusToolbarWithContext take={take} />
          <Preview take={take} />
          <CaptureButtonToolbarWithContext />
          <AnimationToolbarWithContext />
          <Timeline take={take} />
        </Content>

        <Sidebar>
          <CaptureSidebarBlock key="capture" />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

const AnimatorWithProvider = ({ take }: AnimatorWithProviderProps): JSX.Element => {
  const selectors = useSelector((state: RootState) => ({
    shortPlayLength: state.app.userPreferences.shortPlayLength,
    playbackSpeed: state.project.playbackSpeed,
  }));

  return (
    <CaptureContextProvider>
      <PlaybackContextProvider take={take} {...selectors}>
        <Animator take={take} />
      </PlaybackContextProvider>
    </CaptureContextProvider>
  );
};

export default AnimatorWithProvider;

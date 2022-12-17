import { useSelector } from "react-redux";
import { Take } from "../../../../common/project/Take";
import PlaybackContextProvider from "../../../context/PlaybackContext/PlaybackContextProvider";
import { RootState } from "../../../redux/store";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import AnimationToolbarWithContext from "../AnimationToolbar/AnimationToolbar";
import CaptureButtonToolbarWithContext from "../CaptureButtonToolbar/CaptureButtonToolbar";
import CaptureTab from "../CaptureTab/CaptureTab";
import MediaTab from "../MediaTab/MediaTab";
import Preview from "../Preview/Preview";
import StatusToolbarWithContext from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";

interface AnimatorWithProviderProps {
  take: Take;
}

const Animator = ({ take }: AnimatorWithProviderProps): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <StatusToolbarWithContext take={take} />
          <Preview take={take} />
          <CaptureButtonToolbarWithContext />
          <AnimationToolbarWithContext />
          <Timeline take={take} />
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "X-Sheet", "Media"]}
            tabs={[
              <CaptureTab key="capture" />,

              <Tab key="guides">
                <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
                  Guides
                </SidebarBlock>
              </Tab>,

              <Tab key="x-sheet">
                <SidebarBlock title="X-Sheet" titleIcon={IconName.GUIDES}>
                  X-Sheet
                </SidebarBlock>
              </Tab>,

              <MediaTab key="media" take={take} />,
            ]}
          />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

const AnimatorWithProvider = ({
  take,
}: AnimatorWithProviderProps): JSX.Element => {
  const selectors = useSelector((state: RootState) => ({
    shortPlayLength: state.app.userPreferences.shortPlayLength,
    playbackSpeed: state.project.playbackSpeed,
  }));

  return (
    <PlaybackContextProvider take={take} {...selectors}>
      <Animator take={take} />
    </PlaybackContextProvider>
  );
};

export default AnimatorWithProvider;

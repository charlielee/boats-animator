import { Take } from "../../../../common/Project";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import AnimationToolbar from "../AnimationToolbar/AnimationToolbar";
import CaptureTab from "../CaptureTab/CaptureTab";
import MediaTab from "../MediaTab/MediaTab";
import Preview from "../Preview/Preview";
import StatusToolbar from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";

interface AnimatorProps {
  take: Take;
}

const Animator = ({ take }: AnimatorProps): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <StatusToolbar take={take} />

          <Preview />

          <AnimationToolbar />

          <Timeline take={take} />
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "X-Sheet", "Media"]}
            tabs={[
              <CaptureTab />,

              <Tab>
                <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
                  Guides
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="X-Sheet" titleIcon={IconName.GUIDES}>
                  X-Sheet
                </SidebarBlock>
              </Tab>,

              <MediaTab take={take} />,
            ]}
          />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

export default Animator;

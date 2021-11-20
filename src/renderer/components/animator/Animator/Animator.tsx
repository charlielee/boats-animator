import { TrackType } from "../../../../common/Project";
import Content from "../../common/Content/Content";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import Tab from "../../common/Tab/Tab";
import TabGroup from "../../common/TabGroup/TabGroup";
import AnimationToolbar from "../AnimationToolbar/AnimationToolbar";
import ExportDirectory from "../ExportDirectory/ExportDirectory";
import PreviewArea from "../PreviewArea/PreviewArea";
import StatusToolbar from "../StatusToolbar/StatusToolbar";
import Timeline from "../Timeline/Timeline";

const Animator = (): JSX.Element => {
  return (
    <Page>
      <PageBody>
        <Content>
          <StatusToolbar />

          <PreviewArea active />

          <AnimationToolbar />

          <Timeline
            tracks={[{ id: "1", trackType: TrackType.FRAME, trackItems: [] }]}
          />
        </Content>

        <Sidebar>
          <TabGroup
            titles={["Capture", "Guides", "Export"]}
            tabs={[
              <Tab>
                <SidebarBlock title="Capture" titleIcon={IconName.CAPTURE}>
                  Capture
                </SidebarBlock>

                <SidebarBlock
                  title="Auto-Capture"
                  titleIcon={IconName.CAPTURE_AUTO}
                >
                  Auto-Capture
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="Guides" titleIcon={IconName.GUIDES}>
                  Guides
                </SidebarBlock>
              </Tab>,

              <Tab>
                <SidebarBlock title="Export" titleIcon={IconName.EXPORT}>
                  <ExportDirectory />
                </SidebarBlock>
              </Tab>,
            ]}
          />
        </Sidebar>
      </PageBody>
    </Page>
  );
};

export default Animator;
